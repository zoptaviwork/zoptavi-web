import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type AuthMode = 'login' | 'register';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signUp, user, isDemoMode } = useAuth();

  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // If user is already logged in, redirect to home
  if (user) {
    return (
      <div className="font-sans min-h-screen bg-brand-bg flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-lg p-10 text-center max-w-sm w-full space-y-5">
          <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-brand-teal" />
          </div>
          <h2 className="font-display font-extrabold text-xl text-brand-navy">You're Signed In!</h2>
          <p className="text-sm text-slate-500">Welcome back, <strong>{user.email?.split('@')[0]}</strong>. You are already logged into your Zoptavi account.</p>
          <div className="flex gap-3">
            <Link
              to="/"
              className="flex-grow h-11 rounded-lg bg-brand-teal hover:bg-brand-teal-hover text-white text-xs font-bold flex items-center justify-center transition-colors"
            >
              Go to Home
            </Link>
            <Link
              to="/category"
              className="flex-grow h-11 rounded-lg border border-slate-200 hover:bg-slate-50 text-brand-navy text-xs font-bold flex items-center justify-center transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'login') {
        const { error: signInError } = await signIn(email, password);
        if (signInError) {
          setError(signInError.message || 'Invalid email or password. Please try again.');
        } else {
          navigate('/');
        }
      } else {
        const { error: signUpError } = await signUp(email, password);
        if (signUpError) {
          setError(signUpError.message || 'Registration failed. Please try again.');
        } else {
          setSuccess('Account created successfully! Please check your email to confirm your account, then sign in.');
          setMode('login');
          setPassword('');
        }
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="font-sans min-h-screen bg-brand-bg flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6">

        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-teal to-teal-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5.5 h-5.5 text-white" />
            </div>
            <span className="font-display font-extrabold text-2xl tracking-tight bg-gradient-to-r from-brand-navy to-slate-700 bg-clip-text text-transparent">
              ZOPTAVI
            </span>
          </Link>
        </div>

        {/* Demo Mode Banner */}
        {isDemoMode && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
            <p className="text-xs font-bold text-amber-800">🔔 Demo Mode Active</p>
            <p className="text-[10px] text-amber-600 mt-1">Supabase is not yet configured. Any credentials will work for local testing.</p>
          </div>
        )}

        {/* Auth Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-lg p-7 sm:p-9 space-y-6">

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 bg-slate-100 rounded-xl p-1 gap-1">
            {(['login', 'register'] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); setSuccess(''); }}
                className={`h-9 rounded-lg text-xs font-bold transition-all ${
                  mode === m
                    ? 'bg-white text-brand-navy shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <div>
            <h1 className="font-display font-extrabold text-2xl text-brand-navy">
              {mode === 'login' ? 'Welcome Back!' : 'Join Zoptavi'}
            </h1>
            <p className="text-xs text-slate-400 mt-1.5">
              {mode === 'login'
                ? 'Sign in to access your orders, wishlist, and profile.'
                : 'Create your free account and start shopping smarter.'}
            </p>
          </div>

          {/* Error / Success Messages */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl px-4 py-3">
              ✗ {error}
            </div>
          )}
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl px-4 py-3">
              ✓ {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name (register only) */}
            {mode === 'register' && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-350" />
                  <input
                    type="text"
                    placeholder="Mohit Sharma"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 border border-slate-200 bg-slate-50 text-sm rounded-lg focus:outline-none focus:border-brand-teal transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-350" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 border border-slate-200 bg-slate-50 text-sm rounded-lg focus:outline-none focus:border-brand-teal transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Password *</label>
                {mode === 'login' && (
                  <button type="button" className="text-[10px] text-brand-teal font-bold hover:underline">
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-350" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={mode === 'register' ? 'At least 6 characters' : '••••••••'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-10 border border-slate-200 bg-slate-50 text-sm rounded-lg focus:outline-none focus:border-brand-teal transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-350 hover:text-slate-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* T&C acceptance for register */}
            {mode === 'register' && (
              <p className="text-[10px] text-slate-400 leading-relaxed">
                By creating an account, you agree to Zoptavi's{' '}
                <a href="#terms" className="text-brand-teal font-semibold hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#privacy" className="text-brand-teal font-semibold hover:underline">Privacy Policy</a>.
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-brand-teal hover:bg-brand-teal-hover text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-brand-teal/10 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-[1px]"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider + Quick Sign-in hint */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-[10px] text-slate-400 font-semibold">
              <span className="bg-white px-3">or continue with</span>
            </div>
          </div>

          {/* Google SSO placeholder */}
          <button
            onClick={() => setError('Google Sign-In coming soon! Please use email & password for now.')}
            className="w-full h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Mode toggle */}
          <p className="text-center text-xs text-slate-400">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setSuccess(''); }}
              className="text-brand-teal font-bold hover:underline"
            >
              {mode === 'login' ? 'Create Account' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Back to shop link */}
        <div className="text-center">
          <Link to="/" className="text-xs text-slate-400 hover:text-slate-600 font-semibold transition-colors">
            ← Continue Shopping Without Signing In
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Auth;
