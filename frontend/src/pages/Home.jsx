import React, { useEffect, useState } from 'react'
import heroImage from '../assets/hero-image.webp';
import ProductList from '../components/ProductList';
import axios from 'axios';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image from '../assets/saffron.jpg';
import backgroundImage from '../assets/background.jpg';

import image1 from '../assets/hero-image.webp';
import image2 from '../assets/hero-image1.jpg';
import image3 from '../assets/hero-image2.jpg';
import image4 from '../assets/hero-image3.jpg';
import { Link } from 'react-router-dom';


const uri = "http://localhost:3000/products";

const Home = () => {
  /* --------------------- Hero Slider Section ------------------------ */
  const sliderSettings = {
    dots: true, // Navigation dots below the slider
    infinite: true, // Infinite loop scrolling
    speed: 2000, // Transition speed in milliseconds
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1, // Scroll one image at a time
    autoplay: true, // Automatically scroll through images
    autoplaySpeed: 4000, // Autoplay speed (3 seconds)
    pauseOnHover: true, // Pause on hover
    fade: true, // Smooth fade effect between images
    responsive: [
      {
        breakpoint: 1024, // Settings for tablet and above
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600, // Settings for mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // const [products, setProducts] = useState([]);

  //   // Function to get all products from database
  //   async function getAllProducts() {
  //       try {
  //           let res = await axios.get(uri);
  //           // console.log(res.data);
  //           setProducts(res.data);
            
  //       } catch (error) {
  //           console.log(error);
  //           toast.error(error.data.msg);
  //       }
  //   }

  //   // Render all products on the screen once you open the app
  //   useEffect(() => {
  //       // Call the getAllProducts function here to populate products
  //       getAllProducts();
  //   }, []);
  return (
    <div>
      {/* Hero Image Slider with Actionable Text */}
      <div className="relative w-full h-[95vh]">
        <Slider {...sliderSettings}>
          {/* Slide 1 */}
          <div className="relative">
            <img src={image1} alt="Image 1" className="w-full h-[95vh] object-cover" />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
              <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Discover the Best Saffron</h1>
              <p className="text-white text-lg md:text-xl mb-6">Premium quality saffron from Kabul's finest farms.</p>
              <Link to="/shop" className="bg-red-700 text-white px-6 py-3 text-lg font-semibold rounded-md hover:bg-red-800 transition">
                Shop Now
              </Link>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="relative">
            <img src={image2} alt="Image 2" className="w-full h-[95vh] object-cover" />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
              <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Perfect for Your Dishes</h1>
              <p className="text-white text-lg md:text-xl mb-6">Enhance your recipes with authentic Afghan saffron.</p>
              <Link to="/recipes" className="bg-red-700 text-white px-6 py-3 text-lg font-semibold rounded-md hover:bg-red-800 transition">
                View Recipes
              </Link>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="relative">
            <img src={image3} alt="Image 3" className="w-full h-[95vh] object-cover" />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
              <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Buy in Bulk and Save</h1>
              <p className="text-white text-lg md:text-xl mb-6">Exclusive discounts on bulk orders for businesses.</p>
              <Link to="/bulk-orders" className="bg-red-700 text-white px-6 py-3 text-lg font-semibold rounded-md hover:bg-red-800 transition">
                Learn More
              </Link>
            </div>
          </div>
        </Slider>
      </div>

      {/* Hero Section */}
      {/* <div className="relative w-full h-[95vh]">
        <Slider {...sliderSettings}>
          <div>
            <img src={image1} alt="Image 1" className="w-full h-[95vh] object-cover" />
          </div>
          <div>
            <img src={image2} alt="Image 2" className="w-full h-[95vh] object-cover" />
          </div>
          <div>
            <img src={image3} alt="Image 3" className="w-full h-[95vh] object-cover" />
          </div>
          <div>
            <img src={image4} alt="Image 3" className="w-full h-[95vh] object-cover" />
          </div>
        </Slider>
      </div> */}
        {/* <div>
            <img src = { heroImage } alt='Hero Image' className='w-full h-[95vh]'/>
        </div> */}

        {/* Featured product List Section */}
        <LatestCollection />
        <BestSeller />
        
        {/* Section 1: Introduction with Image and Text */}
      <div className='flex justify-center items-center h-[100vh]'>
        <div className='md:w-1/2 w-full flex justify-center items-center'>
          <img
            className='w-full md:w-[50%] object-cover rounded-lg shadow-lg'
            src={image}
            alt='About Us'
          />
        </div>
        <div className='flex flex-col justify-center items-center md:w-1/2 h-[80vh] bg-gray-100 text-gray-700 text-lg px-4'>
          <div className='w-full md:w-2/3'>
            <h2 className='text-5xl font-bold text-black mb-10'>
              What is Saffron?
            </h2>
            <p className='mb-10 leading-relaxed'>
              Saffron is a spice which is famous for its flavor and color. The
              three stigmas in Crocus Sativus L. flower a.k.a Saffron flower,
              form this precious spice. People from all cultures and continents
              use this ancient spice to enjoy its magnificent bitter taste and
              fantastic fragrance.
            </p>

            <button className='bg-red-700 text-white px-6 py-3 rounded-md hover:bg-red-600 transition'>
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Blurred Background Section with Text */}
      <div className='relative h-[60vh] w-full'>
        <div
          className='absolute inset-0 bg-cover bg-center filter blur-sm'
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        ></div>

        <div className='relative flex flex-col pt-32 items-center h-full text-center px-4'>
          <h2 className='text-4xl md:text-5xl font-bold text-red-700 mb-6'>
            Discover the Magic of Saffron
          </h2>
          <p className='text-lg md:text-xl text-red-700 mb-6 leading-relaxed'>
            Experience the rich flavors and vibrant color of saffron, a spice
            known for its unmatched quality and versatility.
          </p>

          <button className='bg-red-600 text-white px-8 py-3 rounded hover:bg-red-500 transition'>
            Explore Our Products
          </button>
        </div>
      </div>

      {/* Section 2: How Saffron is Used */}
      <div className='flex flex-col-reverse md:flex-row justify-center items-center h-[100vh]'>
        <div className='flex flex-col justify-center items-center md:w-1/2 h-[80vh] bg-gray-100 text-gray-700 text-lg px-4'>
          <div className='w-full md:w-2/3'>
            <h2 className='text-5xl font-bold text-black mb-10'>
              How Saffron is Used?
            </h2>
            <p className='mb-10 leading-relaxed'>
              Saffron is diffused into hot or cold water, then typically used
              in popular dishes for all elements in a five-course meal, also
              various cold or hot drinks. Paellas, rice, chicken, curries,
              custards, biscuits, and cakes are among the food that saffron can
              influence with its golden hue.
            </p>

            <button className='bg-red-700 text-white px-6 py-3 rounded-md hover:bg-red-600 transition'>
              Learn More
            </button>
          </div>
        </div>

        <div className='md:w-1/2 w-full flex justify-center items-center'>
          <img
            className='w-full md:w-[50%] object-cover rounded-lg shadow-lg'
            src={image}
            alt='About Us'
          />
        </div>
      </div>

        {/* <div className='flex justify-center items-center h-[100vh]'>
          <div className='md:w-1/2 w-full flex justify-center items-center'>
            <img className='w-full md:w-[50%] object-cover rounded-lg shadow-lg' src={image} alt='About Us' />
          </div>
          <div className='flex flex-col justify-center items-center md:w-1/2 h-[80vh] bg-gray-100 text-gray-700 text-lg px-4'>
            <div className='w-full md:w-2/3'>
              <h2 className='text-5xl font-bold text-black mb-10'> What is Saffron? </h2>
              <p className='mb-10 leading-relaxed'>
              Saffron is a spice which is famous for its flavor and color. The three stigmas in Crocus Sativus L. flower a.k.a Saffron flower, 
              form this precious spice. People from all cultures and continents use this ancient spice to enjoy its magnificent bitter taste and 
              fantastic fragrance.
              </p>

              
              <button className='bg-red-700 text-white px-6 py-3 rounded-md hover:bg-red-600 transition'>
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center h-[100vh]'>
          <div className='flex flex-col justify-center items-center md:w-1/2 h-[80vh] bg-gray-100 text-gray-700 text-lg px-4'>
              <div className='w-full md:w-2/3'>
                <h2 className='text-5xl font-bold text-black mb-10'> How Saffron is used? </h2>
                <p className='mb-10 leading-relaxed'>
                Saffron is diffused into hot or cold water, then typically used in popular dishes for all of the elements in a five course meal and 
                also various cold or hot drinks. Paellas, rice, chicken, curries, custards, biscuits and cakes are among the food that saffron can 
                influence with its golden hue.
                </p>

                
                <button className='bg-red-700 text-white px-6 py-3 rounded-md hover:bg-red-600 transition'>
                  Learn More
                </button>
              </div>
            </div>
          <div className='md:w-1/2 w-full flex justify-center items-center'>
            <img className='w-full md:w-[50%] object-cover rounded-lg shadow-lg' src={image} alt='About Us' />
          </div>
        </div> */}

        {/* <div className='text-center mb-10 mt-28'>
          <h1 className='text-5xl'> Featured Collection </h1>
        </div> */}
        {/* <div className='flex justify-center items-center mx-28'>
          <div className='grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {products.map((product, index) => (
              <ProductList key = { index } product = { product } />
            ))}
        
          </div>
        </div> */}
    </div>
  )
}

export default Home