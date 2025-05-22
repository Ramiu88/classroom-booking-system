import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Calendar, BookOpen, User } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button 
              type="button" 
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 md:hidden"
              onClick={onMenuClick}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <Link to="/" className="flex items-center space-x-2 ml-2 md:ml-0">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">ClassRoom</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/classrooms" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
              Classrooms
            </Link>
            <Link to="/reservations" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
              My Reservations
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search classrooms..."
                className="rounded-full border border-gray-300 bg-white pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <Link to="/reservations" className="text-gray-600 hover:text-primary-600 md:hidden">
              <Calendar className="h-5 w-5" />
            </Link>

            <button className="inline-flex items-center justify-center rounded-full w-8 h-8 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;