"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Header from "./shared/header";
import Footer from "./shared/footer";
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';

export default function Home() {
  const [activeForm, setActiveForm] = useState(null);
  const router = useRouter(); 

  const handleFormSubmit = (formData) => {
    console.log("Form submitted:", activeForm, formData);

    
    if (activeForm === 'login') {
      console.log("Redirecting to /main...");
      router.push('/main'); 
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-600 to-purple-700">
      <Header />
      <main className="flex-grow flex justify-center items-center py-12 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Get Started</h2>
          <p className="mb-8 text-lg">Create an account or log in to begin uploading pictures.</p>

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

          {activeForm === 'login' && <LogInForm onSubmit={handleFormSubmit} />}
          {activeForm === 'signup' && <SignUpForm onSubmit={handleFormSubmit} />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
