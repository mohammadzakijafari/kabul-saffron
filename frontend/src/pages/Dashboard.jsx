import React from 'react'
import Navbar from '../components/Dashboard/Navbar'
import Sidebar from '../components/Dashboard/Sidebar'
import { Route, Routes } from 'react-router-dom'
import ProductList from '../components/Dashboard/ProductList'
import Orders from '../components/Dashboard/Orders'
import AddProduct from '../components/Dashboard/AddProduct'

const Dashboard = () => {
  return (
    <div className='min-h-screen'>
        <Navbar />
        <hr />
        <div className='flex w-full'>
            <Sidebar />
            
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-800 text-base'>
                <Routes>
                    <Route path='/add-product' element = { <AddProduct /> } />
                    <Route path='/product-list' element = { <ProductList /> } />
                    <Route path='/orders' element = { <Orders /> } />
                </Routes>
            </div>
        </div>
    </div>
  )
}

export default Dashboard