import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';
import { LoginUserApi } from '../API/Api';

function Login() {
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
      console.log('Sending login request with data:', data); // Debug: Log request payload
      const response = await LoginUserApi(data);
      console.log('Login API response:', response.data, 'Status:', response.status); // Debug: Log response

      // Check for token in various response structures
      const token = response?.data?.token || response?.token;

      if (token) {
        // Save token to localStorage
        localStorage.setItem('token', token);

        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);

        // Store user info
        localStorage.setItem('userId', decoded.id || decoded._id);
        localStorage.setItem('userEmail', decoded.email);
        localStorage.setItem('userRole', decoded.role);

        toast.success(response?.data?.message || response?.message || 'Login successful!');

        setTimeout(() => {
          if (decoded.role === 'admin') {
            navigate('/homepage');
          } else {
            navigate('/dashboard');
          }
        }, 1000);
      } else {
        toast.error(response?.data?.message || response?.message || 'Login failed: invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err.response, err.message); // Debug: Log error details
      toast.error(err?.response?.data?.message || err?.message || 'Something went wrong during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 transition-colors duration-300">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-3">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={`w-full p-4 border-2 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 text-lg ${
                email
                  ? 'border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                  : 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
              }`}
              aria-invalid={!email}
              aria-describedby="email-error"
            />
            {!email && <p id="email-error" className="text-red-500 text-sm mt-2 font-medium">Email is required</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-3">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full p-4 border-2 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 text-lg ${
                password
                  ? 'border-green-400 focus:border-green-500 focus:ring-4 focus:ring-green-100'
                  : 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
              }`}
              aria-invalid={!password}
              aria-describedby="password-error"
            />
            {!password && <p id="password-error" className="text-red-500 text-sm mt-2 font-medium">Password is required</p>}
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={submit}
              disabled={isLoading}
              className={`w-full p-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-red-200 ${
                isLoading
                  ? 'bg-red-400 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600 hover:shadow-xl'
              }`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


export default Login;