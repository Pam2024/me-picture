import axios from 'axios';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';  // To generate unique filenames

// Function to download image from URL
const downloadImage = async (url, savePath) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  fs.writeFileSync(savePath, response.data);
};

export async function POST(req) {
  try {
    const body = await req.json();  // Get the request body as JSON
    const { imageUrl, title } = body;  // Get the image URL from the body

    if (!imageUrl) {
      return new Response('Image URL is required', { status: 400 });
    }

    // Generate a unique file name
    const extname = path.extname(imageUrl);
    const filename = `${uuidv4()}${extname}`;
    const savePath = path.join('public', 'uploads', filename);

    // Ensure the uploads directory exists
    if (!fs.existsSync(path.dirname(savePath))) {
      fs.mkdirSync(path.dirname(savePath), { recursive: true });
    }

    // Download the image and save it to disk
    await downloadImage(imageUrl, savePath);

    const filePath = `/uploads/${filename}`;
    return new Response(
      JSON.stringify({ filePath, title }), 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error uploading image:', error);
    return new Response('Failed to upload image', { status: 500 });
  }
}
