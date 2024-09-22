import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const uri = "http://localhost:3000/users";

const SignUp = () => {
    let [user, setUser] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();
    // handling user input change
    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        // Update the state with the added value by the user
        setUser({...user, [e.target.name]: value });
    }
    // handling user click to register
    function handleSignUp (e) {
        e.preventDefault();
        axios.post(`${uri}/register`, user)
            .then((res) => {
                alert("Sign Up Successful");
                navigate("/login");
            }
        )
        .catch((error) => {
            alert("Could not Sign Up");
        });
    }
  return (
    <div className = "flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className = "sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900"> Username </label>
                    <div className="mt-2">
                    <input id="username" 
                    name="username" 
                    type="text" 
                    onChange = { handleChange }
                    value={ user.username }
                    autoComplete="name" 
                    required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                    <input id="email" 
                    name="email" 
                    type="email" 
                    onChange = { handleChange }
                    value={ user.email }
                    autoComplete="email" 
                    required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900"> Password </label>
                    </div>
                    <div className="mt-2">
                    <input id="password" 
                    name="password" 
                    type="password" 
                    onChange = { handleChange }
                    value = { user.password }
                    autoComplete="current-password" 
                    required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <button type="submit"
                    onClick = { handleSignUp } 
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp