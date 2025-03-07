"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../shared/footer";
import Slider from "react-slick";
import Image from "next/image"; // Import Image component from next/image

// Import Slick Carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// MainPage component
export default function MainPage() {
  const [userImages, setUserImages] = useState([]);

  useEffect(() => {
    // Fetch public images from the backend API
    const fetchImages = async () => {
      const response = await fetch("/api/get-public-images");
      const data = await response.json();
      setUserImages(data);
    };

    fetchImages();
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

        {/* Carousel Section */}
        <div className="w-full max-w-4xl">
          <Slider {...settings}>
            {/* 5 Sample Images */}
            {userImages.length === 0 ? (
              // If no images are fetched, fallback to sample images
              [
                "/images/user1.jpg",
                "/images/user2.jpg",
                "/images/user3.jpg",
                "/images/user4.jpg",
                "/images/user5.jpg"
              ].map((image, index) => (
                <div key={index} className="px-4">
                  <Image
                    src={image}
                    alt={`User Image ${index + 1}`}
                    width={500} // Set a fixed width
                    height={300} // Set a fixed height
                    className="rounded-lg shadow-lg"
                  />
                </div>
              ))
            ) : (
              // Display fetched user images
              userImages.map((image, index) => (
                <div key={index} className="px-4">
                  <Image
                    src={image.url}
                    alt={image.title}
                    width={500} // Set a fixed width
                    height={300} // Set a fixed height
                    className="rounded-lg shadow-lg"
                  />
                  <h3 className="text-center text-lg font-semibold mt-2">{image.title}</h3>
                  <p className="text-center text-sm">{image.username}</p>
                </div>
              ))
            )}
          </Slider>
        </div>
      </main>

      <Footer />
    </div>
  );
}
