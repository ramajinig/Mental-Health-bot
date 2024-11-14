import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Navigation Bar */}
      <header className="flex justify-between items-center p-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-[#0084ff]">MindCare</h1>
        <button
          onClick={() => navigate('/signin')}
          className="px-4 py-2 text-white bg-[#0084ff] rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center bg-blue-50">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          Your Mental Health Companion
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-lg">
          MindCare is here to support your journey toward better mental health. Connect with resources, tools, and support, anytime you need.
        </p>
        <button
          onClick={() => navigate('/signup')}
          className="px-6 py-3 text-lg font-medium text-white bg-[#0084ff] rounded-full hover:bg-blue-600"
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-20 px-5 bg-white">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-12">
          Features
        </h3>
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
          <Feature
            title="Chat with AI"
            description="Speak with our mental health chatbot for guidance and support, whenever you need."
          />
          <Feature
            title="Professional Support"
            description="Easily connect with mental health professionals and schedule appointments."
          />
          <Feature
            title="Personalized Resources"
            description="Access tailored resources that are relevant to your mental health journey."
          />
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center px-5">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">
            Why Choose MindCare?
          </h3>
          <p className="text-lg text-gray-600">
            MindCare is dedicated to providing a safe and supportive environment to help you manage your mental well-being. With innovative AI technology and access to professional support, you can find resources and assistance whenever you need it.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-center text-white">
        <p>&copy; 2024 MindCare. All rights reserved.</p>
      </footer>
    </div>
  );
}

function Feature({ title, description }) {
  return (
    <div className="w-full sm:w-80 p-6 text-center bg-white rounded-lg shadow-md border border-gray-200">
      <h4 className="text-xl font-semibold text-gray-800 mb-3">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default LandingPage;
