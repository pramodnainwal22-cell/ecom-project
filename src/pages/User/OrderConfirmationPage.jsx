import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderConfirmationPage() {
  return (
    <div className='container my-3'>
      <div className="card p-5 text-center">
        <h1>Thank You</h1>
        <h2>Your Order Has Been Placed</h2>
        <h3>You Will Track Your Order In Profile Page</h3>
        <Link to="/shop" className='btn btn-primary w-25 m-auto mt-2'>Shop</Link>
        <Link to="/profile?option=orders" className='btn btn-primary w-25 m-auto mt-2'>Profile</Link>
      </div>
    </div>
  )
}
