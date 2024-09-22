import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Navbar = () => {
    let token = localStorage.getItem("token");
    const navigate = useNavigate();

    // Navbar Active Menu Control
    const linkClass = ({ isActive }) => isActive ? 
    'bg-black text-white hover:bg-gray-900 hover:text-white rounded px-3 py-2' 
    : 
    'text-white hover:bg-gray-900 hover:text-white rounded px-3 py-2';

    // Handling User Logout
    function handleLogout() {
        token = localStorage.removeItem("token");
        navigate("/login");
    }

    // State to manage the visibility of the user menu
    const [menuVisible, setMenuVisible] = useState(false);
    // Function to toggle the user menu
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };
  return (
    <div>
        <nav className='bg-indigo-700 border-b border-indigo-500'>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                <div className='flex h-20 items-center justify-between'>
                    <div className='flex flex-1 items-center justify-center'>
                        <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
                            <img className='h-10 w-auto' src={logo} alt='React Jobs' />
                            <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                                Kabul Zaffron
                            </span>
                        </NavLink>
                    
                        <div className='md:ml-auto'>
                            <div className='flex space-x-2'>
                                {token ? 
                                <>
                                    <NavLink to='/' className= {linkClass}>
                                        HOME
                                    </NavLink>
                                    
                                    <NavLink to='/login' className= {linkClass} onClick = { handleLogout }>
                                        LOG OUT
                                    </NavLink>
                                </> : 
                                <>
                                    <NavLink to='/' className= {linkClass}>
                                        HOME
                                    </NavLink>
                                    <NavLink to='/sign-up' className= {linkClass}>
                                        SIGN IN
                                    </NavLink>
                                </>}
                                
                            </div>
                        </div>

                        {token ? 
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className="relative">
                                    <div className="flex justify-center items-center gap-5">
                                        <div>
                                            <button
                                            type="button"
                                            className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            id="user-menu-button"
                                            aria-expanded={menuVisible}
                                            aria-haspopup="true"
                                            onClick={toggleMenu} >
                                            <span className="absolute -inset-1.5"></span>
                                            <span className="sr-only"> Open user menu </span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                            </button>
                                        </div>
                                    {/* <div className="">
                                        {token ? <h1 className='text-white'> {decodedToken.username} </h1>
                                        : <> </>}
                                        
                                    </div>     */}
                                    </div>

                                    <div id="user-menu" className={`${ menuVisible ? "" : "hidden" } absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                    tabIndex="-1">

                                    <NavLink to = "/profile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0"> Your Profile </NavLink>
                                    <NavLink to = "/editProfile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1"> Edit Profile </NavLink>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2"> Sign out </a>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        : <> </>}
                    </div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar