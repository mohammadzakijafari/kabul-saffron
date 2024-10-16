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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="font-medium text-red-600 hover:text-red-500"
                    >
                        Log in
                    </a>
                </p>
            </div>

            <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                <form className="space-y-6" action="#" method="POST">
                    {/* Username Input */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <div className="mt-1">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="name"
                                required
                                value={user.username}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={user.email}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={user.password}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <div>
                        <button
                            type="submit"
                            onClick={handleSignUp}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                {/* Divider */}
                {/* <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or
                            </span>
                        </div>
                    </div>

                    
                    <div className="mt-6">
                        <a
                            href="/login"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200"
                        >
                            Already have an account? Log in
                        </a>
                    </div>
                </div> */}
            </div>
        </div>
    </div>


    // <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    //     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    //         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
    //             Sign up to your account
    //         </h2>
    //     </div>

    //     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    //         <form className="space-y-6">
                
    //             <div>
    //                 <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
    //                     Username
    //                 </label>
    //                 <div className="mt-2">
    //                     <input
    //                         id="username"
    //                         name="username"
    //                         type="text"
    //                         onChange={handleChange}
    //                         value={user.username}
    //                         autoComplete="name"
    //                         required
    //                         className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 focus-visible:outline focus:ring-2 focus:ring focus:ring-red-700 sm:text-sm sm:leading-6"
    //                     />
    //                 </div>
    //             </div>

                
    //             <div>
    //                 <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
    //                     Email address
    //                 </label>
    //                 <div className="mt-2">
    //                     <input
    //                         id="email"
    //                         name="email"
    //                         type="email"
    //                         onChange={handleChange}
    //                         value={user.email}
    //                         autoComplete="email"
    //                         required
    //                         className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700 sm:text-sm sm:leading-6"
    //                     />
    //                 </div>
    //             </div>

                
    //             <div>
    //                 <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
    //                     Password
    //                 </label>
    //                 <div className="mt-2">
    //                     <input
    //                         id="password"
    //                         name="password"
    //                         type="password"
    //                         onChange={handleChange}
    //                         value={user.password}
    //                         autoComplete="current-password"
    //                         required
    //                         className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700 sm:text-sm sm:leading-6"
    //                     />
    //                 </div>
    //             </div>

    //             {/* Sign Up Button */}
    //             <div>
    //                 <button
    //                     type="submit"
    //                     onClick={handleSignUp}
    //                     className="flex w-full justify-center rounded-md bg-red-700 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 transition duration-200 ease-in-out"
    //                 >
    //                     Sign Up
    //                 </button>
    //             </div>
    //         </form>
    //     </div>
    // </div>
   
  )
}

export default SignUp