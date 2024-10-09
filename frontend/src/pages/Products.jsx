import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../context/ProductContext'
import ProductList from '../components/ProductList';

const Products = () => {
  const { products } = useContext(ProductContext);
  const [sortType, setSortType] = useState('all-product');
  const [sortedProduct, setSortedProduct] = useState([]);

  const sortProduct = () => {
    let productArray = products.slice();
    console.log(productArray);
    switch(sortType) {
      case 'featured':
        setSortedProduct(productArray.filter(product => product.productFeature === "featured"));
        break;
      case 'bestseller':
        setSortedProduct(productArray.filter(product => product.productFeature === "bestseller"));
        break;
      case 'first-quality':
        setSortedProduct(productArray.filter(product => product.productFeature === "first-quality"));
        break;
      case 'second-quality':
        setSortedProduct(productArray.filter(product => product.productFeature === "second-quality"));
        break;
      case 'low-high':
        setSortedProduct(productArray.sort((a,b) => (a.regularPrice - b.regularPrice)));
        break;
      case 'high-low':
        setSortedProduct(productArray.sort((a,b) => (b.regularPrice - a.regularPrice)));
        break;
      default:
        setSortedProduct(products);
        break;
    }
  }

  useEffect(() => {
    sortProduct();
  }, [sortType, products]);
  
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-6">
        <label className="block text-gray-700 text-4xl font-semibold my-12"> Products </label>
        <select
        onChange={(e) => setSortType(e.target.value)}
          className="w-96 mt-2 mr-2 p-5  rounded-md border-2 border-black"
          required >
          <option value=""> Sort </option>
          <option value="featured"> Featured </option>
          <option value="bestseller"> Bestseller </option>
          <option value="first-quality"> First Quality </option>
          <option value="second-quality"> Second Quality </option>
          <option value="low-high"> Price, low to high </option>
          <option value="high-low"> Price, high to low </option>
        </select>
      </div>
      
      <div className='flex justify-center items-center mx-5 sm:mx-10 md:mx-20 lg:mx-28 mt-16'>
          <div className='grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {sortedProduct.map((product, index) => (
                  <ProductList key={index} product={product} />
              ))}
          </div>
      </div>
    </div>
  )
}

export default Products