// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// function SignIn() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = {
//       email,
//       password,
//     };

//     try {
//       const response = await axios.post('http://localhost:8000/signin', data);
//       console.log('Sign-in successful', response.data);
//       // Redirect to the chatbot page after sign-in
//       navigate('/chat'); // Assuming you have a /chat route for the chatbot
//     } catch (err) {
//       setError('Invalid credentials. Please try again.');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h2>
//       <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium">Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 font-medium">Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//           />
//         </div>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         <button
//           type="submit"
//           className="w-full px-4 py-2 text-white bg-[#0084ff] rounded-lg font-medium hover:bg-blue-600 transition"
//         >
//           Sign In
//         </button>
//         <p className="mt-4 text-center text-gray-600">
//           New here?{' '}
//           <Link to="/signup" className="text-[#0084ff] font-medium hover:underline">
//             Create an account
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default SignIn;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      // Send sign-in request to backend
      const response = await axios.post('http://localhost:8000/signin', data);

      // Assume token is returned in response.data.token
      const token = response.data.token;
      if (token) {
        // Store token in localStorage
        localStorage.setItem('authToken', token);
        console.log('Sign-in successful, token stored:', token);

        // Redirect to the chatbot page after sign-in
        navigate('/chat'); // Ensure you have a route for /chat
      } else {
        setError('Token not found in response. Please try again.');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-[#0084ff] rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Sign In
        </button>
        <p className="mt-4 text-center text-gray-600">
          New here?{' '}
          <Link to="/signup" className="text-[#0084ff] font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
