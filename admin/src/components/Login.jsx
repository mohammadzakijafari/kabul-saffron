import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const uri = "http://localhost:3000/users";

const Login = () => {
    let [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    // handling email and password change
    const handleChange = (e) => {
        e.preventDefault();

        const value = e.target.value;
        setUser({...user, [e.target.name]: value });
    }
    // handling login 
    function handleLogin (e) {
        e.preventDefault();

        axios.post(`${uri}/admin`, user)
            .then((res) => {
                toast.success(res.data.msg);
                console.log(res.data);
                localStorage.setItem("token", res.data.token);
                navigate("/");
            }
        )
        .catch((error) => {
            alert("Could not Login");
        })
    }
  return (
    <div className="flex min-h-full flex-col items-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
                {/* Email Input */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            onChange={handleChange} 
                            value={user.email} 
                            autoComplete="email" 
                            required 
                            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700 sm:text-sm sm:leading-6" 
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-red-700 hover:text-red-500">Forgot password?</a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            onChange={handleChange} 
                            value={user.password} 
                            autoComplete="current-password" 
                            required 
                            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700 sm:text-sm sm:leading-6" 
                        />
                    </div>
                </div>

                {/* Sign In Button */}
                <div>
                    <button 
                        type="submit" 
                        onClick={handleLogin}
                        className="flex w-full justify-center rounded-md bg-red-700 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700">
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login