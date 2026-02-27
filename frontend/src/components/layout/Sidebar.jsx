import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Search, 
  Calendar, 
  BookOpen, 
  Users, 
  BarChart3, 
  User, 
  Settings, 
  LogOut,
  Heart,
  Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

import NotificationDropdown from './NotificationDropdown';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Search, label: 'Find Opportunities', path: '/opportunities' },
    { icon: Calendar, label: 'Event Calendar', path: '/calendar' },
    { icon: Users, label: 'Group Volunteering', path: '/groups' },
    { icon: BarChart3, label: 'Impact Reports', path: '/impact' },
    { icon: BookOpen, label: 'Resource Hub', path: '/resources' },
    { icon: User, label: 'My Profile', path: '/profile' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r border-black/5 bg-white dark:border-white/10 dark:bg-zinc-900">
      <div className="flex h-16 items-center px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
            <Heart size={18} fill="currentColor" />
          </div>
          <span className="text-lg font-black tracking-tight text-zinc-900 dark:text-white">
            VolunteerHub
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white'} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-black/5 p-4 dark:border-white/10">
        <div className="mb-4 flex items-center gap-3 px-2">
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-emerald-600/20">
            <img 
              src={user?.avatar_url || `https://i.pravatar.cc/150?u=${user?.id}`} 
              alt={user?.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-bold text-zinc-900 dark:text-white">{user?.name}</p>
            <p className="truncate text-[10px] font-medium text-zinc-500 uppercase tracking-widest">{user?.role}</p>
          </div>
          <NotificationDropdown />
        </div>
        
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-red-600 transition-all hover:bg-red-50 dark:hover:bg-red-900/10"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
