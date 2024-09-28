import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'

const ProductList = ({ product }) => {
    const { currency } = useContext(ProductContext);
  return (
    <div className="group relative">
        <NavLink to={`/products/${product._id}`}>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img src= { product.images[0] } alt="Product Image" className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-2xl text-gray-700">
                    <a href="#">
                        { product.productName }
                    </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500"> { product.productFeature } </p>
                </div>
                <p className="text-sm font-medium text-gray-900"> {currency}{ product.regularPrice } </p>
            </div>
        </NavLink>
      </div>
  )
}

export default ProductList