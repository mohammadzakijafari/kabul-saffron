import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdAddCircle } from "react-icons/io";
import { FaListAlt } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className='w-[14%] min-h-screen bg-red-700 text-white flex flex-col'>
      <div className='flex flex-col gap-5 pt-5 pl-6'>
        <NavLink to='/add-product' className='flex items-center gap-3 p-4 rounded-md hover:bg-red-600 transition duration-200'>
          <IoMdAddCircle className='text-2xl' />
          <span className='hidden md:inline-block'>Add Product</span>
        </NavLink>

        <NavLink to='/product-list' className='flex items-center gap-3 p-4 rounded-md hover:bg-red-600 transition duration-200'>
        <FaListAlt className='text-2xl'/>
          <span className='hidden md:inline-block'>Product List</span>
        </NavLink>

        <NavLink to='/orders' className='flex items-center gap-3 p-4 rounded-md hover:bg-red-600 transition duration-200'>
        <MdManageAccounts className='text-2xl' />
          <span className='hidden md:inline-block'>Orders</span>
        </NavLink>
      </div>
    </div>


    // <div className='w-[14%] min-h-screen bg-gray-800 text-white'>
    //   <div className='flex flex-col gap-5 pt-5 pl-6'>
    //     <NavLink to='/add-product' className='flex items-center gap-3 p-4 rounded-md hover:bg-gray-700'>
    //       <IoMdAddCircle className='text-2xl' />
    //       <span className='hidden md:inline-block'>Add Product</span>
    //     </NavLink>

    //     <NavLink to='/product-list' className='flex items-center gap-3 p-4 rounded-md hover:bg-gray-700'>
    //       <IoMdAddCircle className='text-2xl' />
    //       <span className='hidden md:inline-block'>Product List</span>
    //     </NavLink>

    //     <NavLink to='/orders' className='flex items-center gap-3 p-4 rounded-md hover:bg-gray-700'>
    //       <IoMdAddCircle className='text-2xl' />
    //       <span className='hidden md:inline-block'>Orders</span>
    //     </NavLink>
    //   </div>
    // </div>


  // <div className='w-[12%] min-h-screen bg-slate-50 border-r-2'>
  //   <div className='flex flex-col gap-3 pt-5 pl-[15%] text-l'>
  //     <NavLink to = '/add-product' className = 'flex items-center gap-4 border border-gray-400 border-r-0 px-3 py-3 rounded-l'>
  //       <IoMdAddCircle className='w-8 h-8' />
  //       <p className='hidden md:block'> Add Product </p>
  //     </NavLink>

  //     <NavLink to = '/product-list' className = 'flex items-center gap-4 border border-gray-400 border-r-0 px-3 py-3 rounded-l'>
  //       <IoMdAddCircle className='w-8 h-8' />
  //       <p className='hidden md:block'> Product List </p>
  //     </NavLink>

  //     <NavLink to = '/orders' className = 'flex items-center gap-4 border border-gray-400 border-r-0 px-3 py-3 rounded-l'>
  //         <IoMdAddCircle className='w-8 h-8' />
  //         <p className='hidden md:block'> Orders </p>
  //     </NavLink>
  //   </div>
  // </div>
  )
}

export default Sidebar