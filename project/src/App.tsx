import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import ClassroomListPage from './pages/ClassroomListPage';
import ClassroomDetailPage from './pages/ClassroomDetailPage';
import BookingPage from './pages/BookingPage';
import ReservationsPage from './pages/ReservationsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="classrooms" element={<ClassroomListPage />} />
            <Route path="classrooms/:id" element={<ClassroomDetailPage />} />
            <Route path="book/:id" element={<BookingPage />} />
            <Route path="reservations" element={<ReservationsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#333',
          },
          success: {
            iconTheme: {
              primary: '#22C55E',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;