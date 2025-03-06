"use client"; // Make this file a client-side component to use React hooks like useState

import { useState } from "react";
import Header from "./shared/header";
import Footer from "./shared/footer";
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';

export default function Home() {
  // State to manage which form is visible (Sign Up or Log In)
  const [activeForm, setActiveForm] = useState(null); // null -> no form, 'login' -> Log In form, 'signup' -> Sign Up form

  const handleFormSubmit = (formData) => {
    console.log(activeForm, formData);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-600 to-purple-700">
      {/* Header Section */}
      <Header />

      {/* Main Content Section */}
      <main className="flex-grow flex justify-center items-center py-12 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Get Started</h2>
          <p className="mb-8 text-lg">Create an account or log in to begin uploading pictures.</p>
          
          {/* Toggle buttons to switch between Sign Up and Log In */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              className={`px-6 py-3 rounded-full ${activeForm === 'login' ? 'bg-gray-400' : 'bg-blue-500'} text-white hover:bg-blue-600 transition`}
              onClick={() => setActiveForm('login')}
            >
              Log In
            </button>
            <button
              className={`px-6 py-3 rounded-full ${activeForm === 'signup' ? 'bg-gray-400' : 'bg-green-500'} text-white hover:bg-green-600 transition`}
              onClick={() => setActiveForm('signup')}
            >
              Sign Up
            </button>
          </div>

          {/* Conditionally render the form based on the selected state */}
          {activeForm === 'login' && (
            <LogInForm onSubmit={handleFormSubmit} />
          )}
          {activeForm === 'signup' && (
            <SignUpForm onSubmit={handleFormSubmit} />
          )}
        </div>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
