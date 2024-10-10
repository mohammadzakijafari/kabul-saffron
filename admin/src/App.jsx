import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddProduct from './pages/AddProduct';
import Orders from './pages/Orders';
import Sidebar from './components/Sidebar';
import ProductList from './pages/ProductList';
import Login from './components/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
  <div className='min-h-screen'>
    <ToastContainer />
    <Navbar />
    <hr />
    <div className='flex w-full'>
        <Sidebar />
        <div className='w-full bg-white p-8 rounded-lg shadow-lg'>
          <h1 className='text-3xl font-bold text-black mb-6'>Dashboard</h1>
          <Routes>
            <Route path='/add-product' element={<AddProduct />} />
            <Route path='/product-list' element={<ProductList />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/admin' element={<Login />} />
          </Routes>
        </div>

        {/* <div className='w-full bg-gray-100 p-8 rounded-lg shadow-md'>
          <h1 className='text-2xl font-semibold text-gray-700 mb-6'>Dashboard</h1>
          <Routes>
            <Route path='/add-product' element={<AddProduct />} />
            <Route path='/product-list' element={<ProductList />} />
            <Route path='/orders' element={<Orders />} />
          </Routes>
        </div> */}

        {/* <div className='w-[75%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-800 text-base'>
          <Routes>
            <Route path='/add-product' element = { <AddProduct /> } />
            <Route path='/product-list' element = { <AddProduct /> } />
            <Route path='/orders' element = { <Orders /> } />
          </Routes>
        </div> */}
    </div>
  </div>
  )
}

export default App
