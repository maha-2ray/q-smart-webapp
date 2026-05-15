import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center p-6 md:p-12 bg-white shadow-xl rounded-lg w-full max-w-lg">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="text-lg text-gray-500 mb-6">
          It seems like you've wandered off the beaten path. Let's get you back
          on track.
        </p>
        <div className="mt-8">
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
