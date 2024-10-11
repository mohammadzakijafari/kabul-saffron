import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const uri = "http://localhost:3000/products";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  let token = localStorage.getItem("token");
  console.log(token);
  const getAllProducts = async () => {
    try {
        let res = await axios.get(uri); 
        setProductList(res.data);
    } catch (error) {
        console.log(error);
    }
  }

  // getAllProducts();
  useEffect(() => {
      getAllProducts();
  }, []);

  async function handleDeleteProduct (deleteId) {
    try {
      if (window.confirm("Are you sure? You want to remove the Product")) {
        let res = await axios.delete(`${uri}/delete/${deleteId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success(res.data.msg);
        getAllProducts();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <p className=''> All Product List </p>
      <div className='flex flex-col gap-2'>
        {/* -------------------------- Table Title ------------------------  */}
        <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-lg'>
          <b> Image </b>
          <b> Name </b>
          <b> Price </b>
          <b> Product Size </b>
          <b> Action </b>
        </div>

        {/* -------------------------- Table Content ------------------------  */}
        {productList.map((product, index) => (
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-lg' key={index}> 
            <img className='w-28 h-28' src = {product.images[0]} alt='Product Image' />
            <p> { product.productName } </p>
            <p className='text-center cursor-pointer text-lg'> { product.regularPrice } </p>
            <p> Size </p>
            <p onClick={() => handleDeleteProduct(product._id)} className='text-center cursor-pointer text-lg'> X </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList