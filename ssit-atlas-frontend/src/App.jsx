import { Routes, Route, useLocation } from 'react-router-dom';
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



function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/dashboard', '/profile'];
  const shouldShowNavbar = !hideNavbarPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
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
          <Route path="/admin/users" element={<UserManagementPage />} />
          <Route path="/admin/logs" element={<AuditLogsPage />} />
        </Routes>

      </main>
    </div>
  );
}

export default App;
