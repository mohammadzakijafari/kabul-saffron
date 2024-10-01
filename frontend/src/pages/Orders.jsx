import axios from 'axios';
import React, { useEffect, useState } from 'react'

const uri = "http://localhost:3000/orders";

const Orders = () => {
  let token = localStorage.getItem("token");
  const [order, setOrder] = useState("");

  const getOrders = async() => {
    try {
      let res = await axios.get(uri, {
        headers: { Authorization: `Bearer ${token}`}
      });
      setOrder(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(order.orders);
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>Orders</div>
  )
}

export default Orders