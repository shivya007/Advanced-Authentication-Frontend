import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-4xl font-bold text-black-900 mb-4">404 - Page Not Found</h1>
      <p className="mb-6 text-gray-100">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-emerald-600 text-white rounded cursor-pointer hover:bg-emerald-700 transition"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default NotFound;
