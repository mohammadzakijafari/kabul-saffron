import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { GoPackage } from "react-icons/go";
import { AiOutlineUser, AiOutlineHome, AiOutlineCheckCircle, AiOutlineCreditCard } from "react-icons/ai";
import { BsCalendarCheck, BsFillBoxFill } from 'react-icons/bs';

const uri = "http://localhost:3000/payment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  let token = localStorage.getItem("token");

  const getAllOrders = async () => {
    try {
        let res = await axios.post(`${uri}/orders`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        }); 
        setOrders(res.data);
    } catch (error) {
        console.log(error);
    }
  }

  // -----------------------  get All Orders ---------------------;
  useEffect(() => {
      getAllOrders();
  }, []);
  console.log(orders);
  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6"> Orders </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {
          orders.map((order, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <GoPackage size={50} className="text-red-700" />
                <div className="flex-1">
                  <p className="text-lg font-semibold">Order ID: {order._id}</p>
                  <p className="text-gray-500">Price: ${order.amount}</p>
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <AiOutlineUser className="text-gray-600" />
                  <p>User: {order.user}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <AiOutlineHome className="text-gray-600" />
                  <p>Address: {order.address}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <AiOutlineCheckCircle className="text-green-500" />
                  <p>Payment Status: {order.paymentStatus}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <AiOutlineCreditCard className="text-gray-600" />
                  <p>Payment Method: {order.paymentMethod}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <BsCalendarCheck className="text-gray-600" />
                  <p>Payment Date: {new Date(order.paymentDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 mb-1">Order Status</label>
                <select className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="order-placed">Order Placed</option>
                  <option value="packing">Packing</option>
                  <option value="shipped">Shipped</option>
                  <option value="out-for-delivery">Out for delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        }
      </div>
    </div>


    // <div>
    //   <h1 className=''> Order Page </h1>
    //   <div>
    //     {
    //       orders.map((order, index) => (
    //         <div key={index} className='flex justify-center items-center gap-4'> 
    //           <GoPackage size={40} />
    //           <div className=''> 
    //             <div className='flex flex-col justify-center items-center'> 
    //               <p className=''> Order Id : {order._id} </p>
    //               <p className=''> Price: $ {order.amount} </p>
    //             </div>
    //           </div>
    //           <div className='flex flex-col justify-center items-center'>
    //             <p className=''> User: {order.user} </p>
    //             <p className=''> Address: {order.address} </p>
    //             <p className=''> Address: {order.address} </p>
    //           </div>
    //           <div className=''>
    //             <p className=''> Payment Status: {order.paymentStatus} </p>
    //           </div>
    //           <div className=''>
    //             <p className=''> Payment Status: {order.paymentMethod} </p>
    //           </div>
    //           <div className=''>
    //             <p className=''> Payment Status: {order.paymentDate} </p>
    //           </div>
    //           <div className=''>
    //             <select>
    //               <option value = "order-placed"> Order Placed </option>
    //               <option value = "packing"> Packing </option>
    //               <option value = "shipped"> Shipped </option>
    //               <option value = "out-for-delivery"> Out for delivery </option>
    //               <option value = "delivered"> Delivered </option>
    //             </select>
    //           </div>
    //         </div>
    //       ))
    //     }
    //   </div>
    // </div>
  )
}

export default Orders