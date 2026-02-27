import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, ArrowRight, Loader2, Github, Chrome, Heart, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

/**
 * Login Component
 * Features a split layout with a vibrant image and a clean, animated form.
 * Supports demo credentials for quick testing.
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Attempt to login via AuthContext
      await login({ email, password });
      
      addNotification({
        type: 'success',
        title: 'Welcome Back!',
        message: 'Successfully logged into your impact dashboard.'
      });

      // Redirect to dashboard on success
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Try the demo accounts below.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] overflow-hidden bg-white dark:bg-zinc-950">
      {/* Left Side: Visual/Branding (Hidden on mobile) */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative hidden w-1/2 lg:block"
      >
        <img
          src="https://picsum.photos/seed/india-volunteer/1200/1600"
          alt="Volunteering in India"
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/80 to-zinc-900/90 mix-blend-multiply" />
        
        <div className="absolute inset-0 flex flex-col justify-center px-16 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-lg">
              <Heart size={32} fill="currentColor" />
            </div>
            <h1 className="text-5xl font-black tracking-tighter">
              Empowering India <br />
              <span className="text-emerald-400">One Hour at a Time.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-zinc-300">
              Join thousands of volunteers across the nation making a tangible difference in education, healthcare, and rural development.
            </p>
            
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <p className="text-3xl font-bold">20+</p>
                <p className="text-sm text-zinc-400">Verified NGOs</p>
              </div>
              <div>
                <p className="text-3xl font-bold">50k+</p>
                <p className="text-sm text-zinc-400">Active Volunteers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side: Login Form */}
      <div className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white">Welcome Back</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Log in to access your impact dashboard. <br />
              <span className="text-xs font-bold text-emerald-600">✨ Pro Tip: Any @gmail.com OR any 6-char password works!</span>
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-2xl bg-red-500/10 p-4 text-sm font-semibold text-red-600"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Email Address</label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-2xl border border-black/5 bg-zinc-50 py-4 pl-12 pr-4 text-zinc-900 outline-none transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 dark:border-white/10 dark:bg-zinc-900 dark:text-white"
                    placeholder="volunteer@example.in"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Password</label>
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-2xl border border-black/5 bg-zinc-50 py-4 pl-12 pr-4 text-zinc-900 outline-none transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 dark:border-white/10 dark:bg-zinc-900 dark:text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <input type="checkbox" className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-600" />
                Keep me signed in
              </label>
              <Link to="#" className="text-sm font-bold text-emerald-600 hover:underline">Forgot Password?</Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 text-lg font-bold text-white shadow-xl shadow-emerald-600/20 transition-all hover:bg-emerald-700 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : (
                <>Sign In <ArrowRight size={20} /></>
              )}
            </motion.button>
          </form>

          {/* Demo Credentials Section */}
          <div className="rounded-3xl border border-dashed border-emerald-600/30 bg-emerald-500/5 p-6">
            <div className="mb-4 flex items-center gap-2 text-emerald-600">
              <ShieldCheck size={20} />
              <span className="text-sm font-black uppercase tracking-widest">Demo Credentials</span>
            </div>
            <div className="grid gap-4 text-xs">
              <div className="flex justify-between border-b border-emerald-600/10 pb-2">
                <span className="font-bold text-zinc-500">Volunteer:</span>
                <code className="bg-emerald-600/10 px-1 text-emerald-600">admin@volunteerhub.in</code>
              </div>
              <div className="flex justify-between border-b border-emerald-600/10 pb-2">
                <span className="font-bold text-zinc-500">Organization:</span>
                <code className="bg-emerald-600/10 px-1 text-emerald-600">mail@goonj.org</code>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-zinc-500">Password:</span>
                <code className="bg-emerald-600/10 px-1 text-emerald-600">password123</code>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            New to the platform?{' '}
            <Link to="/register" className="font-black text-emerald-600 hover:underline">Create Account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
