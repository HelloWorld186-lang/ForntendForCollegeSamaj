import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-4 text-center">
      <h1 className="text-5xl font-bold mb-6 text-blue-400">Welcome to College Samaj</h1>
      <p className="text-xl mb-8 max-w-2xl">Connect with your college community and share important information about college work, events, and more.</p>
      <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
        <Link to="/signin" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">Sign In</Link>
        <Link to="/signup" className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105">Sign Up</Link>
      </div>
      <div className="mt-12 max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">What is College Samaj?</h2>
        <ul className="text-left list-disc list-inside space-y-2 text-gray-300">
          <li>A platform to share and discuss college-related posts</li>
          <li>Connect with fellow students and faculty members</li>
          <li>Stay updated on important college events and deadlines</li>
          <li>Collaborate on projects and share resources</li>
        </ul>
      </div>
    </div>
  );
};

export default Homepage;