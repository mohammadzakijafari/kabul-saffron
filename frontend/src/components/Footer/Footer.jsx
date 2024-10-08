import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-red-700 text-white py-10 mt-28">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
            
            {/* About Kabul Saffron */}
            <div className="flex-1">
                <h2 className="text-white text-xl font-semibold mb-4">About Kabul Saffron</h2>
                <p className="text-gray-200">
                Kabul Saffron is dedicated to providing the finest saffron products directly from the heart of Afghanistan. Our passion for quality and commitment to sustainability set us apart in the market.
                </p>
            </div>
            
            {/* Quick Links */}
            <div className="flex-1">
                <h2 className="text-white text-xl font-semibold mb-4">Quick Links</h2>
                <ul className="space-y-2">
                <li><NavLink to="/" className="hover:text-gray-200">Home</NavLink></li>
                <li><NavLink to="/products" className="hover:text-gray-200">Products</NavLink></li>
                <li><NavLink to="/about-us" className="hover:text-gray-200">About Us</NavLink></li>
                <li><NavLink to="/contact" className="hover:text-gray-200">Contact Us</NavLink></li>
                </ul>
            </div>
            
            {/* Customer Service */}
            <div className="flex-1">
                <h2 className="text-white text-xl font-semibold mb-4">Customer Service</h2>
                <ul className="space-y-2">
                <li><NavLink to="/faq" className="hover:text-gray-200">FAQs</NavLink></li>
                <li><NavLink to="/shipping-info" className="hover:text-gray-200">Shipping Information</NavLink></li>
                <li><NavLink to="/return-policy" className="hover:text-gray-200">Return Policy</NavLink></li>
                <li><NavLink to="/terms" className="hover:text-gray-200">Terms & Conditions</NavLink></li>
                </ul>
            </div>
            
            {/* Contact Info */}
            <div className="flex-1">
                <h2 className="text-white text-xl font-semibold mb-4">Contact Us</h2>
                <p className="text-gray-200 mb-2"><strong>Email:</strong> info@kabul-saffron.com</p>
                <p className="text-gray-200 mb-2"><strong>Phone:</strong> +93 123 456 789</p>
                <p className="text-gray-200"><strong>Address:</strong> Kabul, Afghanistan</p>
                
                {/* Social Media Links */}
                <div className="flex space-x-4 mt-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
                    <FaFacebookF size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
                    <FaTwitter size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
                    <FaInstagram size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
                    <FaLinkedinIn size={20} />
                </a>
                </div>
            </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-10 border-t border-gray-500 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-300 mb-4 md:mb-0">© {new Date().getFullYear()} Kabul Saffron. All rights reserved.</p>
                
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded bg-gray-800 text-white border-none focus:outline-none focus:ring-2 focus:ring-red-500" />
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition">Subscribe</button>
                </div>
            </div>
            </div>
        </div>
        </footer>

  );
};

export default Footer;
