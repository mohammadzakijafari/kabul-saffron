import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './components/Login';
import Navbar from './components/Navbar/Navbar';
import SignUp from './components/SignUp';
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {

  return (
    <div>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element = { <Home /> } />
          <Route path='/login' element = { <Login /> } />
          

          <Route element = { <ProtectedRoutes /> }>
            <Route path = '/products' element = { <Home /> } />

            <Route path='/sign-up' element = { <SignUp /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
