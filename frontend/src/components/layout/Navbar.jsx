import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Sun, Moon, LogOut, User, LayoutDashboard, Search, Heart, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import NotificationDropdown from './NotificationDropdown';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/80">
      <div className="flex h-16 w-full items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
            >
              <Heart size={24} fill="currentColor" />
            </motion.div>
            <span className="hidden text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:block">
              VolunteerHub <span className="text-emerald-600">India</span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link to="/opportunities" className="text-sm font-medium text-zinc-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-500">
              Opportunities
            </Link>
            <Link to="/organizations" className="text-sm font-medium text-zinc-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-500">
              NGOs
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-black/5 bg-white text-zinc-600 shadow-sm transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: 20, opacity: 0, rotate: 45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -20, opacity: 0, rotate: -45 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <NotificationDropdown />

          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to={user.role === 'volunteer' ? '/dashboard' : '/org-dashboard'}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 bg-white text-zinc-600 shadow-sm transition-all hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                title="Dashboard"
              >
                <LayoutDashboard size={20} />
              </Link>
              <Link
                to="/profile"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 bg-white text-zinc-600 shadow-sm transition-all hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                title="Profile"
              >
                <User size={20} />
              </Link>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/10 bg-red-500/5 text-red-600 shadow-sm transition-all hover:bg-red-500/10"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-emerald-600/30"
              >
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
