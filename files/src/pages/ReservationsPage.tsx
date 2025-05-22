import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Check, 
  X, 
  ChevronDown,
  ChevronUp,
  Trash2,
  Edit,
  AlertTriangle,
  Filter
} from 'lucide-react';
import { format, isBefore, isToday, addDays, parseISO } from 'date-fns';
import toast from 'react-hot-toast';

// Mock data for reservations
const reservationsData = [
  {
    id: 'RES-1234',
    classroomId: 1,
    classroomName: 'Lecture Hall A',
    building: 'Science Building',
    location: 'North Campus',
    date: '2025-03-10',
    startTime: '10:00',
    endTime: '12:00',
    purpose: 'Class Session',
    attendees: 45,
    status: 'upcoming'
  },
  {
    id: 'RES-2345',
    classroomId: 2,
    classroomName: 'Seminar Room 101',
    building: 'Liberal Arts',
    location: 'West Campus',
    date: '2025-03-15',
    startTime: '14:00',
    endTime: '16:00',
    purpose: 'Study Group',
    attendees: 12,
    status: 'upcoming'
  },
  {
    id: 'RES-3456',
    classroomId: 3,
    classroomName: 'Computer Lab 3',
    building: 'Technology Center',
    location: 'East Campus',
    date: '2025-02-25',
    startTime: '09:00',
    endTime: '11:00',
    purpose: 'Workshop',
    attendees: 30,
    status: 'completed'
  },
  {
    id: 'RES-4567',
    classroomId: 1,
    classroomName: 'Lecture Hall A',
    building: 'Science Building',
    location: 'North Campus',
    date: '2025-03-02',
    startTime: '13:00',
    endTime: '15:00',
    purpose: 'Exam',
    attendees: 60,
    status: 'upcoming'
  },
  {
    id: 'RES-5678',
    classroomId: 2,
    classroomName: 'Seminar Room 101',
    building: 'Liberal Arts',
    location: 'West Campus',
    date: '2025-02-20',
    startTime: '11:00',
    endTime: '12:00',
    purpose: 'Office Hours',
    attendees: 5,
    status: 'cancelled'
  }
];

// Filter options
type FilterStatus = 'all' | 'upcoming' | 'completed' | 'cancelled';

interface Reservation {
  id: string;
  classroomId: number;
  classroomName: string;
  building: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  attendees: number;
  status: string;
}

const ReservationsPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [expandedReservation, setExpandedReservation] = useState<string | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState<string | null>(null);

  // Filter reservations based on status
  const filteredReservations = reservationsData.filter(reservation => {
    if (filterStatus === 'all') return true;
    return reservation.status === filterStatus;
  });

  // Sort reservations by date (most recent first for completed, earliest first for upcoming)
  const sortedReservations = [...filteredReservations].sort((a, b) => {
    if (a.status === 'completed' && b.status === 'completed') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });

  // Toggle reservation details
  const toggleReservationDetails = (id: string) => {
    if (expandedReservation === id) {
      setExpandedReservation(null);
    } else {
      setExpandedReservation(id);
    }
  };

  // Handle cancel reservation
  const handleCancelReservation = (id: string) => {
    // In a real app, this would be an API call
    toast.success('Reservation cancelled successfully');
    setCancelDialogOpen(null);
    // Update the reservation status (in a real app, this would be handled by the backend)
    // Here we're just simulating the update
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
          <Check className="h-3 w-3 mr-1" />
          Upcoming
        </span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
          <Check className="h-3 w-3 mr-1" />
          Completed
        </span>;
      case 'cancelled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">
          <X className="h-3 w-3 mr-1" />
          Cancelled
        </span>;
      default:
        return null;
    }
  };

  // Is reservation cancellable (future date and not already cancelled)
  const isCancellable = (reservation: Reservation) => {
    return (
      reservation.status === 'upcoming' &&
      isBefore(new Date(), parseISO(reservation.date))
    );
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Reservations</h1>
          <p className="text-gray-600">Manage all your classroom bookings in one place</p>
        </div>
        <Link to="/classrooms" className="btn btn-primary mt-4 md:mt-0">
          Book a Classroom
        </Link>
      </div>

      {/* Filter section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="relative">
              <button 
                className="btn btn-outline flex items-center"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {filterStatus === 'all' ? 'All Reservations' : 
                  filterStatus === 'upcoming' ? 'Upcoming' : 
                  filterStatus === 'completed' ? 'Completed' : 'Cancelled'}
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              
              {showFilterMenu && (
                <div className="absolute top-full left-0 mt-1 z-10 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                  <div className="py-1">
                    <button 
                      className={`block px-4 py-2 text-sm w-full text-left ${filterStatus === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                      onClick={() => {
                        setFilterStatus('all');
                        setShowFilterMenu(false);
                      }}
                    >
                      All Reservations
                    </button>
                    <button 
                      className={`block px-4 py-2 text-sm w-full text-left ${filterStatus === 'upcoming' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                      onClick={() => {
                        setFilterStatus('upcoming');
                        setShowFilterMenu(false);
                      }}
                    >
                      Upcoming
                    </button>
                    <button 
                      className={`block px-4 py-2 text-sm w-full text-left ${filterStatus === 'completed' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                      onClick={() => {
                        setFilterStatus('completed');
                        setShowFilterMenu(false);
                      }}
                    >
                      Completed
                    </button>
                    <button 
                      className={`block px-4 py-2 text-sm w-full text-left ${filterStatus === 'cancelled' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                      onClick={() => {
                        setFilterStatus('cancelled');
                        setShowFilterMenu(false);
                      }}
                    >
                      Cancelled
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <span className="ml-4 text-sm text-gray-500">
              {filteredReservations.length} reservation{filteredReservations.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <button 
              className={`btn ${filterStatus === 'all' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilterStatus('all')}
            >
              All
            </button>
            <button 
              className={`btn ${filterStatus === 'upcoming' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilterStatus('upcoming')}
            >
              Upcoming
            </button>
            <button 
              className={`btn ${filterStatus === 'completed' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilterStatus('completed')}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      {/* Reservations list */}
      <div className="space-y-4 mb-8">
        {sortedReservations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium mb-2">No reservations found</h3>
            <p className="text-gray-600 mb-6">
              {filterStatus === 'all' 
                ? "You haven't made any classroom reservations yet."
                : filterStatus === 'upcoming'
                ? "You don't have any upcoming reservations."
                : filterStatus === 'completed'
                ? "You don't have any completed reservations."
                : "You don't have any cancelled reservations."}
            </p>
            <Link to="/classrooms" className="btn btn-primary">
              Book a Classroom
            </Link>
          </div>
        ) : (
          sortedReservations.map(reservation => (
            <div 
              key={reservation.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between">
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-start sm:items-center mb-2">
                      <div className="mr-3">
                        <div className="w-10 h-10 rounded-md bg-primary-100 text-primary-700 flex items-center justify-center">
                          <Calendar className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{reservation.classroomName}</h3>
                        <p className="text-gray-600">{reservation.building}</p>
                      </div>
                      <div className="ml-auto sm:hidden">
                        {getStatusBadge(reservation.status)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 ml-0 sm:ml-13">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{format(new Date(reservation.date), 'MMM d, yyyy')}</span>
                        {isToday(new Date(reservation.date)) && (
                          <span className="ml-2 text-xs bg-primary-100 text-primary-800 px-1.5 py-0.5 rounded">Today</span>
                        )}
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{reservation.startTime} - {reservation.endTime}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{reservation.attendees} attendees</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="hidden sm:block mb-4">
                      {getStatusBadge(reservation.status)}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {isCancellable(reservation) && (
                        <button 
                          className="text-gray-500 hover:text-error-600 p-1"
                          onClick={() => setCancelDialogOpen(reservation.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                      <button 
                        className="text-gray-500 hover:text-primary-600 p-1"
                        onClick={() => toggleReservationDetails(reservation.id)}
                      >
                        {expandedReservation === reservation.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                {expandedReservation === reservation.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 animate-slide-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Booking Reference</h4>
                        <p className="font-medium">{reservation.id}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Purpose</h4>
                        <p>{reservation.purpose}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
                        <p className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {reservation.location}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Created By</h4>
                        <p>John Doe (you)</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <Link 
                        to={`/classrooms/${reservation.classroomId}`} 
                        className="btn btn-outline py-1 px-3 text-sm"
                      >
                        View Classroom
                      </Link>
                      
                      {isCancellable(reservation) && (
                        <button 
                          className="btn btn-primary py-1 px-3 text-sm"
                          onClick={() => setCancelDialogOpen(reservation.id)}
                        >
                          Cancel Reservation
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Cancel confirmation dialog */}
              {cancelDialogOpen === reservation.id && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
                    <div className="bg-error-50 p-4 flex items-start">
                      <div className="bg-error-100 rounded-full p-2 mr-3">
                        <AlertTriangle className="h-6 w-6 text-error-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-error-900">Cancel Reservation</h3>
                        <p className="text-error-700">This action cannot be undone.</p>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <p className="mb-4">
                        Are you sure you want to cancel your reservation for <strong>{reservation.classroomName}</strong> on <strong>{format(new Date(reservation.date), 'MMMM d, yyyy')}</strong> at <strong>{reservation.startTime}</strong>?
                      </p>
                      
                      <div className="flex justify-end space-x-3">
                        <button 
                          className="btn btn-outline"
                          onClick={() => setCancelDialogOpen(null)}
                        >
                          Keep Reservation
                        </button>
                        <button 
                          className="btn bg-error-600 text-white hover:bg-error-700 focus:ring-error-500"
                          onClick={() => handleCancelReservation(reservation.id)}
                        >
                          Yes, Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReservationsPage;