import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const NavBar = () => {
  const { itemCount } = useCart()

  return (
    <div className='flex'>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black' to={'/'}>Home</Link>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black' to={'/ContactUs'}>Contact Us</Link>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black' to={'/about'}>About Us</Link>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black' to={'/Register'}>Register</Link>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black' to={'/Login'}>Login</Link>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black' to={'/Products'}>Products</Link>
      <Link className='bg-pink-200 pr-4 pl-4 p-2 m-20 text-black relative' to={'/cart'}>
        Cart
        {itemCount > 0 && (
          <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs'>
            {itemCount}
          </span>
        )}
      </Link>
    </div>
  )
}

export default NavBar
