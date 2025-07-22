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

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

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
        // Redirect after success (e.g., to login page)
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

  return (
    <div>
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
          type="password" // Changed to password for security
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
      </form>
      {/* Remove live preview in production, or keep for debugging */}
      {/* <p>Live preview</p>
      <p>{name}</p>
      <p>{email}</p>
      <p>{password}</p> */}
    </div>
  );
}

export default Register;