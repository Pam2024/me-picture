import { useState } from 'react';

export default function SignUpForm({ onSubmit }) {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ username: '', password: '' }); // Reset form after submit
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-lg font-medium">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="mt-2 p-3 w-full rounded-md border border-gray-300"
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-lg font-medium">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="mt-2 p-3 w-full rounded-md border border-gray-300"
          placeholder="Enter your password"
        />
      </div>
      <div>
        <button
          type="submit"
          className="px-6 py-3 bg-green-500 text-white rounded-full w-full hover:bg-green-600 transition"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
