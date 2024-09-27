import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../context/ProductContext'
import ProductList from './ProductList';
import SectionTitle from './SectionTitle';

const BestSeller = () => {
    const { products } = useContext(ProductContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((product) => product.productFeature === "featured");
        setBestSeller(bestProduct);
    }, [products])
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-4xl'>
            <SectionTitle text1 = { "BestSeller" } text2 = { "Collection" } />
        </div>

        <div className='flex justify-center items-center mx-28'>
          <div className='grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {bestSeller.map((product, index) => (
              <ProductList key = { index } product = { product } />
            ))}
        
          </div>
        </div>
    </div>
  )
}

export default BestSeller