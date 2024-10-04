import React from 'react'
import SectionTitle from '../components/SectionTitle'

const Cart = ({ total }) => {
  const shipmentFee = 10.00;
  return (
    <div className='w-full'>
      <div className='text-3xl'>
        <SectionTitle text1={'CART'} text2={'TOTAL'} />

      </div>

      <div className='flex flex-col gap-2 mt-2 text-lg'>
        <div className='flex justify-between'>
          <p> Subtotal</p>
          <p> ${Number(total)}.00 </p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p> Shipping Fee </p>
          <p> ${shipmentFee}.00 </p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b> Total </b>
          <b> ${Number(total) + shipmentFee}.00 </b>
        </div>
      </div>
    </div>
  )
}

export default Cart