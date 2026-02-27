import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Plus, MapPin, Clock } from 'lucide-react';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [events, setEvents] = useState([
    { id: 1, title: 'Beach Cleanup', date: new Date(2026, 1, 28), time: '09:00 AM', location: 'Juhu Beach', category: 'Environment' },
    { id: 2, title: 'Teaching Session', date: new Date(2026, 2, 5), time: '10:30 AM', location: 'Dharavi Center', category: 'Education' },
    { id: 3, title: 'Food Distribution', date: new Date(2026, 2, 12), time: '06:00 PM', location: 'Andheri West', category: 'Community' },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    category: ''
  });

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const prevMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const nextMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return;

    const eventToAdd = {
      id: Date.now(),
      ...newEvent,
      date: new Date(newEvent.date)
    };

    setEvents([...events, eventToAdd]);
    setShowModal(false);
    setNewEvent({ title: '', date: '', time: '', location: '', category: '' });
  };

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-32 border-b border-r border-black/5 dark:border-white/10" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
      const dayEvents = events.filter(e => e.date.toDateString() === date.toDateString());
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <motion.div
          key={d}
          whileHover={{ scale: 1.02 }}
          className={`h-32 border-b border-r border-black/5 p-2 transition-all duration-300 hover:bg-emerald-50/40 dark:border-white/10 dark:hover:bg-emerald-900/20 rounded-md ${isToday ? 'bg-emerald-100/40 dark:bg-emerald-500/10' : ''}`}
        >
          <div className="flex items-center justify-between">
            <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${isToday ? 'bg-emerald-600 text-white shadow-lg' : 'text-zinc-500 bg-zinc-100 dark:bg-zinc-800'}`}>
              {d}
            </span>
            {dayEvents.length > 0 && (
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </div>
          <div className="mt-2 space-y-1">
            {dayEvents.map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="truncate rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
              >
                {event.title}
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    }
    return days;
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-white to-emerald-50 dark:from-zinc-950 dark:to-zinc-900 transition-all">

      {/* HEADER */}
      <header className="flex items-center justify-between border-b border-black/5 px-8 py-6 dark:border-white/10 backdrop-blur-lg bg-white/70 dark:bg-zinc-900/60">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white">Event Calendar</h1>
          <p className="text-sm text-zinc-500">Plan your volunteering journey</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-xl border border-black/5 bg-white shadow-sm p-1 dark:border-white/10 dark:bg-zinc-800">
            <button onClick={prevMonth} className="rounded-lg p-2 hover:bg-emerald-100 dark:hover:bg-zinc-700 transition"><ChevronLeft size={20} /></button>
            <span className="px-4 text-sm font-bold text-zinc-900 dark:text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button onClick={nextMonth} className="rounded-lg p-2 hover:bg-emerald-100 dark:hover:bg-zinc-700 transition"><ChevronRight size={20} /></button>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-2 text-sm font-bold text-white shadow-lg hover:shadow-emerald-500/40 transition-all"
          >
            <Plus size={18} /> Add Event
          </motion.button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* CALENDAR GRID */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-7 border-l border-t border-black/5 dark:border-white/10">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="border-b border-r border-black/5 bg-white py-3 text-center text-[11px] font-black uppercase tracking-widest text-zinc-400 dark:border-white/10 dark:bg-zinc-900">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-80 border-l border-black/5 bg-white/70 backdrop-blur-lg p-6 dark:border-white/10 dark:bg-zinc-900/50">
          <h3 className="mb-6 text-lg font-bold text-zinc-900 dark:text-white">Upcoming Events</h3>
          <div className="space-y-4">
            {events.map(event => (
              <motion.div
                key={event.id}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-black/5 bg-white p-4 shadow-md hover:shadow-xl transition-all dark:border-white/10 dark:bg-zinc-800"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-lg bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                    {event.category}
                  </span>
                  <span className="text-[10px] font-medium text-zinc-400">
                    {event.date.toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-bold text-zinc-900 dark:text-white">{event.title}</h4>
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                    <Clock size={12} /> {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                    <MapPin size={12} /> {event.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="w-96 rounded-3xl bg-white p-6 shadow-2xl dark:bg-zinc-900"
            >
              <h2 className="mb-5 text-lg font-bold">Add New Event</h2>

              <div className="space-y-3">
                {['title', 'date', 'time', 'location', 'category'].map(field => (
                  <input
                    key={field}
                    type={field === 'date' ? 'date' : field === 'time' ? 'time' : 'text'}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={newEvent[field]}
                    onChange={e => setNewEvent({ ...newEvent, [field]: e.target.value })}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all dark:border-zinc-700 dark:bg-zinc-800"
                  />
                ))}
              </div>

              <div className="mt-5 flex justify-end gap-3">
                <button onClick={() => setShowModal(false)} className="px-4 py-1 text-sm font-medium text-zinc-500 hover:text-zinc-700">
                  Cancel
                </button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddEvent}
                  className="rounded-xl bg-emerald-600 px-4 py-1 text-sm font-bold text-white shadow-md hover:bg-emerald-700"
                >
                  Add
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarPage;