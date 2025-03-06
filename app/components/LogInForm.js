"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation"; 

const LogInForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Now useRouter will work because this component is client-side

  const handleLogin = async () => {
    try {
      // login request
      const formData = { email, password };
      onSubmit(formData); // Pass the data back to the parent component
      
      // After successful login, navigate to the main page
      router.push("/main"); // Redirect to the main page after login
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-form">
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default LogInForm;
