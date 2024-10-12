import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { GoPackage } from "react-icons/go";

const uri = "http://localhost:3000/payment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  let token = localStorage.getItem("token");

  const getAllOrders = async () => {
    try {
        let res = await axios.post(`${uri}/orders`, {}, {
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
  // console.log(orders);
  return (
    <div>
      <h1 className=''> Order Page </h1>
      <div>
        {
          orders.map((order, index) => (
            <div key={index}> 
              <GoPackage size={40} />
              <div className=''> 
                
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders