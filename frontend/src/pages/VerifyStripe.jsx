import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const uri = "http://localhost:3000/payment/verifystripe";

const VerifyStripe = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }

            const res = await axios.post(uri, {success, orderId}, {
                headers: { Authorization: `Bearer ${token}`}
            });
            if (res.data.success) {
                navigate("/check-order");
            } else {
                navigate("/orders");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [token]);
  return (
    <div>VerifyStripe</div>
  )
}

export default VerifyStripe