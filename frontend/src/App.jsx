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

function App() {

  return (
    <div>
      <BrowserRouter>
        <ProductContextProvider>
          <Navbar />
          <Routes>
            <Route path='/' element = { <Home /> } />
            <Route path='/login' element = { <Login /> } />
            

            <Route element = { <ProtectedRoutes /> }>
              <Route path = '/' element = { <Home /> } />
              <Route path = '/products' element = { <Products /> } />
              <Route path='/products/:id' element = { <SingleProduct /> } />
              <Route path = '/recipe' element = { <Recipe /> } />
              <Route path='/dashboard' element = { <Dashboard /> } />
              <Route path='/add-product' element = { <AddProduct /> } />
              <Route path='/sign-up' element = { <SignUp /> } />
            </Route>
          </Routes>
        </ProductContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
