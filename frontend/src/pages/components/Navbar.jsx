//import React from 'react'
import { Link } from 'react-router'
const NavBar = () => {
  return (
    //className='h-40'
    <div  className='flex'> 
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black' to={'/'}> Home</Link>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black' to={'ContactUs'}>Contact Us</Link>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black' to={'/About'}>About Us</Link>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black' to={'/Register'}>Register</Link>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black' to={'/Login'}>Login</Link>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black' to={'/Products'}>Products</Link>
    </div>
  )
}

export default NavBar
