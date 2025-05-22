import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  Users, 
  Info,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { format, addHours, parse } from 'date-fns';
import toast from 'react-hot-toast';

// Mock classroom data
const classroomsData = {
  1: {
    id: 1,
    name: 'Lecture Hall A',
    building: 'Science Building',
    location: 'North Campus',
    capacity: 120,
    image: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    availability: {
      '2025-02-15': ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
      '2025-02-16': ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
      '2025-02-17': ['10:00', '11:00', '13:00', '14:00'],
      '2025-02-18': ['9:00', '13:00', '14:00', '15:00', '16:00'],
      '2025-02-19': ['9:00', '10:00', '11:00', '14:00', '15:00']
    }
  },
  2: {
    id: 2,
    name: 'Seminar Room 101',
    building: 'Liberal Arts',
    location: 'West Campus',
    capacity: 30,
    image: 'https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    availability: {
      '2025-02-15': ['9:00', '10:00', '11:00', '13:00', '14:00'],
      '2025-02-16': ['9:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      '2025-02-17': ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
      '2025-02-18': ['10:00', '11:00', '13:00', '16:00'],
      '2025-02-19': ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00']
    }
  },
  3: {
    id: 3,
    name: 'Computer Lab 3',
    building: 'Technology Center',
    location: 'East Campus',
    capacity: 45,
    image: 'https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    availability: {
      '2025-02-15': ['9:00', '13:00', '14:00', '15:00'],
      '2025-02-16': ['9:00', '10:00', '11:00', '13:00', '14:00'],
      '2025-02-17': ['9:00', '10:00', '13:00', '14:00', '15:00', '16:00'],
      '2025-02-18': ['9:00', '10:00', '11:00', '13:00', '15:00', '16:00'],
      '2025-02-19': ['10:00', '11:00', '13:00', '14:00', '15:00']
    }
  }
};

