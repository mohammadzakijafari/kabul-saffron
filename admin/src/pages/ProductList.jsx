import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiTrash2 } from "react-icons/fi";

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
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-bold  mb-6">All Product List</h1>

      {/* Responsive table container */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          {/* Table Head */}
          <thead className="bg-gray-800 text-white sticky top-0">
            <tr>
              <th className="text-left py-3 px-4">Image</th>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-center py-3 px-4">Price</th>
              <th className="text-center py-3 px-4">Size</th>
              <th className="text-center py-3 px-4">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {productList.map((product, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <td className="py-4 px-6">
                  <img
                    className="w-20 h-20 object-cover rounded-lg"
                    src={product.images[0]}
                    alt="Product Image"
                  />
                </td>
                <td className="py-4 px-6">
                  <p className="font-semibold">{product.productName}</p>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="text-gray-700">${product.regularPrice}</span>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="text-gray-700">Size</span>
                </td>
                <td className="pt-8 px-6 text-center flex justify-center items-center">
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="flex items-center justify-center bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                  >
                    <FiTrash2 className="mr-2" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    // <div>
    //   <p className=''> All Product List </p>
    //   <div className='flex flex-col gap-2'>
    //     {/* -------------------------- Table Title ------------------------  */}
    //     <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-lg'>
    //       <b> Image </b>
    //       <b> Name </b>
    //       <b> Price </b>
    //       <b> Product Size </b>
    //       <b> Action </b>
    //     </div>

    //     {/* -------------------------- Table Content ------------------------  */}
    //     {productList.map((product, index) => (
    //       <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-lg' key={index}> 
    //         <img className='w-28 h-28' src = {product.images[0]} alt='Product Image' />
    //         <p> { product.productName } </p>
    //         <p className='text-center cursor-pointer text-lg'> { product.regularPrice } </p>
    //         <p> Size </p>
    //         <p onClick={() => handleDeleteProduct(product._id)} className='text-center cursor-pointer text-lg'> X </p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  )
}

export default ProductList