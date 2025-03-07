import { useState } from 'react';
import { getSocket } from '../lib/socket';
import { useAuth } from '../context/auth';

export default function PhotoUploader({ walletId }) {
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  
  const handleUpload = async (e) => {
    if (!user) return;
    
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    
    try {
      // Upload logic (to your server/storage)
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('walletId', walletId);
      formData.append('userId', user.id);
      
      const response = await fetch('/api/photos/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      
      // Emit socket event for real-time notification
      const socket = getSocket();
      socket.emit('photoAdded', {
        walletId,
        photoUrl: data.photoUrl,
        addedByUserId: user.id,
        addedByUsername: user.username || user.name
      });
      
      // Update UI or state as needed
      
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">
        Add Photo
      </label>
      <div className="mt-1 flex items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
          id="photo-upload"
        />
        <label
          htmlFor="photo-upload"
          className={`cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
            uploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {uploading ? 'Uploading...' : 'Upload Photo'}
        </label>
      </div>
    </div>
  );
}