import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';
import Cart from './Cart';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';

// const uri = "http://localhost:3000/orders";

const Order = () => {
  let token = localStorage.getItem("token");
  const [order, setOrder] = useState([]);
  const [quantities, setQuantities] = useState({}); // Store quantities for each order
  const [totalPrice, setTotalPrice] = useState({});
  const [regularPrice, setRegularPrice] = useState({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getOrders = async() => { 
    try {
      let res = await axios.get(`${backendUrl}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrder(res.data.orders);
      console.log(res.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    // Initialize quantities for all orders
    const initialQuantities = {};
    const initialTotalPrice = {};
    const initialRegularPrice = {};

    order?.forEach((orderItem) => {
      initialQuantities[orderItem._id] = orderItem.quantity;
      initialTotalPrice[orderItem._id] = orderItem.totalPrice;
      initialRegularPrice[orderItem._id] = orderItem.products[0]?.productId?.regularPrice;
    });

    setQuantities(initialQuantities);
    setTotalPrice(initialTotalPrice);
    setRegularPrice(initialRegularPrice);
    calculateSubTotal(initialTotalPrice);
  }, [order]); // This runs whenever `order` changes

  // Calculate subtotal whenever totalPrice changes
  useEffect(() => {
    calculateSubTotal(totalPrice);
  }, [totalPrice]);

  // Function to calculate subtotal
  const calculateSubTotal = (priceObj) => {
    let subTotal = 0;
    Object.values(priceObj).forEach(value => {
      subTotal += Number(value);
    });
    setTotal(subTotal); // Update the total (subtotal) state
  };

  
  /* ------------------------------- Deleting Order from cart ------------------------- */
  async function handleDeleteOrder (deleteId) {
    try {
      if (window.confirm("Are you sure? You want to remove the order")) {
        let res = await axios.post(`${backendUrl}/orders/delete/${deleteId}`, deleteId, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success(res.data.msg);
        getOrders();
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* ------------------------------- Updating Quantity of Order from cart ------------------------- */
  async function handleQuantity(orderId, newQuantity) {
    if (newQuantity < 1) return; // Prevent invalid quantities
    const newTotalPrice = newQuantity * regularPrice[orderId]; // Calculate new total for the product

    // Update local state
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [orderId]: newQuantity
    }));

    setTotalPrice(prevTotalPrice => ({
        ...prevTotalPrice,
        [orderId]: newQuantity * regularPrice[orderId]
    }));
    
    setRegularPrice(prevRegularPrice => ({
        ...prevRegularPrice,
        [orderId]: regularPrice[orderId]
    }));
    // ------------------ Make API call to update quantity in the backend ----------------------------
    try {
      setLoading(true);
      await axios.put(`${backendUrl}/orders/update/${orderId}`, {quantity: newQuantity, totalPrice: newTotalPrice }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Quantity and Total Price updated successfully");
      getOrders();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update Quantity and Total Price");
    } finally {
      setLoading(false);
    }
  }
  console.log(order);

  return (
    <div className='container mx-auto p-4 w-full'>
      <SectionTitle text1={'YOUR'} text2={'CART'} />

      <div className=''>
        {Array.isArray(order) && order?.length > 0 ? (
          order.map((orderItem, index) => {
            const productDetail = orderItem.products[0];

            return (
              <div key={index} className='p-5 bg-white rounded shadow-md mb-6'>
                <div className='flex flex-col sm:flex-row justify-between items-center'>
                  <div className='flex items-start gap-4'>
                    <img className='w-24 h-24 rounded object-cover' src={productDetail?.productId?.images[0]} alt='' />
                    <div>
                      <p className='text-lg font-semibold'>{productDetail?.productId?.productName}</p>
                      <p className='text-sm text-gray-600 mt-2'>3 gr Glass Jar</p>
                      <p className='text-xl text-gray-900 mt-4'>${totalPrice[orderItem._id] || 0}</p>
                    </div>
                  </div>

                  <div className='flex items-center gap-5 mt-4 sm:mt-0'>
                    {/* Quantity Stepper */}
                    <div className='flex items-center border rounded'>
                      <button
                        className='text-xl px-3 py-1 bg-gray-100'
                        onClick={() => handleQuantity(orderItem._id, quantities[orderItem._id] - 1)}
                      > - </button>
                      <input
                        className='w-12 text-center'
                        type='number'
                        value={quantities[orderItem._id] || 1}
                        readOnly
                      />
                      <button
                        className='text-xl px-3 py-1 bg-gray-100'
                        onClick={() => handleQuantity(orderItem._id, quantities[orderItem._id] + 1)}
                      > + </button>
                    </div>

                    {/* Delete Button */}
                    <MdDeleteForever
                      onClick={() => handleDeleteOrder(orderItem._id)}
                      className='text-red-600 cursor-pointer'
                      size={40}
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-600">Your cart is empty</div>
        )}
      </div>

      {/* Cart Summary & Checkout Button */}
      <div className='mt-10 flex justify-end'>
        <div className='w-full sm:w-1/3 bg-white p-6 rounded shadow-lg'>
          <Cart total={total} />
          <button
            onClick={() => navigate('/place-order', { state: { total } })}
            className={`w-full py-3 mt-4 bg-red-600 text-white rounded-md transition-all hover:bg-red-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>



    // <div className='border-t pt-14 mx-20'>
    //   <div className='text-3xl px-5'>
    //     <SectionTitle text1={'YOUR'} text2={'CART'} />
    //   </div>

    //   <div className=''>
    //     {order.map((orderItem, index) => {
    //       let productDetail = orderItem.products[0];
    //       return (
    //         <div className='px-5 py-2' key={index}> 
    //           <div className='py-4 px-4 border-t border text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 rounded'> 
    //             <div className='flex items-start gap-6'>
    //               <img className='w-16 sm:w-20 rounded' src={productDetail?.productId?.images[0]} alt='' />
    //               <div className=''> 
    //                 <p className='text-lg font-medium'> { productDetail?.productId?.productName } </p>
    //                 <div className='flex items-center gap-5 mt-2'>
    //                   <p className='text-xl'> ${ orderItem.totalPrice } </p>
    //                   <p className='px-2 sm:px-3 bg-slate-50'> 3 gr Glass Jar </p>
    //                 </div>
    //               </div>
    //             </div>
    //             <input
    //               className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
    //               type='Number' 
    //               min={1} 
    //               value={quantities[orderItem._id] || ''} // Read from quantities state
    //               onChange={(e) => handleQuantity(orderItem._id, e.target.value)}
    //             />

    //             <MdDeleteForever
    //               onClick={() => handleDeleteOrder(orderItem._id)}
    //               className='cursor-pointer'
    //               size={40}
    //             />
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>

    //   {/* --------------------------- Cart Section --------------------------- */}
    //   <div className='flex justify-end my-20 mx-5'>
    //     <div className='w-full sm:w-[450px]'>
    //       <Cart total = {JSON.stringify(total)} />

    //       <div className='w-full text-end'>
    //         <button onClick={() => navigate('/place-order', { state: { total } })} className='bg-red-700 text-white text-lg my-16 px-8 py-4 rounded'> PROCEED TO CHECKOUT </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Order;
