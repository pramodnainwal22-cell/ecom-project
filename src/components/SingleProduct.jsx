import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleProduct({ item }) {
    return ( 
        <div className="bg-light rounded overflow-hidden">
            <img className="img-fluid w-100" src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic[0]}`} style={{ height: 300 }} alt="" />
            <div className="p-4">
                <Link className="h4 d-block mb-3 text-center"  to={`/product/${item.id}`}>{item.name}</Link>
                <p className="m-0 text-center text-dark"><del>&#8377;{item.basePrice}</del>{item.finalPrice}<sup>{item.discount}%Off</sup></p>
            </div>
            <div className="d-flex justify-content-between border-top px-5">
                <p className='text-dark'>{item.brand}</p>
                <p className='text-dark'>{item.stockQuantity} Left In Stock</p>
            </div>
            <Link className='btn btn-primary w-100' to={`/product/${item.id}`}>Add to Cart</Link>
        </div>
    )
}
