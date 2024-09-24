import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddProduct from './pages/AddProduct';
import Orders from './pages/Orders';
import Sidebar from './components/Sidebar';

function App() {


  return (
  <div className='min-h-screen'>
    <Navbar />
    <hr />
    <div className='flex w-full'>
        <Sidebar />
        
        <div className='w-[75%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-800 text-base'>
          <Routes>
            <Route path='/add-product' element = { <AddProduct /> } />
            <Route path='/product-list' element = { <AddProduct /> } />
            <Route path='/orders' element = { <Orders /> } />
          </Routes>
        </div>
    </div>
  </div>
  )
}

export default App
