import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MapPage from './pages/MapPage';
import EventsPage from './pages/EventsPage';
import Dashboard from './pages/Dashboard';
import LostAndFoundPage from './pages/LostAndFoundPage';
import UserManagementPage from './pages/UserManagementPage';
import AuditLogsPage from './pages/AuditLogsPage';
import SocialPage from './pages/SocialPage';
import ProfilePage from './pages/ProfilePage';
import NoticeBoardPage from './pages/NoticeBoardPage';
import PlacementDashboardPage from './pages/PlacementDashboardPage';
import BuildingManagementPage from './pages/BuildingManagementPage';
import { ToastContainer } from './components/ui/Toast';
import { subscribe } from './utils/toastManager';
import { initializeDarkMode } from './utils/darkMode';



import { AuthProvider } from './context/AuthContext';

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/dashboard', '/profile'];
  const shouldShowNavbar = !hideNavbarPaths.some(path => location.pathname.startsWith(path));

  const [toasts, setToasts] = useState([]);

  // Initialize dark mode on app load
  useEffect(() => {
    initializeDarkMode();
  }, []);

  // Subscribe to toast notifications
  useEffect(() => {
    const unsubscribe = subscribe((toast) => {
      setToasts((prev) => [...prev, toast]);
    });
    return unsubscribe;
  }, []);

  // Remove toast handler
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {shouldShowNavbar && <Navbar />}
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/lost-found" element={<LostAndFoundPage />} />
            <Route path="/social" element={<SocialPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/notices" element={<NoticeBoardPage />} />
            <Route path="/placements" element={<PlacementDashboardPage />} />
            <Route path="/admin/users" element={<UserManagementPage />} />
            <Route path="/admin/buildings" element={<BuildingManagementPage />} />
            <Route path="/admin/logs" element={<AuditLogsPage />} />
          </Routes>
        </main>

        {/* Toast Notifications */}
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </AuthProvider>
  );
}

export default App;
