import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ChatBot from './components/Chatbot';
import LandingPage from './components/LandingPage';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();  // useNavigate should be inside the component
  const token = localStorage.getItem('authToken');
  
  // Redirect to sign-in if no token is found
  if (!token) {
    navigate('/signin');
    return null;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/chat" element={<ProtectedRoute><ChatBot /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
