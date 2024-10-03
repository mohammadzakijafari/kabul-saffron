import React from 'react'
import SectionTitle from '../components/SectionTitle'

const Cart = () => {
  return (
    <div className='w-full'>
      <div className='text-3xl'>
        <SectionTitle text1={'CART'} text2={'TOTAL'} />

      </div>

      <div className='flex flex-col gap-2 mt-2 text-lg'>
        <div className='flex justify-between'>
          <p> Subtotal</p>
          <p> $100.00 </p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p> Shipping Fee </p>
          <p> $10.00 </p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b> Total </b>
          <b> $110.00 </b>
        </div>
      </div>
    </div>
  )
}

export default Cart