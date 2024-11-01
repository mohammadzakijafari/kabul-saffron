import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../context/ProductContext'
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

// const uri = "http://localhost:3000/orders/create";

const SingleProduct = () => {
    const { id } = useParams();
    const { products, currency, orderCount, setOrderCount } = useContext(ProductContext);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getSingleProductData = () => {
          const product = products.find(product => product._id === id);
          if (product) {
            setProductData(product);
            setImage(product.images[0]);
          }
        };
        getSingleProductData();
      }, [id, products]);
    
      const handleQuantity = (e) => {
        const value = Math.max(1, e.target.value); // Prevent values less than 1
        setQuantity(value);
      };
    
      const addNewOrder = async (e) => {
        e.preventDefault();
        if (!token) {
          toast.error("Please log in before placing an order");
          return;
        }
    
        const totalPrice = productData.regularPrice * quantity;
        const orderData = { productId: id, quantity, totalPrice };
    
        setLoading(true);
        try {
          const res = await axios.post(`${backendUrl}/orders/create`, orderData, { headers: { Authorization: `Bearer ${token}` } });
          toast.success(res.data.msg);
          setOrderCount(res.data.orderCount);
        } catch (error) {
          console.error(error);
          toast.error("Failed to place the order");
        } finally {
          setLoading(false);
        }
    };
    
    if (!productData) return <div>Loading...</div>;

    // let token = localStorage.getItem("token");
    // let { id } = useParams();
    // console.log("product Id = " + id);
    // const { products, currency } = useContext(ProductContext);
    // const { orderCount, setOrderCount } = useContext(ProductContext);
    // const [productData, setProductData] = useState(false);
    // const [image, setImage] = useState('');
    // const [quantity, setQuantity] = useState("1");
    // let totalPrice = productData.regularPrice;
    // const [totalPrice, setTotalPrice] = useState(regularPrice);

    // const getSingleProductData = async () => {
    //     products.map((product) => {
    //         // console.log(product._id);
    //         if (product._id === id) {
    //             setProductData(product);
    //             setImage(product.images[0]);
    //             return null;
    //         }
    //     });
    // }

    // useEffect(() => {
    //     getSingleProductData();
    // }, [id]);

    // /* ------------------ Handling Quantity Function --------------------- */
    // function handleQuantity (e) {
    //     setQuantity(e.target.value);
    // }
    // // setTotalPrice(quantity * regularPrice);
    // totalPrice = quantity * productData.regularPrice;
    // let productId = id;
    // let orderData = {
    //     productId,
    //     quantity,
    //     totalPrice,
    // }
    // /* ------------------ Function to add new order to database  --------------------- */
    // async function addNewOrder(e) {
    //     e.preventDefault();
    //     try {
    //         if (token) {
    //             let res = await axios.post(`${uri}`, orderData, {
    //                 headers: { Authorization: `Bearer ${token}`}
    //             })
    //             toast.success(res.data.msg);
    //             console.log(res.data);
    //             setOrderCount(res.data.orderCount);
    //             console.log(orderCount);
    //             console.log("Order Count -------------- ", res.data.orderCount);
    //         } else {
    //             toast.error("Before placing orders, you have to first login");
    //             return;
    //         }
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    
    
    return (
        <div className="p-4 mt-20">
            <div className="flex flex-col sm:flex-row gap-16 mx-20">
                {/* Product Images */}
                <div className="flex-1">
                    <div className="flex gap-2 mb-4">
                        <div className="flex flex-col gap-2">
                        {productData.images.map((img, index) => (
                            <img
                            key={index}
                            src={img}
                            alt={`Product thumbnail ${index}`}
                            className="w-28 h-28 object-cover cursor-pointer border border-gray-300 rounded"
                            onClick={() => setImage(img)}
                            />
                        ))}
                        </div>
                        <div className="flex-1">
                        <img
                            src={image}
                            alt="Main product"
                            className="w-full h-[70vh] object-cover rounded-md"
                        />
                        </div>
                    </div>
                </div>

                {/* Product Information */}
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold mb-2">{productData.productName}</h1>
                    
                    <div className="flex items-center text-yellow-500">
                        {[...Array(4)].map((_, index) => <FaStar key={index} />)}
                        <FaStarHalfAlt />
                        <span className="text-gray-600 pl-2">(150 reviews)</span>
                    </div>

                    <p className="text-4xl font-semibold mt-4">{currency}{productData.regularPrice * quantity}</p>

                    <p className="mt-4 text-gray-700">{productData.description}</p>

                    <div className="mt-6">
                        <label className="block text-gray-700 font-semibold">Product Size</label>
                        <select
                        className="w-full mt-2 p-3 bg-gray-100 rounded-md border border-gray-300"
                        required
                        >
                        <option value="">Select Size</option>
                        <option value="one-gram">1 gr Glass Jar</option>
                        <option value="oneHalf-gram">1.5 gr Glass Jar</option>
                        <option value="three-gram">3 gr Glass Jar</option>
                        <option value="ten-gram">10 gr Metal Box</option>
                        <option value="fifteen-gram">15 gr Metal Box</option>
                        <option value="twenty-gram">20 gr Metal Box</option>
                        </select>
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-700 font-semibold">Quantity</label>
                        <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantity}
                        min="1"
                        className="w-full mt-2 p-3 bg-gray-100 rounded-md border border-gray-300"
                        />
                    </div>

                    <button
                        onClick={addNewOrder}
                        disabled={loading}
                        className={`w-full mt-6 p-3 bg-red-600 text-white rounded-md transition-all hover:bg-red-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? "Processing..." : "Add to Cart"}
                    </button>

                    <div className="mt-6 text-gray-600">
                        <p>100% Original Product</p>
                        <p>Cash on Delivery Available</p>
                        <p>Easy return and exchange within 7 days</p>
                    </div>
                </div>
            </div>
        </div>




    // <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
    //     {/* Single Product Data */}
    //     <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
    //         {/* Product Images */}
    //         <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
    //             <div className='flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18%] w-full'>
    //                 {productData.images.map((image, index) => (
    //                     <img onClick={() => setImage(image)} src = {image} key = { index } className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
    //                 ))}
    //             </div>
    //             <div className='w-full sm:w-[80%]'>
    //                 <img src = { image } alt='Product Main Image' className='w-full h-auto' />
    //             </div>
    //         </div>
    //         {/* --------------------- Product Information ------------------ */}
    //         <div className='flex-1'>
    //             <h1 className='font-medium text-3xl mt-5'> { productData.productName } </h1>
    //             <div className='flex items-center gap-1 mt-2'>
    //                 <FaStar />
    //                 <FaStar />
    //                 <FaStar />
    //                 <FaStar />
    //                 <FaStarHalfAlt />
    //                 <p className='pl-2'> (150) </p>
    //             </div>
    //             <p className='pt-10 text-4xl font-medium'> { currency } {totalPrice} </p>
    //             <p className='mt-5 text-gray-600 md:w-4/5'> { productData.description } </p>

    //             <div className='mb-4 mt-8'>
    //                 <label htmlFor='size' className='block text-gray-700 font-bold mb-2'> Product Size </label>
    //                 <select
    //                     id='size'
    //                     name='size'
    //                     className='bg-gray-100 rounded w-4/5 py-3 px-3'
    //                     required
    //                     // value = {productFeature}
    //                     // onChange = {(e) => setProductFeature(e.target.value)}
    //                 >   
    //                     <option value=''> select sifferent sizes </option>
    //                     <option value='one-gram'> 1 gr Glass Jar </option>
    //                     <option value='oneHalf-gram'> 1.5 gr Glass Jar </option>
    //                     <option value='three-gram'> 3 gr Glass Jar </option>
    //                     <option value='ten-gram'> 10 gr Metal Box </option>
    //                     <option value='fifteen-gram'> 15 gr Metal Box </option>
    //                     <option value='twenty-gram'> 20 gr Metal Box </option>
    //                 </select>
    //             </div>

    //             <div className='flex flex-col gap-3 mt-8'>
    //                 <label htmlFor='quantity' className='text-gray-700 font-bold'> Quantity </label>
    //                 <input
    //                     type='Number'
    //                     id='quantity'
    //                     name='quantity'
    //                     className='bg-gray-100 rounded w-4/5 py-2 px-3 mb-2'
    //                     placeholder='1'
    //                     required
    //                     value =  { quantity }
    //                     onChange = { handleQuantity }
    //                 />
    //             </div>

    //             <button onClick = { addNewOrder } className='bg-red-700 text-white mt-10 px-8 py-3 text-sm active:bg-red-600 rounded'> ADD TO CART </button>
    //             <hr className='mt-8 sm:w-4/5' />
    //             <div className='text-gray-500 text-m mt-5 flex flex-col gap-1'>
    //                 <p> 100% Original Product </p>
    //                 <p> Cash Delivery is available on this product </p>
    //                 <p> Easy return and exchange policy within 7 days </p>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    // ) : <div className='opacity-0'> </div>

    );
};

export default SingleProduct