import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, darkMode, initialName, initialEmail, initialPassword, onSubmit }) => {
  const [activeTab, setActiveTab] = useState('register'); // Start on register tab
  const [formData, setFormData] = useState({
    name: initialName || '',
    email: initialEmail || '',
    password: initialPassword || '',
  });

  useEffect(() => {
    // Sync with initial props when modal opens
    setFormData({
      name: initialName || '',
      email: initialEmail || '',
      password: initialPassword || '',
    });
  }, [initialName, initialEmail, initialPassword, isOpen]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(); // Use the passed submit function
    } else {
      // Fallback logic (if needed)
      console.log('Submit with formData:', formData);
    }
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null;

  return (
    // ... rest of your AuthModal JSX, using formData and handleInputChange
    <div>
      {/* Existing modal structure */}
      <button onClick={handleSubmit}>
        {activeTab === 'register' ? 'Create Account' : 'Sign In'}
      </button>
    </div>
  );
};

export default AuthModal;