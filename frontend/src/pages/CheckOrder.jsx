import React, { useEffect, useState } from 'react'
import SectionTitle from '../components/SectionTitle'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const uri = "http://localhost:3000/payment";

const CheckOrder = () => {
    let token = localStorage.getItem("token");
    const [orderPayment, setOrderPayment] = useState([]);
    const navigate = useNavigate();

    // const getOrders = async () => {
    //     try {
    //         let res = await axios.post(`${uri}/userorders`, {}, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         });
    
    //         if (res.data.orderPayment.length > 0) {
    //             let allOrdersItem = [];
    //             res.data.orderPayment.map((orderItem) => {
    //                 orderItem.orderItems.map((item) => {
    //                     item['address'] = orderItem.address;
    //                     item['amount'] = orderItem.amount;
    //                     item['paymentMethod'] = orderItem.paymentMethod;
    //                     item['paymentStatus'] = orderItem.paymentStatus;
    //                     item['paymentDate'] = orderItem.paymentDate;
    
    //                     allOrdersItem.push(item);
    //                 });
    //             });
    //             setOrderPayment(allOrdersItem);
    //         } else {
    //             console.log("No orders found for this user.");
    //             setOrderPayment([]); // Set empty state if no orders
    //         }
    //     } catch (error) {
    //         console.log("Error fetching orders:", error);
    //     }

    // if (res.data.orderPayment.length > 0) {
    //     let allOrdersItem = [];
    //     res.data.orderPayment.map((orderItem) => {
    //         orderItem.orderItems.map((item) => {
    //             item['address'] = orderItem.address
    //             item['amount'] = orderItem.amount
    //             item['paymentMethod'] = orderItem.paymentMethod
    //             item['paymentStatus'] = orderItem.paymentStatus
    //             item['paymentDate'] = orderItem.paymentDate

    //             allOrdersItem.push(item);
    //         })
    //     })
    //     setOrderPayment(allOrdersItem);
    // }
    // };
    
    const getOrders = async() => {
        try {
            let res = await axios.post(`${uri}/userorders`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrderPayment(res.data.orderPayment);
            
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    console.log(orderPayment);
  return (
    <div className='pt-16 mx-28'>
        <div className='text-4xl'>
            <SectionTitle text1={'MY'} text2={'ORDERS'} />
        </div>
        
        <div className=''>
            {orderPayment.map((orderItem, index) => {
                let productDetail = orderItem.products;
                return (
                    <div key={index} className='py-8 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'> 
                        <div className='flex items-start gap-6 text-lg'>
                            <img className='w-32 rounded' src={productDetail?.productId?.images[0]} alt='' />
                            <div className=''> 
                                <p className='text-lg font-medium'> { productDetail?.productId?.productName } </p>
                                <div className='flex items-center gap-5 mt-2'>
                                    <p className='text-xl'> ${ orderItem.amount } </p>
                                    <p className=''> Quantity: 3 </p>
                                    <p className='px-2 sm:px-3 bg-slate-50'> 3 gr Glass Jar </p>
                                </div>
                                <p className='mt-2'> Date: <span className = "text-gray-400"> 05, October 2024 </span> </p>
                            </div>
                        </div>
                        <div className='md:w-1/2 flex justify-between'>
                            <div className='flex items-center gap-3'>
                                <p className='min-w-4 h-4 rounded-full bg-green-500'> </p>
                                <p className='text-lg'> Ready To Ship </p>
                            </div>
                            <button className='border px-4 py-2 text-lg font-medium rounded-sm'> Track Order </button>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
    
  )
}

export default CheckOrder