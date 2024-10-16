import React, { useEffect, useState } from 'react'
import SectionTitle from '../components/SectionTitle'
import Cart from "./Cart";
import { FaCcStripe } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const uri = "http://localhost:3000/orders";
const paymentUri = "http://localhost:3000/payment";

const PlaceOrder = () => {
    let token = localStorage.getItem("token");
    const [method, setMethod] = useState('cod');
    const [order, setOrder] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    let grandTotal = 0;
    const shipmentFee = 10.00;

    const navigate = useNavigate();

    const [orderPayment, setOrderPayment] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        zipCode: "",
        country: "",
        phone: "",
    });

    // Handle input change when user enters product's value
    function handleChange (e) {
        const {name, value} = e.target;
        setOrderPayment({...orderPayment, [name]: value, });
    }

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
    // console.log(order);

    let orderItems = [];
    let productsId = [];
    let productsName = [];
    let productsRegularPrice = [];
    console.log(order);
    order.map((orderItem, index) => {
        orderItems.push({
            orderId: orderItem._id,
            productName: orderItem?.products[0]?.productId?.productName,
            quantity: orderItem.quantity,
            totalPrice: orderItem.totalPrice,
        });

        productsId.push({
            productId: orderItem?.products[0]?.productId?._id
        });
        productsName.push({
            productName: orderItem?.products[0]?.productId?.productName
        })
    });
    // console.log(orderItems);
    // console.log(productsId);

    const newOrderPayment = {
        productsId,
        productsName,
        orderItems,
        amount: subTotal,
        ...orderPayment,
    }
    // Function to add a new Order for payment
    async function addNewOrderPayment(e) {
        e.preventDefault();
        try {
            switch(method) {
                case 'cod':
                    let res = await axios.post(`${paymentUri}/cash`, newOrderPayment, {
                        headers: { Authorization: `Bearer ${token}`}
                    });
                    toast.success(res.data.msg);
                    navigate("/check-order");
                    console.log(res.data);
                    break;
                case 'stripe':
                    const resStripe = await axios.post(`${paymentUri}/stripe`, newOrderPayment, {
                        headers: { Authorization: `Bearer ${token}`}
                    });
                    if (resStripe.data.success) {
                        const { session_url } = resStripe.data
                        console.log(session_url);
                        window.location.replace(session_url);
                        
                    } else {
                        toast.error(resStripe.data.message);
                    }
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            console.log("Connection to Server Problem");
        }

    }
  return (
    <div className='flex gap-20 pt-20 p-5 sm:pt-14 min-h-[80vh] border-top mx-20'>
        {/* ----------------------------- Left Side ----------------------------- */}
        <form className='flex flex-col gap-10 w-full'>
            <div className='text-xl sm:text-2xl my-5'>
                <p className='text-4xl'> DELIVERY INFORMATION </p>
            </div>
            <div className='flex gap-3'>
                <input 
                    id='firstName' 
                    name='firstName' 
                    className='border border-gray-400 rounded py-2 px-3.5 w-full' 
                    type='text' 
                    placeholder='First name'
                    value = { orderPayment.firstName }
                    onChange = { handleChange } />
                <input 
                    id='lastName'
                    name='lastName'
                    className='border border-gray-400 rounded py-2 px-3.5 w-full' 
                    type='text' 
                    placeholder='Last name'
                    value = { orderPayment.lastName }
                    onChange = { handleChange } />
            </div>

            <input 
                id='email'
                name='email'
                className='border border-gray-400 rounded py-2 px-3.5 w-full' 
                type='email' 
                placeholder='Email Address'
                value = { orderPayment.email }
                onChange = { handleChange } />
            <input 
                id='street'
                name='street'
                className='border border-gray-400 rounded py-1.5 px-3.5 w-full' 
                type='text' 
                placeholder='Street'
                value = { orderPayment.street }
                onChange = { handleChange } />

            <div className='flex gap-3'>
                <input 
                    id='zipCode'
                    name='zipCode'
                    className='border border-gray-400 rounded py-2 px-3.5 w-full' 
                    type='number' 
                    placeholder='Zipcode'
                    value = { orderPayment.zipCode }
                    onChange = { handleChange } />
                <input 
                    id='country'
                    name='country'
                    className='border border-gray-400 rounded py-2 px-3.5 w-full' 
                    type='text' 
                    placeholder='Country'
                    value = { orderPayment.country }
                    onChange = { handleChange } />
            </div>

            <input 
                id='phone'
                name='phone'
                className='border border-gray-400 rounded py-2 px-3.5 w-full' 
                type='number' 
                placeholder='Phone' 
                value = { orderPayment.phone }
                onChange = { handleChange } />
        </form>

        {/* ----------------------------- Right Side ----------------------------- */}
        <div className='w-full mt-10'>
            <div className='min-w-80'>
                <div className='w-full'>
                    <div className='mb-8'>
                        <p className='text-4xl'> CART TOTAL </p>
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
            <div className=''>
                {/* --------------------------- Payment Method Selection ----------------------------- */}
                <p className='my-12 text-4xl'> PAYMENT METHODS </p>
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
                <button onClick = { addNewOrderPayment } className='bg-red-700 text-white text-lg my-16 px-8 py-4 rounded'> PLACE ORDER </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PlaceOrder