import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { RegisterUserApi } from '../API/Api';
import { Eye, EyeOff, User, Mail, Lock, CheckCircle, AlertCircle, Loader } from 'lucide-react';

function Register({ darkMode }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const score = [minLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
    return {
      score,
      checks: { minLength, hasUpper, hasLower, hasNumber, hasSpecial },
      strength: score < 2 ? 'weak' : score < 4 ? 'medium' : 'strong'
    };
  };

  const passwordStrength = checkPasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    else if (formData.firstName.trim().length < 2) newErrors.firstName = 'First name must be at least 2 characters';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    else if (formData.lastName.trim().length < 2) newErrors.lastName = 'Last name must be at least 2 characters';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters long';
    else if (passwordStrength.score < 3) newErrors.password = 'Password is too weak. Include uppercase, lowercase, numbers, and special characters.';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const registrationData = {
        username: `${formData.firstName} ${formData.lastName}`, // Map to username
        email: formData.email,
        password: formData.password
      };
      console.log('Attempting registration with:', registrationData);
      const response = await RegisterUserApi(registrationData);

      if (response.status >= 200 && response.status < 300) {
        toast.success('Registration successful!');
        setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
        navigate('/login', { state: { message: 'Registration successful! Please login with your credentials.', email: formData.email } });
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error);
      if (error.response?.data?.message) {
        if (error.response.data.message.includes('email')) setErrors({ email: 'This email is already registered' });
        else toast.error(error.response.data.message);
      } else toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => ({
    weak: darkMode ? 'bg-red-400' : 'bg-red-500',
    medium: darkMode ? 'bg-yellow-400' : 'bg-yellow-500',
    strong: darkMode ? 'bg-green-400' : 'bg-green-500'
  }[passwordStrength.strength] || (darkMode ? 'bg-gray-600' : 'bg-gray-300'));

  const getPasswordStrengthText = () => ({
    weak: darkMode ? 'text-red-400' : 'text-red-600',
    medium: darkMode ? 'text-yellow-400' : 'text-yellow-600',
    strong: darkMode ? 'text-green-400' : 'text-green-600'
  }[passwordStrength.strength] || (darkMode ? 'text-gray-400' : 'text-gray-600'));

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className={`mx-auto h-12 w-12 rounded-xl flex items-center justify-center ${darkMode ? 'bg-indigo-500' : 'bg-indigo-600'}`}>
            <User className="h-6 w-6 text-white" />
          </div>
          <h2 className={`mt-6 text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Create your account</h2>
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Join TeachGear Store today</p>
        </div>
        <div className={`py-8 px-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-xl ${errors.firstName ? (darkMode ? 'border-red-400' : 'border-red-300') : (darkMode ? 'border-gray-600' : 'border-gray-300')} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                  placeholder="John"
                />
                {errors.firstName && <p className={`mt-1 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-xl ${errors.lastName ? (darkMode ? 'border-red-400' : 'border-red-300') : (darkMode ? 'border-gray-600' : 'border-gray-300')} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                  placeholder="Doe"
                />
                {errors.lastName && <p className={`mt-1 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-xl ${errors.email ? (darkMode ? 'border-red-400' : 'border-red-300') : (darkMode ? 'border-gray-600' : 'border-gray-300')} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                placeholder="john.doe@example.com"
              />
              {errors.email && <p className={`mt-1 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-xl ${errors.password ? (darkMode ? 'border-red-400' : 'border-red-300') : (darkMode ? 'border-gray-600' : 'border-gray-300')} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                placeholder="Enter your password"
              />
              {errors.password && <p className={`mt-1 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-xl ${errors.confirmPassword ? (darkMode ? 'border-red-400' : 'border-red-300') : (darkMode ? 'border-gray-600' : 'border-gray-300')} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className={`mt-1 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{errors.confirmPassword}</p>}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-xl ${darkMode ? 'bg-indigo-500' : 'bg-indigo-600'} text-white`}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
            <div className="text-center">
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Already have an account?{' '}
                <Link to="/login" className={`font-medium ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Sign in here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

