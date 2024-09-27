import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../context/ProductContext'
import SectionTitle from './SectionTitle';
import ProductList from './ProductList';

const LatestCollection = () => {
    const { products } = useContext(ProductContext);
    
    const [latestProduct, setLatestProduct] = useState([]);

    useEffect(() => {
        setLatestProduct(products.slice(0,8));
    }, [products])
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-4xl'>
            <SectionTitle text1 = { "Latest" } text2 = { "Collection" } />
        </div>

        <div className='flex justify-center items-center mx-28'>
          <div className='grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {latestProduct.map((product, index) => (
              <ProductList key = { index } product = { product } />
            ))}
        
          </div>
        </div>
    </div>
  )
}

export default LatestCollection