import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    let token = localStorage.getItem("token");
    let loggedInUser = false;
    token ? loggedInUser = true : loggedInUser = false;
  return loggedInUser ? <Outlet /> : <Navigate to = "/login" />;
}

export default ProtectedRoutes