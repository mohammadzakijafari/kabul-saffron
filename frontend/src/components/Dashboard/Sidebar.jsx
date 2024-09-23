import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdAddCircle } from "react-icons/io";

const Sidebar = () => {
  return (
    <div className='w-[12%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-3 pt-5 pl-[15%] text-l'>
            <NavLink to = '/add-product' className = 'flex items-center gap-4 border border-gray-400 border-r-0 px-3 py-3 rounded-l'>
                <IoMdAddCircle className='w-8 h-8' />
                <p className='hidden md:block'> Add Product </p>
            </NavLink>

            <NavLink to = '/product-list' className = 'flex items-center gap-4 border border-gray-400 border-r-0 px-3 py-3 rounded-l'>
                <IoMdAddCircle className='w-8 h-8' />
                <p className='hidden md:block'> Product List </p>
            </NavLink>

            <NavLink to = '/orders' className = 'flex items-center gap-4 border border-gray-400 border-r-0 px-3 py-3 rounded-l'>
                <IoMdAddCircle className='w-8 h-8' />
                <p className='hidden md:block'> Orders </p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar