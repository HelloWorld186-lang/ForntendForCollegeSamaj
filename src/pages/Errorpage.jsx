import React from 'react';
import { Link } from 'react-router-dom';

const Errorpage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4 text-center">
      <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
      <h2 className="text-4xl font-bold mb-4 text-white">Oops! Page Not Found</h2>
      <p className="text-xl mb-8 text-gray-400">We couldn't find the page you're looking for.</p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
        Return to Homepage
      </Link>
    </div>
  );
};

export default Errorpage;