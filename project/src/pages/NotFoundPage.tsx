import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto text-center py-12 px-4 animate-fade-in">
      <div className="mb-6">
        <div className="h-32 w-32 bg-primary-50 rounded-full flex items-center justify-center mx-auto">
          <Search className="h-16 w-16 text-primary-400" />
        </div>
      </div>
      
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-gray-600 mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <Link to="/" className="btn btn-primary">
          <Home className="h-4 w-4 mr-2" />
          Go to Homepage
        </Link>
        <Link to="/classrooms" className="btn btn-outline">
          Browse Classrooms
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;