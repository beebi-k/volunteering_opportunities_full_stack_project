import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Chatbot from './components/chatbot/Chatbot';
import { motion, AnimatePresence } from 'motion/react';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VolunteerDashboard from './pages/VolunteerDashboard';
import OrganizationDashboard from './pages/OrganizationDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Organizations from './pages/Organizations';
import Opportunities from './pages/Opportunities';
import Profile from './pages/Profile';
import CalendarPage from './pages/CalendarPage';
import MessagingPage from './pages/MessagingPage';
import GroupVolunteering from './pages/GroupVolunteering';
import ImpactReports from './pages/ImpactReports';
import ResourceHub from './pages/ResourceHub';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/dashboard" element={<PrivateRoute><VolunteerDashboard /></PrivateRoute>} />
          <Route path="/org-dashboard" element={<PrivateRoute><OrganizationDashboard /></PrivateRoute>} />
          <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/calendar" element={<PrivateRoute><CalendarPage /></PrivateRoute>} />
          <Route path="/messages" element={<PrivateRoute><MessagingPage /></PrivateRoute>} />
          <Route path="/groups" element={<PrivateRoute><GroupVolunteering /></PrivateRoute>} />
          <Route path="/impact" element={<PrivateRoute><ImpactReports /></PrivateRoute>} />
          <Route path="/resources" element={<PrivateRoute><ResourceHub /></PrivateRoute>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppContent() {
  const { user } = useAuth();
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const isHome = location.pathname === '/';

  return (
    <div className="relative min-h-screen overflow-hidden bg-white transition-colors duration-300 dark:bg-zinc-950">
      {/* Global Animated Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl dark:bg-emerald-500/10"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/10"
        />
      </div>

      <div className="relative z-10 flex h-screen overflow-hidden">
        {user && !isHome && !isAuthPage && <Sidebar />}
        
        <div className="flex flex-1 flex-col overflow-hidden">
          {(isHome || isAuthPage || !user) && <Navbar />}
          <main className="flex-1 overflow-y-auto">
            <AnimatedRoutes />
          </main>
        </div>
        <Chatbot />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <AppContent />
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
