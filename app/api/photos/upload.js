import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the multipart form data
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'public/uploads');
    form.keepExtensions = true;
    
    // Ensure upload directory exists
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir, { recursive: true });
    }
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing form data' });
      }
      
      const { walletId, userId } = fields;
      const photo = files.photo;
      
      if (!photo || !walletId || !userId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      // Generate a unique filename
      const timestamp = Date.now();
      const ext = path.extname(photo.originalFilename);
      const newFilename = `photo-${userId}-${timestamp}${ext}`;
      
      // Move the file to its final location with the new name
      const newPath = path.join(form.uploadDir, newFilename);
      fs.renameSync(photo.filepath, newPath);
      
      // Create a URL for the uploaded photo
      const photoUrl = `/uploads/${newFilename}`;
      
      // Here you would typically save the photo information to your database
      // For example: await db.photos.create({ url: photoUrl, walletId, userId });
      
      // Return success response
      res.status(200).json({ 
        success: true, 
        photoUrl,
        message: 'Photo uploaded successfully' 
      });
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}