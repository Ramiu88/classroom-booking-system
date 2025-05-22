import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary-600" />
              <span className="text-lg font-bold text-gray-900">ClassRoom</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              A modern and efficient classroom reservation system for educational institutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Features</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/classrooms" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Find Classrooms
                </Link>
              </li>
              <li>
                <Link to="/reservations" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Manage Reservations
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">support@classroom.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Github className="h-4 w-4 text-gray-500" />
                <a href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  @classroom
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ClassRoom Reservation System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;