import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Users, 
  Wifi, 
  Monitor, 
  Mic, 
  Printer,
  MapPin,
  Building,
  ChevronLeft,
  Star,
  Info,
  ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';

const classroomsData = {
  1: {
    id: 1,
    name: 'Lecture Hall A',
    building: 'Science Building',
    location: 'North Campus',
    floor: '2nd Floor',
    roomNumber: 'SB-201',
    capacity: 120,
    description: 'A large lecture hall with stadium seating, designed for large classes and presentations. Features excellent acoustics and a spacious presenter area.',
    features: ['Projector', 'Microphone System', 'Computer', 'Document Camera', 'Lecture Capture', 'Wheelchair Access'],
    amenities: {
      seating: 'Stadium Seating',
      tech: 'Full AV System',
      connectivity: 'Wi-Fi, Ethernet',
      accessibility: 'Wheelchair Access, Hearing Loop'
    },
    images: [
      'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg',
      'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg',
      'https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg'
    ],
    availability: {
      '2025-02-15': ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
      '2025-02-16': ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
      '2025-02-17': ['10:00', '11:00', '13:00', '14:00'],
      '2025-02-18': ['9:00', '13:00', '14:00', '15:00', '16:00'],
      '2025-02-19': ['9:00', '10:00', '11:00', '14:00', '15:00']
    },
    rating: 4.8,
    reviews: 24
  },
  2: {
    id: 2,
    name: 'Seminar Room 101',
    building: 'Liberal Arts',
    location: 'West Campus',
    floor: '1st Floor',
    roomNumber: 'LA-101',
    capacity: 30,
    description: 'A medium-sized seminar room ideal for discussions and small classes. Features a modular table setup that can be rearranged as needed.',
    features: ['Whiteboard', 'Computer', 'Projector', 'Conference Phone', 'Modular Tables'],
    amenities: {
      seating: 'Modular Tables',
      tech: 'Basic AV System',
      connectivity: 'Wi-Fi',
      accessibility: 'Wheelchair Access'
    },
    images: [
      'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg',
      'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg',
      'https://images.pexels.com/photos/373488/pexels-photo-373488.jpeg'
    ],
    availability: {
      '2025-02-15': ['9:00', '10:00', '11:00', '13:00', '14:00'],
      '2025-02-16': ['9:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      '2025-02-17': ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
      '2025-02-18': ['10:00', '11:00', '13:00', '16:00'],
      '2025-02-19': ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00']
    },
    rating: 4.5,
    reviews: 16
  },
  3: {
    id: 3,
    name: 'Computer Lab 3',
    building: 'Technology Center',
    location: 'East Campus',
    floor: '3rd Floor',
    roomNumber: 'TC-304',
    capacity: 45,
    description: 'A modern computer lab with high-performance workstations. Each station is equipped with dual monitors and specialized software for technical courses.',
    features: ['30 Computer Workstations', 'Projector', 'Printer', 'Scanner', 'Specialized Software'],
    amenities: {
      seating: 'Ergonomic Chairs',
      tech: 'High-end Workstations',
      connectivity: 'High-speed Wi-Fi, Ethernet',
      accessibility: 'Adjustable Height Desks'
    },
    images: [
      'https://images.pexels.com/photos/373488/pexels-photo-373488.jpeg',
      'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg',
      'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg'
    ],
    availability: {
      '2025-02-15': ['9:00', '13:00', '14:00', '15:00'],
      '2025-02-16': ['9:00', '10:00', '11:00', '13:00', '14:00'],
      '2025-02-17': ['9:00', '10:00', '13:00', '14:00', '15:00', '16:00'],
      '2025-02-18': ['9:00', '10:00', '11:00', '13:00', '15:00', '16:00'],
      '2025-02-19': ['10:00', '11:00', '13:00', '14:00', '15:00']
    },
    rating: 4.9,
    reviews: 32
  }
};

const ClassroomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [selectedImage, setSelectedImage] = useState<number>(0);
  
  // Get classroom data
  const classroom = classroomsData[id as keyof typeof classroomsData];
  
  if (!classroom) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Classroom Not Found</h1>
        <p className="text-gray-600 mb-6">The classroom you're looking for doesn't exist or has been removed.</p>
        <Link to="/classrooms" className="btn btn-primary">
          Browse All Classrooms
        </Link>
      </div>
    );
  }

  // Available time slots for selected date
  const availableTimeSlots = classroom.availability[selectedDate] || [];

  // Feature icon mapping
  const getFeatureIcon = (feature: string) => {
    if (feature.toLowerCase().includes('wifi')) return <Wifi className="h-5 w-5" />;
    if (feature.toLowerCase().includes('computer')) return <Monitor className="h-5 w-5" />;
    if (feature.toLowerCase().includes('mic')) return <Mic className="h-5 w-5" />;
    if (feature.toLowerCase().includes('print')) return <Printer className="h-5 w-5" />;
    return <Info className="h-5 w-5" />;
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/classrooms" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Classrooms
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Images and Details */}
        <div className="md:col-span-2">
          {/* Image Gallery */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="relative h-96">
              <img 
                src={classroom.images[selectedImage]} 
                alt={classroom.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex space-x-2 overflow-x-auto">
              {classroom.images.map((image, index) => (
                <button 
                  key={index} 
                  className={`h-16 w-24 flex-shrink-0 rounded overflow-hidden border-2 ${selectedImage === index ? 'border-primary-500' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${classroom.name} - view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Classroom Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-1">{classroom.name}</h1>
                <div className="text-gray-600 mb-2">{classroom.building}</div>
                <div className="flex items-center">
                  <div className="flex items-center text-yellow-400 mr-2">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-gray-800 ml-1 font-medium">{classroom.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({classroom.reviews} reviews)</span>
                </div>
              </div>
              <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                Available
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
                <Users className="h-6 w-6 text-gray-500 mb-1" />
                <span className="text-sm text-gray-500">Capacity</span>
                <span className="font-medium">{classroom.capacity} People</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
                <Building className="h-6 w-6 text-gray-500 mb-1" />
                <span className="text-sm text-gray-500">Room</span>
                <span className="font-medium">{classroom.roomNumber}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
                <MapPin className="h-6 w-6 text-gray-500 mb-1" />
                <span className="text-sm text-gray-500">Location</span>
                <span className="font-medium">{classroom.location}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-6 w-6 text-gray-500 mb-1" />
                <span className="text-sm text-gray-500">Floor</span>
                <span className="font-medium">{classroom.floor}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700">{classroom.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Features & Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-gray-600 font-medium mb-2">Features</h3>
                  <ul className="space-y-2">
                    {classroom.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 text-primary-600 mr-2">
                          {getFeatureIcon(feature)}
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-gray-600 font-medium mb-2">Amenities</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-gray-500 min-w-24">Seating:</span>
                      <span>{classroom.amenities.seating}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 min-w-24">Technology:</span>
                      <span>{classroom.amenities.tech}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 min-w-24">Connectivity:</span>
                      <span>{classroom.amenities.connectivity}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 min-w-24">Accessibility:</span>
                      <span>{classroom.amenities.accessibility}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Book This Classroom</h2>
            
            <div className="mb-4">
              <label htmlFor="booking-date" className="form-label">Date</label>
              <input 
                type="date" 
                id="booking-date" 
                className="form-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={format(new Date(), 'yyyy-MM-dd')}
              />
            </div>
            
            <div className="mb-6">
              <h3 className="form-label">Available Time Slots</h3>
              {availableTimeSlots.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {availableTimeSlots.map((time, index) => (
                    <button 
                      key={index}
                      className="btn btn-outline py-2 text-sm hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 bg-gray-50 rounded">
                  No available time slots for this date
                </div>
              )}
            </div>
            
            <Link 
              to={`/book/${classroom.id}?date=${selectedDate}`} 
              className={`btn w-full ${availableTimeSlots.length > 0 ? 'btn-primary' : 'btn-primary opacity-50 cursor-not-allowed'}`}
              onClick={(e) => availableTimeSlots.length === 0 && e.preventDefault()}
            >
              Continue to Booking
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>Need help? Contact support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomDetailPage;