import React from 'react'
import dashboardLogo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Handling User Logout
  function handleLogout() {
    token = localStorage.removeItem("token");
    navigate("/admin");
  }
  return (
    <div className='flex items-center justify-between py-4 px-6 bg-gray-300'>
      <img src={dashboardLogo} alt='Dashboard Logo' className='w-32' />
      <div className='flex items-center gap-4'>
        <span className='text-black  font-medium text-sm'>Hello, User</span>
        <button 
        onClick={ handleLogout }
        className='bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-full transition duration-300 shadow-md'>
          Logout
        </button>
      </div>
    </div>


    // <div className='flex items-center justify-between py-3 px-5 shadow-lg'>
    //   <img src={dashboardLogo} alt='Dashboard Logo' className='w-32' />
    //   <div className='flex items-center gap-4'>
    //     <span className='text-sm font-medium'>Hello, User</span>
    //     <button className='bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-full transition duration-300'>
    //       Logout
    //     </button>
    //   </div>
    // </div>


    // <div className='flex items-center justify-between py-2 px-[4%]'>
    //     <img src = { dashboardLogo } alt='Dashboard Logo' />
    //     <button className='bg-red-700 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs'> Logout </button>
    // </div>
  )
}

export default Navbar