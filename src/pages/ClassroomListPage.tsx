import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Users, Clock, MapPin, Bookmark, CheckCircle } from 'lucide-react';

// Mock data for classrooms
const classroomsData = [
  {
    id: 1,
    name: 'Lecture Hall A',
    building: 'Science Building',
    location: 'North Campus',
    capacity: 120,
    features: ['Projector', 'Microphone', 'Computer'],
    image: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    name: 'Seminar Room 101',
    building: 'Liberal Arts',
    location: 'West Campus',
    capacity: 30,
    features: ['Whiteboard', 'Computer', 'Conferencing'],
    image: 'https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    name: 'Computer Lab 3',
    building: 'Technology Center',
    location: 'East Campus',
    capacity: 45,
    features: ['30 Computers', 'Projector', 'Printer'],
    image: 'https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    name: 'Conference Room B',
    building: 'Administration Building',
    location: 'Central Campus',
    capacity: 20,
    features: ['Smart Board', 'Video Conferencing', 'Whiteboard'],
    image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 5,
    name: 'Auditorium 1',
    building: 'Performing Arts Center',
    location: 'South Campus',
    capacity: 200,
    features: ['Stage', 'Sound System', 'Projector', 'Lighting'],
    image: 'https://images.pexels.com/photos/5058747/pexels-photo-5058747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 6,
    name: 'Study Room 4',
    building: 'Library',
    location: 'Central Campus',
    capacity: 8,
    features: ['Whiteboard', 'Table & Chairs'],
    image: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

// Feature filter options
const featureOptions = [
  'Projector', 'Whiteboard', 'Computer', 'Microphone', 
  'Video Conferencing', 'Smart Board', 'Sound System'
];

// Location filter options
const locationOptions = [
  'North Campus', 'South Campus', 'East Campus', 
  'West Campus', 'Central Campus'
];

const ClassroomListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [minCapacity, setMinCapacity] = useState<number | ''>('');
  const [date, setDate] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter classrooms based on search and filters
  const filteredClassrooms = classroomsData.filter(classroom => {
    // Search term filter
    if (searchTerm && !classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !classroom.building.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Minimum capacity filter
    if (minCapacity && classroom.capacity < minCapacity) {
      return false;
    }
    
    // Features filter
    if (selectedFeatures.length > 0) {
      const hasAllFeatures = selectedFeatures.every(feature => 
        classroom.features.some(f => f.toLowerCase().includes(feature.toLowerCase()))
      );
      if (!hasAllFeatures) return false;
    }
    
    // Location filter
    if (selectedLocations.length > 0 && !selectedLocations.includes(classroom.location)) {
      return false;
    }
    
    return true;
  });

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedFeatures([]);
    setSelectedLocations([]);
    setMinCapacity('');
    setDate('');
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Classrooms</h1>
        <p className="text-gray-600">Find and book the perfect classroom for your needs</p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-5 mb-8">
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
          <div className="flex-grow">
            <label htmlFor="search" className="form-label">Search Classrooms</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="text" 
                id="search"
                placeholder="Search by name or building..."
                className="form-input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-32">
            <label htmlFor="date" className="form-label">Date</label>
            <input 
              type="date" 
              id="date" 
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button 
            className="btn btn-outline flex items-center"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <div className="flex space-x-2">
            <button 
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => setViewMode('grid')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
            <button 
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => setViewMode('list')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="21" y1="6" x2="3" y2="6" />
                <line x1="21" y1="12" x2="3" y2="12" />
                <line x1="21" y1="18" x2="3" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {isFilterOpen && (
          <div className="border-t pt-4 mt-4 animate-slide-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-2 text-sm uppercase text-gray-500">Features</h3>
                <div className="space-y-2">
                  {featureOptions.map(feature => (
                    <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="rounded text-primary-600 focus:ring-primary-500"
                        checked={selectedFeatures.includes(feature)}
                        onChange={() => toggleFeature(feature)}
                      />
                      <span>{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 text-sm uppercase text-gray-500">Location</h3>
                <div className="space-y-2">
                  {locationOptions.map(location => (
                    <label key={location} className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="rounded text-primary-600 focus:ring-primary-500"
                        checked={selectedLocations.includes(location)}
                        onChange={() => toggleLocation(location)}
                      />
                      <span>{location}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 text-sm uppercase text-gray-500">Capacity</h3>
                <select 
                  className="form-select mb-6"
                  value={minCapacity}
                  onChange={(e) => setMinCapacity(e.target.value ? parseInt(e.target.value) : '')}
                >
                  <option value="">Any capacity</option>
                  <option value="10">10+ people</option>
                  <option value="30">30+ people</option>
                  <option value="50">50+ people</option>
                  <option value="100">100+ people</option>
                </select>
                
                <button 
                  className="btn btn-outline w-full"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {filteredClassrooms.length} {filteredClassrooms.length === 1 ? 'Classroom' : 'Classrooms'} Available
          </h2>
        </div>

        {filteredClassrooms.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium mb-2">No classrooms found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search filters or criteria</p>
            <button 
              className="btn btn-primary"
              onClick={clearFilters}
            >
              Clear All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClassrooms.map(classroom => (
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
                  <p className="text-gray-600 mb-1">{classroom.building}</p>
                  <div className="flex items-center text-gray-600 text-sm mb-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{classroom.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Capacity: {classroom.capacity}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {classroom.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-md">
                        {feature}
                      </span>
                    ))}
                    {classroom.features.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-md">
                        +{classroom.features.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-600 font-medium">Available</span>
                    <button className="btn btn-outline py-1 px-3 text-sm">
                      Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredClassrooms.map(classroom => (
              <Link 
                key={classroom.id} 
                to={`/classrooms/${classroom.id}`} 
                className="block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-48 md:h-auto">
                    <img 
                      src={classroom.image} 
                      alt={classroom.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{classroom.name}</h3>
                          <p className="text-gray-600">{classroom.building}</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Available
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{classroom.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Capacity: {classroom.capacity}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {classroom.features.map((feature, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-md">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <button className="btn btn-outline py-1 px-3 mr-2 text-sm">
                        Details
                      </button>
                      <button className="btn btn-primary py-1 px-3 text-sm">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassroomListPage;