import React from 'react';
import { Link } from 'react-router-dom';
import { Search, School, Calendar, Clock, Users, ArrowRight } from 'lucide-react';

// Featured classrooms data (mock)
const featuredClassrooms = [
  {
    id: 1,
    name: 'Lecture Hall A',
    building: 'Science Building',
    capacity: 120,
    features: ['Projector', 'Microphone', 'Computer'],
    image: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    name: 'Seminar Room 101',
    building: 'Liberal Arts',
    capacity: 30,
    features: ['Whiteboard', 'Computer', 'Conferencing'],
    image: 'https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    name: 'Computer Lab 3',
    building: 'Technology Center',
    capacity: 45,
    features: ['30 Computers', 'Projector', 'Printer'],
    image: 'https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Hero Section */}
      <section className="relative rounded-xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-700/70 z-10"></div>
        <img 
          src="https://images.pexels.com/photos/356065/pexels-photo-356065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="University campus classroom"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-20 py-20 px-6 md:py-24 md:px-12 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl">
            Reserve the Perfect Classroom for Your Academic Needs
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90">
            Browse, book, and manage classroom reservations quickly and easily.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Link 
              to="/classrooms" 
              className="btn btn-secondary text-white px-6 py-3 text-base"
            >
              Find a Classroom
            </Link>
            <Link 
              to="/reservations" 
              className="btn btn-outline text-white border-white hover:bg-white/10 px-6 py-3 text-base"
            >
              View My Reservations
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="mb-16">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Search</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-2">
              <label htmlFor="search" className="form-label">Search by Classroom or Building</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input 
                  type="text" 
                  id="search"
                  placeholder="e.g., 'Lecture Hall A' or 'Science Building'"
                  className="form-input pl-10"
                />
              </div>
            </div>
            <div>
              <label htmlFor="date" className="form-label">Date</label>
              <input type="date" id="date" className="form-input" />
            </div>
            <div>
              <label htmlFor="capacity" className="form-label">Minimum Capacity</label>
              <select id="capacity" className="form-select">
                <option value="">Any capacity</option>
                <option value="10">10+ people</option>
                <option value="30">30+ people</option>
                <option value="50">50+ people</option>
                <option value="100">100+ people</option>
              </select>
            </div>
            <div className="col-span-1 md:col-span-4 flex justify-end mt-2">
              <button className="btn btn-primary">
                Search Classrooms
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Classrooms */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Featured Classrooms</h2>
          <Link to="/classrooms" className="text-primary-600 hover:text-primary-700 flex items-center">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredClassrooms.map(classroom => (
            <Link key={classroom.id} to={`/classrooms/${classroom.id}`} className="card group hover:transform hover:scale-[1.02] transition-transform">
              <div className="h-48 overflow-hidden">
                <img 
                  src={classroom.image} 
                  alt={classroom.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{classroom.name}</h3>
                <p className="text-gray-600 mb-2">{classroom.building}</p>
                <div className="flex items-center text-gray-500 mb-2">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="text-sm">Capacity: {classroom.capacity}</span>
                </div>
                <div className="flex flex-wrap mt-2 gap-2">
                  {classroom.features.map((feature, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-md">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">1. Find a Classroom</h3>
            <p className="text-gray-600">
              Search for available classrooms based on capacity, location, and amenities.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">2. Book Your Time Slot</h3>
            <p className="text-gray-600">
              Select your preferred date and time slot and complete your reservation.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <School className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">3. Use the Classroom</h3>
            <p className="text-gray-600">
              Get access to your reserved classroom during your scheduled time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary-50 rounded-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-2xl font-semibold mb-2">Ready to book a classroom?</h2>
            <p className="text-gray-600 max-w-xl">
              Find the perfect space for your lectures, study groups, or special events.
            </p>
          </div>
          <Link to="/classrooms" className="btn btn-primary px-6 py-3 text-base">
            Browse Classrooms
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;