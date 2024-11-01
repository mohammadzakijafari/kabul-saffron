import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SectionTitle from '../components/SectionTitle';
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';
import Cart from './Cart';
import { backendUrl } from '../App';

// const uri = "http://localhost:3000/orders";

const Orders = () => {

  let token = localStorage.getItem("token");
  const [order, setOrder] = useState([]);
  const [quantities, setQuantities] = useState({});
  
  

  const getOrders = async() => {
    try {
      let res = await axios.get(`${backendUrl}/orders`, {
        headers: { Authorization: `Bearer ${token}`}
      });
      setOrder(res.data.orders);
      // console.log(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(order);
  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    // Initialize quantities for all orders
    const initialQuantities = {};
    order.forEach((orderItem) => {
      initialQuantities[orderItem._id] = orderItem.products[0].quantity;
    });
    setQuantities(initialQuantities);
  }, [order]);
  /* ------------------------------- Deleting Order from cart ------------------------- */
  async function handleDeleteOrder (deleteId) {
    try {
      if (window.confirm("Are you sure? You want to remove the order")) {
        let res = await axios.post(`${backendUrl}/orders/delete/${deleteId}`, deleteId, {
          headers: {Authorization: `Bearer ${token}`}
        });
        toast.success(res.data.msg);
        getOrders();
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* ------------------------------- Updating Quantity of Order from cart ------------------------- */
  async function handleQuantity(orderId, quantity) {
    console.log(`Order Id = ${orderId}`);
    console.log(`Quantity = ${quantity}`);
    // setOrder((prevOrder) => {
    //   prevOrder?.map((updatedOrder) => {
    //     updatedOrder._id === orderId
    //     ? {...updatedOrder, quantity: quantity}
    //     : updatedOrder;
    //   });
    // });
  };
  

  return (
    <div className='border-t pt-14 mx-20'>
      <div className='text-3xl px-5'>
        <SectionTitle text1 = {'YOUR'} text2 = {'CART'} />
      </div>

      <div className=''>
        {order.map((order, index) => {
          let productDetail = order.products[0];
          // setQuantity(productDetail.quantity);
          // console.log(order._id);
          return (
            <div className='px-5 py-2' key={index}> 
              <div className='py-4 px-4 border-t border text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 rounded'> 
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20 rounded' src = {productDetail?.productId?.images[0]} alt='' />
                  <div className=''> 
                    <p className='text-lg font-medium'> { productDetail?.productId?.productName } </p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p className='text-xl'> ${ order.totalPrice } </p>
                      <p className='px-2 sm:px-3 bg-slate-50'> 3 gr Glass Jar </p>
                    </div>
                  </div>
                </div>
                <input className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
                  type='Number' 
                  min={1} 
                  value= {quantities[order._id] || ''}
                  onChange={(e) => handleQuantity(order._id, e.target.value) } />

                <MdDeleteForever onClick = {()=> handleDeleteOrder(order._id) } className='cursor-pointer' size={40} />
              </div>
            </div>
          )
        })}
      </div> 

      {/* --------------------------- Cart Section --------------------------- */}
      <div className='flex justify-end my-20 mx-5'>
        <div className='w-full sm:w-[450px]'>
          <Cart />
        </div>
      </div>
    </div>
  )
}

export default Orders