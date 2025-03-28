import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { IoSearchOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { FaCartArrowDown, FaBars, FaTimes } from "react-icons/fa";
import { ProductContext } from '../../context/ProductContext';

const Navbar = () => {
    let token = localStorage.getItem("token");
    const { orderCount, setOrderCount } = useContext(ProductContext);
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

    // State for mobile menu visibility
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // State to manage the visibility of the user menu
    const [menuVisible, setMenuVisible] = useState(false);

    // Function to toggle the mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };
  return (
    // <div>
    //     <nav className='bg-red-700 border-b border-red-500'>
    //         <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
    //             <div className='flex h-20 items-center justify-between'>
    //                 <div className='flex flex-1 items-center justify-between'>
    //                     <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
    //                         <img className='h-10 w-auto' src={logo} alt='React Jobs' />
    //                         <span className='hidden md:block text-white text-2xl font-bold ml-2'>
    //                             Kabul Zaffron
    //                         </span>
    //                     </NavLink>
                    
    //                     <div className='md:ml-auto'>
    //                         <div className='flex space-x-2'>
    //                             {token ? 
    //                             <>
    //                                 <NavLink to='/' className= {linkClass}>
    //                                     HOME
    //                                 </NavLink>
    //                                 <NavLink to='/products' className= {linkClass}>
    //                                     Products
    //                                 </NavLink>
    //                                 <NavLink to='/recipe' className= {linkClass}>
    //                                     Recipe
    //                                 </NavLink>
    //                                 <NavLink to='/about-us' className= {linkClass}>
    //                                     About Us
    //                                 </NavLink>
    //                                 <NavLink to='/contact' className= {linkClass}>
    //                                     Contact Us
    //                                 </NavLink>
    //                                 <NavLink to='/login' className= {linkClass} onClick = { handleLogout }>
    //                                     LOG OUT
    //                                 </NavLink>
    //                             </> : 
    //                             <>
    //                                 <NavLink to='/' className= {linkClass}>
    //                                     HOME
    //                                 </NavLink>
    //                                 <NavLink to='/sign-up' className= {linkClass}>
    //                                     SIGN IN
    //                                 </NavLink>
    //                             </>}
                                
    //                         </div>
    //                     </div>

    //                     {/* User Profile, Search and Cart Section  */}
    //                     <div className='flex items-center gap-6'>
    //                         <IoSearchOutline size={40} color='white' className='cursor-pointer' />
    //                         <div className='group relative'>
    //                             <MdAccountCircle size={40} color='white' className='cursor-pointer' />
    //                             <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
    //                                 <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 rounded'>
    //                                     <p className='cursor-pointer hover:text-black'> My Profile </p>
    //                                     <p className='cursor-pointer hover:text-black'> Orders </p>
    //                                     <p className='cursor-pointer hover:text-black'> Logout </p>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         <NavLink to = '/orders' className = 'relative'>
    //                             <FaCartArrowDown size={40} color='white' />
    //                             <p className='absolute right-[-5px] bottom-[-5px] w-6 text-center leading-6 bg-black text-white aspect-square rounded-full text-[12px]'> { orderCount } </p>
    //                          </NavLink>
    //                     </div>

    //                 </div>
    //             </div>
    //         </div>
    //     </nav>
    // </div>

    <nav className='bg-red-700 border-b border-red-500 shadow-lg'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex h-20 items-center justify-between'>
                {/* Logo */}
                <div className='flex items-center'>
                    <NavLink to='/' className='flex items-center'>
                        <img className='h-14 w-auto rounded-full' src={logo} alt='Logo' />
                        <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                            Kabul Zaffron
                        </span>
                    </NavLink>
                </div>

                {/* Desktop Menu */}
                <div className='hidden md:flex space-x-8'>
                    {token ? (
                        <>
                            <NavLink to='/' className={linkClass}>HOME</NavLink>
                            <NavLink to='/products' className={linkClass}>PRODUCTS</NavLink>
                            <NavLink to='/recipe' className={linkClass}>RECIPE</NavLink>
                            <NavLink to='/about-us' className={linkClass}>ABOUT US</NavLink>
                            <NavLink to='/contact' className={linkClass}>CONTACT US</NavLink>
                            <NavLink to='/check-order' className={linkClass}> Orders </NavLink>
                            <NavLink to='/login' className={linkClass} onClick={handleLogout}>LOG OUT</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to='/' className={linkClass}>HOME</NavLink>
                            <NavLink to='/products' className={linkClass}>PRODUCTS</NavLink>
                            <NavLink to='/recipe' className={linkClass}>RECIPE</NavLink>
                            <NavLink to='/about-us' className={linkClass}>ABOUT US</NavLink>
                            <NavLink to='/contact' className={linkClass}>CONTACT US</NavLink>
                            <NavLink to='/sign-up' className={linkClass}> SIGN UP </NavLink>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className='md:hidden flex items-center'>
                    <button onClick={toggleMobileMenu} className='text-white'>
                        {isMobileMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
                    </button>
                </div>

                {/* User Profile, Search, Cart */}
                <div className='flex items-center gap-4'>
                    <IoSearchOutline size={30} color='white' className='cursor-pointer hover:text-red-300 transition' />
                    <div className='relative group'>
                        <MdAccountCircle size={30} color='white' className='cursor-pointer' onClick={toggleMenu} />
                        {menuVisible && (
                            <div className='absolute right-0 z-10 mt-2 w-36 rounded-md shadow-lg bg-white text-gray-700'>
                                <div className='py-2'>
                                    <p className='block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200'>My Profile</p>
                                    <p className='block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200'>Orders</p>
                                    <p className='block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200' onClick={handleLogout}>Logout</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <NavLink to='/orders' className='relative'>
                        <FaCartArrowDown size={30} color='white' />
                        {orderCount > 0 && (
                            <p className='absolute right-[-5px] bottom-[-5px] w-6 text-center leading-6 bg-black text-white rounded-full text-xs'>
                                {orderCount}
                            </p>
                        )}
                    </NavLink>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className='md:hidden'>
                    <div className='flex flex-col space-y-4 mt-4'>
                        {token ? (
                            <>
                                <NavLink to='/' className={linkClass} onClick={toggleMobileMenu}>HOME</NavLink>
                                <NavLink to='/products' className={linkClass} onClick={toggleMobileMenu}>PRODUCTS</NavLink>
                                <NavLink to='/recipe' className={linkClass} onClick={toggleMobileMenu}>RECIPE</NavLink>
                                <NavLink to='/about-us' className={linkClass} onClick={toggleMobileMenu}>ABOUT US</NavLink>
                                <NavLink to='/contact' className={linkClass} onClick={toggleMobileMenu}>CONTACT US</NavLink>
                                <NavLink to='/login' className={linkClass} onClick={() => { toggleMobileMenu(); handleLogout(); }}>LOG OUT</NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to='/' className={linkClass} onClick={toggleMobileMenu}>HOME</NavLink>
                                <NavLink to='/sign-up' className={linkClass} onClick={toggleMobileMenu}>SIGN IN</NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar