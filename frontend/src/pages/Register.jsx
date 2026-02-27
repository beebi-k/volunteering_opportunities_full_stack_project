import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Loader2, Globe, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'volunteer'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Background Image for Register */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://picsum.photos/seed/volunteer-bg/1920/1080?blur=10" 
          alt="Background" 
          className="h-full w-full object-cover opacity-20 dark:opacity-10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-zinc-950 dark:to-zinc-950" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md space-y-8 rounded-3xl border border-black/5 bg-white/80 p-8 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Join the Movement</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Create your account and start making an impact
          </p>
        </div>

        {error && (
          <div className="rounded-xl bg-red-500/10 p-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'volunteer' })}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all ${
                formData.role === 'volunteer' 
                  ? 'border-emerald-600 bg-emerald-500/5 text-emerald-600' 
                  : 'border-black/5 bg-zinc-50 text-zinc-500 dark:border-white/10 dark:bg-zinc-800'
              }`}
            >
              <Heart size={24} />
              <span className="text-xs font-bold">Volunteer</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'organization' })}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all ${
                formData.role === 'organization' 
                  ? 'border-emerald-600 bg-emerald-500/5 text-emerald-600' 
                  : 'border-black/5 bg-zinc-50 text-zinc-500 dark:border-white/10 dark:bg-zinc-800'
              }`}
            >
              <Globe size={24} />
              <span className="text-xs font-bold">Organization</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Full Name</label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="block w-full rounded-xl border border-black/5 bg-zinc-50 py-3 pl-10 pr-3 text-zinc-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full rounded-xl border border-black/5 bg-zinc-50 py-3 pl-10 pr-3 text-zinc-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full rounded-xl border border-black/5 bg-zinc-50 py-3 pl-10 pr-3 text-zinc-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex w-full justify-center rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
              <span className="flex items-center gap-2">Create Account <ArrowRight size={18} /></span>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-emerald-600 hover:text-emerald-500">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
