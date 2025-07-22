import React, { useState, useRef } from 'react';
import { createUserApi } from '../API/Api';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const nameInputRef = useRef(null);
  const navigate = useNavigate();

  const submit = async () => {
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      nameInputRef.current?.focus();
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      nameInputRef.current?.focus();
      return;
    }

    setIsLoading(true);
    try {
      const data = { name, email, password }; // Updated to match table schema
      const response = await createUserApi(data);
      console.log('API Response:', response); // Debug: Log full response

      // Enhanced success detection
      const isSuccess = 
        (response?.status === 200 || response?.status === 201 || response?.status === 204) ||
        (response?.data?.success === true || response?.data?.success === 'true') ||
        (response?.data?.message && response?.data?.message.toLowerCase().includes('successful')) ||
        (response?.data?.user) ||
        (response?.data?.id); // Check for auto-incremented id
      if (isSuccess) {
        toast.success(response?.data?.message || 'Registration successful!');
        setTimeout(() => {
          navigate('/login');
          nameInputRef.current?.focus();
        }, 1000);
      } else {
        toast.error(response?.data?.message || 'Registration failed. Please check your details and try again.');
      }
    } catch (err) {
      console.error('Error creating user:', err);
      toast.error(err?.response?.data?.message || 'An error occurred during registration. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join us today and get started</p>
        </div>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-3">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className={`w-full p-4 border-2 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 text-lg ${
                name
                  ? 'border-green-400 focus:border-green-500 focus:ring-4 focus:ring-green-100'
                  : 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
              }`}
              aria-invalid={!name}
              aria-describedby="name-error"
              ref={nameInputRef}
            />
            {!name && <p id="name-error" className="text-red-500 text-sm mt-2 font-medium">Name is required</p>}
          </div>

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
              placeholder="Create a strong password"
              className={`w-full p-4 border-2 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 text-lg ${
                password
                  ? 'border-yellow-400 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100'
                  : 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
              }`}
              aria-invalid={!password}
              aria-describedby="password-error"
            />
            {!password && <p id="password-error" className="text-red-500 text-sm mt-2 font-medium">Password is required</p>}
          </div>

          <div className="flex flex-col space-y-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-red-200 ${
                isLoading
                  ? 'bg-red-400 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600 hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;