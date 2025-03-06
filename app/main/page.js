"use client"; 

import Navbar from '../components/Navbar'; 
import Footer from '../shared/footer';

export default function MainPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-600 to-purple-700">
      {/* Navbar Section */}
      <Navbar />

      {/* Main Content Section */}
      <main className="flex-grow flex justify-center items-center py-12 text-white">
        <h2 className="text-3xl font-semibold mb-4">Welcome to the Main Page</h2>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
