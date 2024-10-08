import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';
import Cart from './Cart';
import { useNavigate } from 'react-router-dom';

const uri = "http://localhost:3000/orders";

const Order = () => {
  let token = localStorage.getItem("token");
  const [order, setOrder] = useState([]);
  const [quantities, setQuantities] = useState({}); // Store quantities for each order
  const [totalPrice, setTotalPrice] = useState({});
  const [regularPrice, setRegularPrice] = useState({});
  const [total, setTotal] = useState({});

  const navigate = useNavigate();

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

  useEffect(() => {
    // Initialize quantities for all orders
    const initialQuantities = {};
    const initialTotalPrice = {};
    const initialRegularPrice = {};

    order.forEach((orderItem) => {
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
        let res = await axios.post(`${uri}/delete/${deleteId}`, deleteId, {
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
      await axios.put(`${uri}/update/${orderId}`, {quantity: newQuantity, totalPrice: newTotalPrice }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Quantity and Total Price updated successfully");
      getOrders();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update Quantity and Total Price");
    }
  }

  return (
    <div className='border-t pt-14 mx-20'>
      <div className='text-3xl px-5'>
        <SectionTitle text1={'YOUR'} text2={'CART'} />
      </div>

      <div className=''>
        {order.map((orderItem, index) => {
          let productDetail = orderItem.products[0];
          return (
            <div className='px-5 py-2' key={index}> 
              <div className='py-4 px-4 border-t border text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 rounded'> 
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20 rounded' src={productDetail?.productId?.images[0]} alt='' />
                  <div className=''> 
                    <p className='text-lg font-medium'> { productDetail?.productId?.productName } </p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p className='text-xl'> ${ orderItem.totalPrice } </p>
                      <p className='px-2 sm:px-3 bg-slate-50'> 3 gr Glass Jar </p>
                    </div>
                  </div>
                </div>
                <input
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
                  type='Number' 
                  min={1} 
                  value={quantities[orderItem._id] || ''} // Read from quantities state
                  onChange={(e) => handleQuantity(orderItem._id, e.target.value)}
                />

                <MdDeleteForever
                  onClick={() => handleDeleteOrder(orderItem._id)}
                  className='cursor-pointer'
                  size={40}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* --------------------------- Cart Section --------------------------- */}
      <div className='flex justify-end my-20 mx-5'>
        <div className='w-full sm:w-[450px]'>
          <Cart total = {JSON.stringify(total)} />

          <div className='w-full text-end'>
            <button onClick={() => navigate('/place-order', { state: { total } })} className='bg-red-700 text-white text-lg my-16 px-8 py-4 rounded'> PROCEED TO CHECKOUT </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
