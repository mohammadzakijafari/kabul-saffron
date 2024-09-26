import React, { useEffect, useState } from 'react'
import heroImage from '../assets/hero-image.webp';
import ProductList from '../components/ProductList';
import axios from 'axios';

const uri = "http://localhost:3000/products";

const Home = () => {
  const [products, setProducts] = useState([]);

    // Function to get all products from database
    async function getAllProducts() {
        try {
            let res = await axios.get(uri);
            // console.log(res.data);
            setProducts(res.data);
            
        } catch (error) {
            console.log(error);
            toast.error(error.data.msg);
        }
    }

    // Render all products on the screen once you open the app
    useEffect(() => {
        // Call the getAllProducts function here to populate products
        getAllProducts();
    }, []);
  return (
    <div>
        {/* Hero Section */}
        <div>
            <img src = { heroImage } alt='Hero Image' className='w-full h-[95vh]'/>
        </div>

        {/* Featured product List Section */}
        <div className='text-center mb-10 mt-28'>
          <h1 className='text-5xl'> Featured Collection </h1>
        </div>
        <div className='flex justify-center items-center mx-28'>
          <div className='grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {products.map((product, index) => (
              <ProductList key = { index } product = { product } />
            ))}
        
          </div>
        </div>
    </div>
  )
}

export default Home