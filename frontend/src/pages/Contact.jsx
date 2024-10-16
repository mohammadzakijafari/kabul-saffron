import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; // Import icons

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (like sending data to backend)
    alert('Message sent successfully!');
  };

  return (
    <div className='px-4 md:px-20'>
      {/* Section Title */}
      <div className='text-4xl text-center pt-10 border-t'>
        <h1 className='text-5xl py-10'> Contact Us </h1>
      </div>

      {/* Contact Information Section */}
      <div className='flex flex-col md:flex-row gap-10 my-16'>
        {/* Left Section: Contact Info */}
        <div className='md:w-1/2 w-full bg-white p-8 rounded-lg shadow-lg'>
          <h2 className='text-3xl font-bold text-gray-800 mb-6'>Get in Touch</h2>
          <p className='text-gray-700 mb-6'>
            We’d love to hear from you. Whether you have a question about products, pricing, or anything else, our team is ready to answer all your questions.
          </p>

          {/* Contact Details with Icons */}
          <div className='text-lg text-gray-700 space-y-6'>
            {/* Address */}
            <div className='flex items-start'>
              <FaMapMarkerAlt className='text-red-700 w-6 h-6 mr-4' />
              <div>
                <h3 className='font-semibold mb-1'>Address</h3>
                <p>123 Kabul Zaffron Street, Berlin, Germany</p>
              </div>
            </div>

            {/* Phone */}
            <div className='flex items-start'>
              <FaPhoneAlt className='text-red-700 w-6 h-6 mr-4' />
              <div>
                <h3 className='font-semibold mb-1'>Phone</h3>
                <p>+49 123 456 789</p>
              </div>
            </div>

            {/* Email */}
            <div className='flex items-start'>
              <FaEnvelope className='text-red-700 w-6 h-6 mr-4' />
              <div>
                <h3 className='font-semibold mb-1'>Email</h3>
                <p>info@kabulzaffron.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <div className='md:w-1/2 w-full bg-white p-8 rounded-lg shadow-lg'>
          <h2 className='text-3xl font-bold text-gray-800 mb-6'>Send Us a Message</h2>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Name Field */}
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                Your Name
              </label>
              <div className='mt-2'>
                <input
                  id='name'
                  name='name'
                  type='text'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm'
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                Your Email
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm'
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor='message' className='block text-sm font-medium text-gray-700'>
                Your Message
              </label>
              <div className='mt-2'>
                <textarea
                  id='message'
                  name='message'
                  rows='4'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm'
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Optionally, Add a Map Here */}
      {/* Google Maps Placeholder */}
      <div className='mt-16'>
        <h3 className='text-3xl text-center font-bold text-gray-800 mb-10'>Visit Us</h3>
        <div className='w-full h-64 bg-gray-200 rounded-lg shadow-lg'>
          {/* Replace this with actual Google Maps integration if needed */}
          <p className='text-center text-gray-500 pt-28'>[Google Maps Placeholder]</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
