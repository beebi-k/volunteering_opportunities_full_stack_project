import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, CheckCircle, AlertCircle, Info, Trash2 } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, removeNotification, markAsRead, markAllAsRead } = useNotifications();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 bg-white text-zinc-600 shadow-sm transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-zinc-900">
            {unreadCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 z-50 w-80 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-2xl dark:border-white/10 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between border-b border-black/5 p-4 dark:border-white/10">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-[10px] font-bold text-emerald-600 hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-black/5 dark:divide-white/10">
                    {notifications.map((n) => (
                      <div 
                        key={n.id} 
                        className={`flex gap-4 p-4 transition-colors ${n.read ? 'opacity-60' : 'bg-emerald-500/5'}`}
                        onClick={() => markAsRead(n.id)}
                      >
                        <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          n.type === 'success' ? 'bg-emerald-500/10 text-emerald-600' :
                          n.type === 'error' ? 'bg-red-500/10 text-red-600' :
                          'bg-blue-500/10 text-blue-600'
                        }`}>
                          {n.type === 'success' ? <CheckCircle size={14} /> :
                           n.type === 'error' ? <AlertCircle size={14} /> :
                           <Info size={14} />}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-zinc-900 dark:text-white">{n.title}</p>
                          <p className="mt-1 text-[10px] text-zinc-500">{n.message}</p>
                          <p className="mt-2 text-[10px] font-medium text-zinc-400">
                            {formatDistanceToNow(new Date(n.timestamp), { addSuffix: true })}
                          </p>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeNotification(n.id); }}
                          className="text-zinc-300 hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bell size={40} className="mb-4 text-zinc-200 dark:text-zinc-800" />
                    <p className="text-sm font-bold text-zinc-400">No notifications yet</p>
                  </div>
                )}
              </div>
              
              <div className="border-t border-black/5 p-4 text-center dark:border-white/10">
                <button className="text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                  View all activity
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
