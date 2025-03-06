"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";  
import Navbar from "../components/Navbar"; 
import Footer from "../shared/footer"; 

const Profile = () => {
  const [wallets, setWallets] = useState([]);
  const [walletName, setWalletName] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageTitle, setNewImageTitle] = useState("");

  // Load wallets from localStorage when component mounts
  useEffect(() => {
    const savedWallets = JSON.parse(localStorage.getItem("wallets"));
    if (savedWallets) {
      setWallets(savedWallets);
    }
  }, []);

  // Update wallets in localStorage whenever wallets state changes
  useEffect(() => {
    if (wallets.length > 0) {
      localStorage.setItem("wallets", JSON.stringify(wallets));
    }
  }, [wallets]);

  const createWallet = () => {
    if (walletName.trim() === "") return;

    const newWallet = {
      id: new Date().toISOString(),
      name: walletName,
      images: [],
    };

    setWallets([...wallets, newWallet]);
    setWalletName(""); // Reset wallet name input
  };

  const addImageToWallet = (walletId) => {
    if (newImageUrl.trim() === "") return;

    const updatedWallets = wallets.map((wallet) => {
      if (wallet.id === walletId) {
        wallet.images.push({
          id: new Date().toISOString(),
          url: newImageUrl,
          title: newImageTitle,
        });
      }
      return wallet;
    });

    setWallets(updatedWallets);
    setNewImageUrl(""); // Reset image URL input
    setNewImageTitle(""); // Reset image title input
  };

  const deleteImage = (walletId, imageId) => {
    const updatedWallets = wallets.map((wallet) => {
      if (wallet.id === walletId) {
        wallet.images = wallet.images.filter((image) => image.id !== imageId);
      }
      return wallet;
    });

    setWallets(updatedWallets);
  };

  const updateImageTitle = (walletId, imageId, newTitle) => {
    const updatedWallets = wallets.map((wallet) => {
      if (wallet.id === walletId) {
        wallet.images = wallet.images.map((image) => {
          if (image.id === imageId) {
            image.title = newTitle;
          }
          return image;
        });
      }
      return wallet;
    });

    setWallets(updatedWallets);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-600 to-purple-700">
      <Navbar />

      <main className="flex-grow flex flex-col items-center py-12 text-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold mb-4">Profile Page</h2>
          <p className="mb-8 text-lg">Create and manage your wallets and images.</p>
        </div>

        {/* Create Wallet Section */}
        <div className="mb-6 max-w-xl w-full">
          <h3 className="text-xl font-semibold mb-2">Create New Wallet</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              placeholder="Enter wallet topic"
              className="p-2 border border-gray-300 rounded text-black w-full"
            />
            <button
              onClick={createWallet}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Create Wallet
            </button>
          </div>
        </div>

        {/* Wallets and CRUD Operations */}
        {wallets.length === 0 ? (
          <p>No wallets available. Create one above!</p>
        ) : (
          wallets.map((wallet) => (
            <div key={wallet.id} className="mb-8 w-full max-w-4xl">
              <h3 className="text-xl font-semibold mb-4">{wallet.name}</h3>

              {/* Add Image to Wallet */}
              <div className="flex space-x-2 mb-4">
            
                <input
                  type="text"
                  value={newImageTitle}
                  onChange={(e) => setNewImageTitle(e.target.value)}
                  placeholder="Image Title"
                  className="p-2 border border-gray-300 rounded text-black w-full"
                />
                <button
                  onClick={() => addImageToWallet(wallet.id)}
                  className="p-2 bg-green-500 text-white rounded"
                >
                  Add Image
                </button>
              </div>

              {/* Display Images */}
              {wallet.images.length === 0 ? (
                <p>No images in this wallet yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wallet.images.map((image) => (
                    <div key={image.id} className="border p-4 rounded bg-white text-black">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-40 object-cover rounded mb-2"
                      />
                      <input
                        type="text"
                        value={image.title}
                        onChange={(e) =>
                          updateImageTitle(wallet.id, image.id, e.target.value)
                        }
                        className="p-2 border border-gray-300 rounded mb-2 w-full"
                      />
                      <div className="flex justify-between">
                        <button
                          onClick={() => deleteImage(wallet.id, image.id)}
                          className="p-2 bg-red-500 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
