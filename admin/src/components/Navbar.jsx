import React from 'react'
import dashboardLogo from '../assets/logo.png';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-2 px-[4%]'>
        <img src = { dashboardLogo } alt='Dashboard Logo' />
        <button className='bg-red-700 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs'> Logout </button>
    </div>
  )
}

export default Navbar