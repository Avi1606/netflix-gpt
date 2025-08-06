import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import InterviewRoom from './components/InterviewRoom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: '/profile',
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: '/interview',
      element: (
        <ProtectedRoute>
          <InterviewRoom />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;
