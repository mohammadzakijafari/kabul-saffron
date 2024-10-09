import React, { useEffect, useState } from 'react'
import heroImage from '../assets/hero-image.webp';
import ProductList from '../components/ProductList';
import axios from 'axios';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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