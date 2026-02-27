import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bell, X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = {
      id,
      type: 'info', // info, success, error
      title: '',
      message: '',
      timestamp: new Date(),
      read: false,
      ...notification
    };
    setNotifications((prev) => [newNotification, ...prev]);
    
    // Auto-remove after 5 seconds for toast-like behavior if needed
    // setTimeout(() => removeNotification(id), 5000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, markAsRead, markAllAsRead }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
        <AnimatePresence>
          {notifications.filter(n => !n.read).slice(0, 3).map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="pointer-events-auto flex w-80 items-start gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-2xl dark:border-white/10 dark:bg-zinc-900"
            >
              <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                n.type === 'success' ? 'bg-emerald-500/10 text-emerald-600' :
                n.type === 'error' ? 'bg-red-500/10 text-red-600' :
                'bg-blue-500/10 text-blue-600'
              }`}>
                {n.type === 'success' ? <CheckCircle size={18} /> :
                 n.type === 'error' ? <AlertCircle size={18} /> :
                 <Info size={18} />}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{n.title}</h4>
                <p className="mt-1 text-xs text-zinc-500">{n.message}</p>
              </div>
              <button 
                onClick={() => markAsRead(n.id)}
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};
