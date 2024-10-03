import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SectionTitle from '../components/SectionTitle';
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';

const uri = "http://localhost:3000/orders";

const Orders = () => {

  let token = localStorage.getItem("token");
  const [order, setOrder] = useState([]);

  const getOrders = async() => {
    try {
      let res = await axios.get(uri, {
        headers: { Authorization: `Bearer ${token}`}
      });
      setOrder(res.data.orders);
      
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(order);
  useEffect(() => {
    getOrders();
  }, []);

  /* ------------------------------- Deleting Order from cart ------------------------- */
  async function handleDeleteOrder (deleteId) {
    try {
      if (window.confirm("Are you sure? You want to remove the order")) {
        let res = await axios.post(`${uri}/delete/${deleteId}`, deleteId, {
          headers: {Authorization: `Bearer ${token}`}
        });
        toast.success(res.data.msg);
        getOrders();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='border-t pt-14'>
      <div className='text-3xl px-5'>
        <SectionTitle text1 = {'YOUR'} text2 = {'CART'} />
      </div>

      <div className=''>
        {order.map((order, index) => {
          let productDetail = order.products[0];
          console.log(order._id);
          return (
            <div className='px-5 py-2'> 
              <div className='py-4 px-4 border-t border text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 rounded'> 
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20 rounded' src = {productDetail?.productId?.images[0]} alt='' />
                  <div className=''> 
                    <p className='text-lg font-medium'> { productDetail?.productId?.productName } </p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p> { order.totalPrice } </p>
                      <p className='px-2 sm:px-3 bg-slate-50'> 3 gr Glass Jar </p>
                    </div>
                  </div>
                </div>
                <input className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type='Number' min={1} defaultValue = { productDetail.quantity } />
                <MdDeleteForever onClick = {()=> handleDeleteOrder(order._id) } className='cursor-pointer' size={40} />
              </div>
            </div>
          )
        })}
      </div> 
    </div>
  )
}

export default Orders