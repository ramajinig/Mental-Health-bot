import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
      name,
      role,
    };

    try {
      const response = await axios.post('http://localhost:8000/signup', data);
      console.log('Sign-up successful', response.data);
      navigate('/signin'); // Redirect to Sign-In after successful Sign-Up
    } catch (err) {
      setError('Error signing up. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold text-center text-[#0084ff]">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0084ff]"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0084ff]"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0084ff]"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0084ff]"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white rounded-lg bg-[#0084ff] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-[#0084ff] focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
