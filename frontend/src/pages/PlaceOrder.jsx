import React, { useEffect, useState } from 'react'
import SectionTitle from '../components/SectionTitle'
import Cart from "./Cart";
import { FaCcStripe } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const uri = "http://localhost:3000/orders";

const PlaceOrder = () => {
    let token = localStorage.getItem("token");
    const [method, setMethod] = useState('cod');
    const [order, setOrder] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    let grandTotal = 0;
    const shipmentFee = 10.00;


    const getOrders = async() => {
        try {
          let res = await axios.get(uri, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setOrder(res.data.orders);
        } catch (error) {
          console.log(error);
        }
      };
    
    useEffect(() => {
        getOrders();
    }, []);
    // Calculate grand total whenever 'order' changes
    useEffect(() => {
        const grandTotal = order.reduce((total, orderItem) => {
            return total + orderItem.totalPrice;
        }, 0);
        setSubTotal(grandTotal); // Update the subtotal state only when the order changes
    }, [order]);
    console.log(order);

    let orderItems = [];
    order.map((orderItem, index) => {
        orderItems.push({
            orderId: orderItem._id,
            quantity: orderItem.quantity,
            totalPrice: orderItem.totalPrice,
        }) 
    });
    // console.log(orderItems);
  return (
    <div className='flex gap-20 pt-20 p-5 sm:pt-14 min-h-[80vh] border-top mx-20'>
        {/* ----------------------------- Left Side ----------------------------- */}
        <div className='flex flex-col gap-10 w-full'>
            <div className='text-xl sm:text-2xl my-3'>
                <SectionTitle text1={'DELIVERY'} text2={"INFORMATION"} />
            </div>
            <div className='flex gap-3'>
                <input className='border border-gray-400 rounded py-2 px-3.5 w-full' type='text' placeholder='First name' />
                <input className='border border-gray-400 rounded py-2 px-3.5 w-full' type='text' placeholder='Last name' />
            </div>

            <input className='border border-gray-400 rounded py-2 px-3.5 w-full' type='email' placeholder='Email Address' />
            <input className='border border-gray-400 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street' />

            <div className='flex gap-3'>
                <input className='border border-gray-400 rounded py-2 px-3.5 w-full' type='number' placeholder='Zipcode' />
                <input className='border border-gray-400 rounded py-2 px-3.5 w-full' type='text' placeholder='Country' />
            </div>

            <input className='border border-gray-400 rounded py-2 px-3.5 w-full' type='number' placeholder='Phone' />
        </div>

        {/* ----------------------------- Right Side ----------------------------- */}
        <div className='w-full mt-10'>
            <div className='mt-8 min-w-80'>
                <div className='w-full'>
                    <div className='text-3xl'>
                        <SectionTitle text1={'CART'} text2={'TOTAL'} />

                    </div>

                    <div className='flex flex-col gap-2 mt-2 text-lg'>
                        <div className='flex justify-between'>
                        <p> Subtotal</p>
                        <p> ${subTotal}.00 </p>
                        </div>
                        <hr />
                        <div className='flex justify-between'>
                        <p> Shipping Fee </p>
                        <p> ${shipmentFee}.00 </p>
                        </div>
                        <hr />
                        <div className='flex justify-between'>
                        <b> Total </b>
                        <b> ${subTotal + shipmentFee}.00 </b>
                        </div>
                    </div>
                </div>
                {/* <Cart /> */}
            </div>
            <div className='mt-12'>
                {/* --------------------------- Payment Method Selection ----------------------------- */}
                <SectionTitle text1={"PAYMENT"} text2={"METHOD"} />
                <div className='flex flex-col gap-3 lg:flex-row'>
                    <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                        <p className = {`min-w-4 h-4 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
                        <FaCcStripe size={50} className='mx-4 w-20' />
                    </div>
                    <div onClick={() => setMethod('paypal')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                        <p className = {`min-w-4 h-4 border rounded-full ${method === 'paypal' ? 'bg-green-500' : ''}`}></p>
                        <FaCcPaypal size={50} className='mx-4 w-20' />
                    </div>
                    <div onClick={() => setMethod('mastercard')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                        <p className = {`min-w-4 h-4 border rounded-full ${method === 'mastercard' ? 'bg-green-500' : ''}`}></p>
                        <FaCcMastercard size={50} className='mx-4 w-20' />
                    </div>
                    <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                        <p className = {`min-w-4 h-4 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
                        <p className='text-gray-600 text-lg font-medium mx-4'> CASH ON DELIVERY </p>
                    </div>
                </div>

                <div className='w-full text-end mt-16'>
                <button onClick={() => navigate('/check-order')} className='bg-red-700 text-white text-lg my-16 px-8 py-4 rounded'> PLACE ORDER </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PlaceOrder