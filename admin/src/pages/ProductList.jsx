import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiTrash2, FiEdit } from "react-icons/fi";

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
    <div className="mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Product List</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {productList.map((product, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
            {/* Product Image */}
            <img 
              className="w-full h-72 object-cover rounded-lg mb-4"
              src={product.images[0]}
              alt={product.productName}
            />

            {/* Product Info */}
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-gray-800">{product.productName}</h2>
              <p className="text-gray-500">Price: ${product.regularPrice}</p>
              <p className="text-gray-500">Size: {product.size}</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-between space-x-2">
              {/* Update Button */}
              <button 
                onClick={() => handleUpdateProduct(product._id)} 
                className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 w-1/2"
              >
                <FiEdit className="mr-2" /> Update
              </button>

              {/* Delete Button */}
              <button 
                onClick={() => handleDeleteProduct(product._id)} 
                className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 w-1/2"
              >
                <FiTrash2 className="mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    // <div className="mx-auto p-4">
    //   <h1 className="text-3xl font-bold  mb-6">All Product List</h1>

    //   {/* Responsive table container */}
    //   <div className="overflow-x-auto shadow-md rounded-lg">
    //     <table className="min-w-full bg-white">
    //       {/* Table Head */}
    //       <thead className="bg-gray-800 text-white sticky top-0">
    //         <tr>
    //           <th className="text-left py-3 px-4">Image</th>
    //           <th className="text-left py-3 px-4">Name</th>
    //           <th className="text-center py-3 px-4">Price</th>
    //           <th className="text-center py-3 px-4">Size</th>
    //           <th className="text-center py-3 px-4">Action</th>
    //         </tr>
    //       </thead>

    //       {/* Table Body */}
    //       <tbody>
    //         {productList.map((product, index) => (
    //           <tr
    //             key={index}
    //             className="border-b hover:bg-gray-100 transition duration-300 ease-in-out"
    //           >
    //             <td className="py-4 px-6">
    //               <img
    //                 className="w-20 h-20 object-cover rounded-lg"
    //                 src={product.images[0]}
    //                 alt="Product Image"
    //               />
    //             </td>
    //             <td className="py-4 px-6">
    //               <p className="font-semibold">{product.productName}</p>
    //             </td>
    //             <td className="py-4 px-6 text-center">
    //               <span className="text-gray-700">${product.regularPrice}</span>
    //             </td>
    //             <td className="py-4 px-6 text-center">
    //               <span className="text-gray-700">Size</span>
    //             </td>
    //             <td className="pt-8 px-6 text-center flex justify-center items-center">
    //               <button
    //                 onClick={() => handleDeleteProduct(product._id)}
    //                 className="flex items-center justify-center bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors duration-300"
    //               >
    //                 <FiTrash2 className="mr-2" /> Delete
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  )
}

export default ProductList