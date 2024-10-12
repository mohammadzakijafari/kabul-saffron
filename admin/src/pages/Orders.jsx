import React, { useEffect, useState } from 'react'

const uri = "http://localhost:3000/orders";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  let token = localStorage.getItem("token");

  const getAllOrders = async () => {
    try {
        let res = await axios.post(uri, {
          headers: { Authorization: `Bearer ${token}` }
        }); 
        setOrders(res.data);
    } catch (error) {
        console.log(error);
    }
  }

  // -----------------------  get All Orders ---------------------;
  useEffect(() => {
      getAllOrders();
  }, []);
  return (
    <div>Orders</div>
  )
}

export default Orders