// Purpose options
const purposeOptions = [
  'Class Session',
  'Study Group',
  'Office Hours',
  'Club Meeting',
  'Workshop',
  'Conference',
  'Exam',
  'Other'
];

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const dateFromQuery = queryParams.get('date') || format(new Date(), 'yyyy-MM-dd');
  
  const [selectedDate, setSelectedDate] = useState<string>(dateFromQuery);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [duration, setDuration] = useState<number>(1);
  const [attendees, setAttendees] = useState<number>(1);
  const [purpose, setPurpose] = useState<string>('Class Session');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingComplete, setBookingComplete] = useState<boolean>(false);
  const [bookingReference, setBookingReference] = useState<string>('');

  // Get classroom data
  const classroom = classroomsData[id as keyof typeof classroomsData];
  
  // Available time slots for selected date
  const availableTimeSlots = classroom?.availability[selectedDate] || [];

  // Calculate end time based on selected time and duration
  const calculateEndTime = () => {
    if (!selectedTimeSlot) return '';
    
    try {
      const startTime = parse(selectedTimeSlot, 'HH:mm', new Date());
      const endTime = addHours(startTime, duration);
      return format(endTime, 'HH:mm');
    } catch (e) {
      return '';
    }
  };

  // Generate random booking reference
  const generateBookingReference = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let reference = '';
    
    // Add 3 letters
    for (let i = 0; i < 3; i++) {
      reference += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    
    // Add hyphen
    reference += '-';
    
    // Add 4 numbers
    for (let i = 0; i < 4; i++) {
      reference += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    
    return reference;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTimeSlot) {
      toast.error('Please select a time slot');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const reference = generateBookingReference();
      setBookingReference(reference);
      setBookingComplete(true);
      setIsSubmitting(false);
      toast.success('Booking completed successfully!');
    }, 1500);
  };

  // Redirect if classroom not found
  useEffect(() => {
    if (!classroom) {
      navigate('/classrooms');
      toast.error('Classroom not found');
    }
  }, [classroom, navigate]);

  if (!classroom) return null;

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      {!bookingComplete ? (
        <>
          {/* Booking form */}
          <div className="mb-6">
            <Link to={`/classrooms/${id}`} className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Classroom Details
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-primary-600 text-white px-6 py-4">
              <h1 className="text-2xl font-bold">Book Classroom</h1>
            </div>
            
            <div className="p-6">
              <div className="flex items-center pb-6 mb-6 border-b border-gray-200">
                <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                  <img 
                    src={classroom.image} 
                    alt={classroom.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{classroom.name}</h2>
                  <p className="text-gray-600">{classroom.building} • {classroom.location}</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Capacity: {classroom.capacity}</span>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="booking-date" className="form-label">Date</label>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <input 
                        type="date" 
                        id="booking-date" 
                        className="form-input"
                        value={selectedDate}
                        onChange={(e) => {
                          setSelectedDate(e.target.value);
                          setSelectedTimeSlot('');
                        }}
                        min={format(new Date(), 'yyyy-MM-dd')}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="form-label">Time Slot</label>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="grid grid-cols-4 gap-2 flex-grow">
                        {availableTimeSlots.length > 0 ? (
                          availableTimeSlots.map((time, index) => (
                            <button 
                              key={index}
                              type="button"
                              className={`py-2 px-3 text-sm text-center rounded-md transition-colors ${
                                selectedTimeSlot === time 
                                  ? 'bg-primary-600 text-white' 
                                  : 'border border-gray-300 hover:bg-gray-50'
                              }`}
                              onClick={() => setSelectedTimeSlot(time)}
                            >
                              {time}
                            </button>
                          ))
                        ) : (
                          <div className="col-span-4 text-center py-2 text-gray-500 bg-gray-50 rounded">
                            No available slots
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="duration" className="form-label">Duration (hours)</label>
                    <select 
                      id="duration" 
                      className="form-select"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      required
                    >
                      {[1, 2, 3].map((hour) => (
                        <option key={hour} value={hour}>{hour} hour{hour > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                    {selectedTimeSlot && (
                      <div className="mt-1 text-sm text-gray-500">
                        {selectedTimeSlot} - {calculateEndTime()}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="attendees" className="form-label">Number of Attendees</label>
                    <input 
                      type="number" 
                      id="attendees" 
                      className="form-input"
                      value={attendees}
                      onChange={(e) => setAttendees(parseInt(e.target.value))}
                      min="1"
                      max={classroom.capacity}
                      required
                    />
                    {attendees > classroom.capacity && (
                      <div className="mt-1 text-sm text-error-600 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Exceeds room capacity of {classroom.capacity}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="purpose" className="form-label">Purpose</label>
                    <select 
                      id="purpose" 
                      className="form-select"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      required
                    >
                      {purposeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="form-label">Additional Notes</label>
                    <textarea 
                      id="notes" 
                      className="form-input min-h-24"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special requirements or setup instructions"
                    />
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-6 flex items-start">
                  <Info className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-600">
                    <p className="font-medium mb-1">Booking Policies</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Cancellations must be made at least 24 hours in advance</li>
                      <li>Please leave the room in the same condition you found it</li>
                      <li>Report any issues or damages immediately</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Link to={`/classrooms/${id}`} className="btn btn-outline mr-3">
                    Cancel
                  </Link>
                  <button 
                    type="submit" 
                    className="btn btn-primary min-w-32"
                    disabled={isSubmitting || !selectedTimeSlot || attendees > classroom.capacity}
                  >
                    {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        /* Booking confirmation */
        <div className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in">
          <div className="bg-success-600 text-white px-6 py-4">
            <h1 className="text-2xl font-bold">Booking Confirmed</h1>
          </div>
          
          <div className="p-6">
            <div className="flex justify-center mb-6">
              <div className="bg-success-100 text-success-700 rounded-full p-4">
                <CheckCircle className="h-16 w-16" />
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-center mb-1">Your classroom has been booked!</h2>
            <p className="text-gray-600 text-center mb-6">A confirmation has been sent to your email.</p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Booking Reference</h3>
                  <p className="text-lg font-bold">{bookingReference}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Classroom</h3>
                  <p className="font-medium">{classroom.name}</p>
                  <p className="text-gray-600 text-sm">{classroom.building}, {classroom.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Date & Time</h3>
                  <p className="font-medium">{format(new Date(selectedDate), 'MMMM d, yyyy')}</p>
                  <p className="text-gray-600 text-sm">{selectedTimeSlot} - {calculateEndTime()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Purpose</h3>
                  <p className="font-medium">{purpose}</p>
                  <p className="text-gray-600 text-sm">{attendees} attendees</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4">
              <Link to="/reservations" className="btn btn-primary">
                View My Reservations
              </Link>
              <Link to="/classrooms" className="btn btn-outline">
                Browse More Classrooms
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;