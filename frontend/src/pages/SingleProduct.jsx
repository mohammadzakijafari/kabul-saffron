import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../context/ProductContext'
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';

const uri = "http://localhost:3000/orders/create";

const SingleProduct = () => {
    let token = localStorage.getItem("token");
    let { id } = useParams();
    console.log("product Id = " + id);
    const { products, currency } = useContext(ProductContext);
    const { orderCount, setOrderCount } = useContext(ProductContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const [quantity, setQuantity] = useState("1");
    let totalPrice = productData.regularPrice;

    const getSingleProductData = async () => {
        products.map((product) => {
            // console.log(product._id);
            if (product._id === id) {
                setProductData(product);
                setImage(product.images[0]);
                return null;
            }
        });
    }

    useEffect(() => {
        getSingleProductData();
    }, [id]);

    /* ------------------ Handling Quantity Function --------------------- */
    function handleQuantity (e) {
        setQuantity(e.target.value);
    }

    let productId = id;
    let orderData = {
        productId,
        quantity,
        totalPrice,
    }
    /* ------------------ Function to add new order to database  --------------------- */
    async function addNewOrder(e) {
        e.preventDefault();
        try {
            if (token) {
                let res = await axios.post(`${uri}`, orderData, {
                    headers: { Authorization: `Bearer ${token}`}
                })
                toast.success(res.data.msg);
                console.log(res.data);
                setOrderCount(res.data.orderCount);
                console.log(orderCount);
                console.log("Order Count -------------- ", res.data.orderCount);
            } else {
                toast.error("Before placing orders, you have to first login");
                return;
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    
    
    return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        {/* Single Product Data */}
        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
            {/* Product Images */}
            <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                <div className='flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18%] w-full'>
                    {productData.images.map((image, index) => (
                        <img onClick={() => setImage(image)} src = {image} key = { index } className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
                    ))}
                </div>
                <div className='w-full sm:w-[80%]'>
                    <img src = { image } alt='Product Main Image' className='w-full h-auto' />
                </div>
            </div>
            {/* --------------------- Product Information ------------------ */}
            <div className='flex-1'>
                <h1 className='font-medium text-3xl mt-5'> { productData.productName } </h1>
                <div className='flex items-center gap-1 mt-2'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfAlt />
                    <p className='pl-2'> (150) </p>
                </div>
                <p className='pt-10 text-4xl font-medium'> { currency }{ quantity * productData.regularPrice } </p>
                <p className='mt-5 text-gray-600 md:w-4/5'> { productData.description } </p>

                <div className='mb-4 mt-8'>
                    <label htmlFor='size' className='block text-gray-700 font-bold mb-2'> Product Size </label>
                    <select
                        id='size'
                        name='size'
                        className='bg-gray-100 rounded w-4/5 py-3 px-3'
                        required
                        // value = {productFeature}
                        // onChange = {(e) => setProductFeature(e.target.value)}
                    >   
                        <option value=''> select sifferent sizes </option>
                        <option value='one-gram'> 1 gr Glass Jar </option>
                        <option value='oneHalf-gram'> 1.5 gr Glass Jar </option>
                        <option value='three-gram'> 3 gr Glass Jar </option>
                        <option value='ten-gram'> 10 gr Metal Box </option>
                        <option value='fifteen-gram'> 15 gr Metal Box </option>
                        <option value='twenty-gram'> 20 gr Metal Box </option>
                    </select>
                </div>

                <div className='flex flex-col gap-3 mt-8'>
                    <label htmlFor='quantity' className='text-gray-700 font-bold'> Quantity </label>
                    <input
                        type='Number'
                        id='quantity'
                        name='quantity'
                        className='bg-gray-100 rounded w-4/5 py-2 px-3 mb-2'
                        placeholder='1'
                        required
                        value =  { quantity }
                        onChange = { handleQuantity }
                    />
                </div>

                <button onClick = { addNewOrder } className='bg-red-700 text-white mt-10 px-8 py-3 text-sm active:bg-red-600 rounded'> ADD TO CART </button>
                <hr className='mt-8 sm:w-4/5' />
                <div className='text-gray-500 text-m mt-5 flex flex-col gap-1'>
                    <p> 100% Original Product </p>
                    <p> Cash Delivery is available on this product </p>
                    <p> Easy return and exchange policy within 7 days </p>
                </div>
            </div>
        </div>
    </div>
    ) : <div className='opacity-0'> </div>
}

export default SingleProduct