/*import { useState} from 'react'
import { createUserApi } from '../API/Api';
import toast from 'react-hot-toast';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit  = async (e) => {
      if (!name || !email || !password) {
        return toast.error("enter all field")
      }
      try{
        const formData = new FormData();
        formData.append('username', name);
        formData.append('email', email);
        formData.append('password', password);
        const response= await createUserApi(formData);
        if(response?.data?.success){
          return toast.success(response?.data?.message)
        }
        else{
          return toast.error(response?.data?.message)
        }

      }catch (err) {
        console.error("Error creating user:", err);
        toast.error(err?.response?.data?.message)
      }


    }

  return (
    <div>
      <form className='mt-10 '>
        <input type="text" name="name" value={name} className='border border-amber-300 m-2 p-2'
         onChange={(e) => setName(e.target.value)} placeholder='name' />
        <input type="text" name="email" value={email} className='border border-amber-300 m-2 p-2'
         onChange={(e) => setEmail(e.target.value)} placeholder='email' />
        <input type="text" name="password" value={password} className='border border-amber-300 m-2 p-2'
         onChange={(e) => setPassword(e.target.value)} placeholder='password' />
      </form>
      <button onClick={submit} className='bg-green-400 text-white rounded-sm p-3 ml-4'></button>
      <p>live preiew</p>
      <p>{name}</p>
      <p>{email}</p>
      <p>{password}</p>
    </div>
  )
}

export default Register*/

import React, { useState } from 'react';
import { createUserApi } from '../API/Api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // For navigation, ensure React Router is set up
import AuthModal from '../components/AuthModal'; // Adjust path if needed

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // State for form submission
  const submit = async () => {
    if (!name || !email || !password) {
      return toast.error('Please enter all fields');
    }

    try {
      const formData = new FormData();
      formData.append('username', name);
      formData.append('email', email);
      formData.append('password', password);

      const response = await createUserApi(formData);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setTimeout(() => {
          navigate('/login'); // Adjust route as needed
        }, 1000);
      } else {
        toast.error(response?.data?.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Error creating user:', err);
      toast.error(err?.response?.data?.message || 'An error occurred during registration');
    }
  };

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Start closed, open on button click
  const [darkMode, setDarkMode] = useState(false); // Example dark mode state

  const handleClose = () => {
    setIsModalOpen(false);
  };

  // Optional: Sync form data with modal if needed
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>Register</h1>

      {/* Form-based registration */}
      <form className="mt-10" onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <input
          type="text"
          name="name"
          value={name}
          className="border border-amber-300 m-2 p-2"
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <input
          type="email"
          name="email"
          value={email}
          className="border border-amber-300 m-2 p-2"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          value={password}
          className="border border-amber-300 m-2 p-2"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button
          type="submit"
          onClick={submit}
          className="bg-green-400 text-white rounded-sm p-3 ml-4"
        >
          Register
        </button>
        <button
          onClick={openModal}
          className="bg-blue-400 text-white rounded-sm p-3 ml-2"
        >
          Register with Modal
        </button>
      </form>

      {/* Modal-based registration */}
      {isModalOpen && (
        <AuthModal
          isOpen={isModalOpen}
          onClose={handleClose}
          darkMode={darkMode}
          // Optional: Pass form data or submit function to sync with modal
          initialName={name}
          initialEmail={email}
          initialPassword={password}
          onSubmit={submit} // Pass the submit function if AuthModal should use it
        />
      )}

      {/* Remove live preview in production, or keep for debugging */}
      {/* <p>Live preview</p>
      <p>{name}</p>
      <p>{email}</p>
      <p>{password}</p> */}
    </div>
  );
}

export default Register;