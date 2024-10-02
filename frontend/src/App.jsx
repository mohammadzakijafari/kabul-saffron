import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar/Navbar';
import SignUp from './components/SignUp';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import AddProduct from './components/Dashboard/AddProduct';
import Home from './pages/Home';
import Products from './pages/Products';
import Recipe from './pages/Recipe';
import ProductContextProvider from './context/ProductContext';
import SingleProduct from './pages/SingleProduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from './pages/Orders';

function App() {

  return (
    <div>
      <BrowserRouter>
        <ProductContextProvider>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path='/' element = { <Home /> } />
            <Route path='/login' element = { <Login /> } />
            <Route path = '/' element = { <Home /> } />
            <Route path = '/products' element = { <Products /> } />
            <Route path='/products/:id' element = { <SingleProduct /> } />
            <Route path='/sign-up' element = { <SignUp /> } />

            <Route element = { <ProtectedRoutes /> }>
              <Route path = '/recipe' element = { <Recipe /> } />
              <Route path='/dashboard' element = { <Dashboard /> } />
              <Route path='/orders' element = { <Orders /> } />
              
            </Route>
          </Routes>
        </ProductContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
