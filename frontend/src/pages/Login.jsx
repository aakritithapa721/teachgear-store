import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';
import { LoginUserApi } from '../API/Api';
import { Mail, Lock, Loader } from 'lucide-react';

function Login({ darkMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const data = { email, password };
      console.log('Sending login request with data:', data);
      const response = await LoginUserApi(data);
      console.log('Login API response:', response.data, 'Status:', response.status);

      if (response.status >= 200 && response.status < 300) {
        const { token, user } = response.data;
        if (token) {
          localStorage.setItem('token', token);
          console.log('Token stored in localStorage:', token);

          const decoded = jwtDecode(token);
          console.log('Decoded token:', decoded);

          localStorage.setItem('userId', decoded.id || decoded._id);
          localStorage.setItem('userEmail', decoded.email);
          localStorage.setItem('userRole', decoded.role || 'user');

          toast.success(response.data.message || 'Login successful!');
          if (decoded.role === 'admin') {
            console.log('Redirecting to /admin for admin');
            navigate('/admin');
          } else {
            console.log('Redirecting to /dashboard for user');
            navigate('/dashboard');
          }
        } else {
          toast.error('Login failed: No token received');
        }
      }
    } catch (err) {
      console.error('Login error details:', err.response?.data, err.response?.status, err.message);
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong during login';
      if (err.response?.status === 404) {
        toast.error('User not found. Please check your email or register.');
      } else if (err.response?.status === 401) {
        toast.error('Invalid credentials. Please try again.');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 theme-transition ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-900'
          : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'
      }`}
      style={{
        background: darkMode
          ? 'linear-gradient(135deg, var(--bg-primary, #0f172a) 0%, var(--bg-secondary, #1e293b) 50%, #1e1b4b 100%)'
          : 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #faf5ff 100%)',
      }}
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div
            className={`mx-auto h-12 w-12 rounded-xl flex items-center justify-center shadow-lg hover-lift ${
              darkMode ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gradient-to-r from-indigo-600 to-purple-600'
            }`}
            style={{ background: 'linear-gradient(135deg, var(--primary, #3b82f6) 0%, #8b5cf6 100%)' }}
          >
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h2
            className={`mt-6 text-3xl font-bold theme-transition ${darkMode ? 'text-white' : 'text-gray-900'}`}
            style={{ color: 'var(--text-primary)' }}
          >
            Welcome Back
          </h2>
          <p
            className={`mt-2 text-sm theme-transition ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            style={{ color: 'var(--text-secondary)' }}
          >
            Sign in to your account
          </p>
        </div>

        <div
          className={`py-8 px-6 shadow-2xl rounded-2xl border backdrop-blur-sm custom-card theme-transition ${
            darkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-100'
          }`}
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)',
            boxShadow: '0 25px 50px -12px var(--shadow-color)',
          }}
        >
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); submit(); }}>
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-1 theme-transition ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                style={{ color: 'var(--text-primary)' }}
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`custom-input focus-ring w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none transition-all ${
                    !email
                      ? darkMode
                        ? 'border-red-400 bg-red-900/20'
                        : 'border-red-300 bg-red-50'
                      : darkMode
                      ? 'border-gray-600 bg-gray-700/50'
                      : 'border-gray-300 bg-white'
                  } ${darkMode ? 'text-white' : 'text-gray-900'}`}
                  style={{
                    backgroundColor: !email ? (darkMode ? '#7f1d1d20' : '#fef2f2') : 'var(--bg-primary)',
                    borderColor: !email ? 'var(--error)' : 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="john.doe@example.com"
                />
              </div>
              {!email && <p className={`mt-1 text-sm flex items-center ${darkMode ? 'text-red-400' : 'text-red-600'}`}><Mail className="h-4 w-4 mr-1" />Email is required</p>}
            </div>

            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium mb-1 theme-transition ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                style={{ color: 'var(--text-primary)' }}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`custom-input focus-ring w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none transition-all ${
                    !password
                      ? darkMode
                        ? 'border-red-400 bg-red-900/20'
                        : 'border-red-300 bg-red-50'
                      : darkMode
                      ? 'border-gray-600 bg-gray-700/50'
                      : 'border-gray-300 bg-white'
                  } ${darkMode ? 'text-white' : 'text-gray-900'}`}
                  style={{
                    backgroundColor: !password ? (darkMode ? '#7f1d1d20' : '#fef2f2') : 'var(--bg-primary)',
                    borderColor: !password ? 'var(--error)' : 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="Enter your password"
                />
              </div>
              {!password && <p className={`mt-1 text-sm flex items-center ${darkMode ? 'text-red-400' : 'text-red-600'}`}><Lock className="h-4 w-4 mr-1" />Password is required</p>}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`custom-button-primary group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg ${
                  darkMode
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:ring-indigo-400'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:ring-indigo-500'
                }`}
                style={{
                  background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
                  boxShadow: isLoading ? 'none' : '0 4px 15px var(--shadow-focus)',
                }}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>

            <div className="text-center">
              <p
                className={`text-sm theme-transition ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ color: 'var(--text-secondary)' }}
              >
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className={`font-medium transition-colors hover:underline ${
                    darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'
                  }`}
                  style={{ color: 'var(--primary)' }}
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
