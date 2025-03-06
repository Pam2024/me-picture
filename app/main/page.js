"use client";

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../shared/footer';
import Slider from 'react-slick';

// Import Slick Carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function MainPage() {
  const [userImages, setUserImages] = useState([]);

  useEffect(() => {
    // Simulate fetching user-uploaded images
    const fetchedImages = [
      "/images/user1.jpg",
      "/images/user2.jpg",
      "/images/user3.jpg",
      "/images/user4.jpg",
      "/images/user5.jpg",
    ];
    setUserImages(fetchedImages);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-600 to-purple-700">
      <Navbar />

      <main className="flex-grow flex justify-center items-center py-12 text-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold mb-4">Explore the world as seen by everyone's eyes.</h2>
        </div>

        <div className="w-full max-w-4xl">
          <Slider {...settings}>
            {userImages.map((image, index) => (
              <div key={index} className="px-4">
                <img
                  src={image}
                  alt={`User Image ${index + 1}`}
                  className="rounded-lg shadow-lg"
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </main>

      <Footer />
    </div>
  );
}
