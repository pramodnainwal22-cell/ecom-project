import React, { useEffect, useState } from 'react'
import { Link, useSearchParams, } from 'react-router-dom'
import Profile from '../../components/User/Profile'
import UpdateProfile from '../../components/User/UpdateProfile'
import Address from '../../components/User/Address'
import Orders from '../../components/User/Orders'
import Wishlist from '../../components/User/Wishlist'

export default function ProfilePage() {
    let [option, setOption] = useState("profile")
    let [searchParams] = useSearchParams()

    useEffect(() => {
        (() => {
            setOption(searchParams.get("option") ?? "profile")
        })()
    }, [searchParams])
    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-lg-3">
                    <div className="list-group">
                        <button type='button' className={`list-group-item list-group-item-action mb-1 ${option === "profile" ? 'active' : ''}`} onClick={() => setOption("Profile")}>Profile</button>
                        <button type='button' className={`list-group-item list-group-item-action mb-1 ${option === "update profile" ? 'active' : ''}`} onClick={() => setOption("Update Profile")}>Update Profile</button>
                        <button type='button' className={`list-group-item list-group-item-action mb-1 ${option === "address" ? 'active' : ''}`} onClick={() => setOption("Address")}>Address</button>
                        <button type='button' className={`list-group-item list-group-item-action mb-1 ${option === "orders" ? 'active' : ''}`} onClick={() => setOption("Orders")}>Orders</button>
                        <button type='button' className={`list-group-item list-group-item-action mb-1 ${option === "wishlist" ? 'active' : ''}`} onClick={() => setOption("Wishlist")}>Wishlist</button>
                        <Link to="/cart" className={`list-group-item list-group-item-action mb-1 ${option === "cart" ? 'active' : ''}`} onClick={() => setOption("Cart")}>Cart</Link>
                        <Link to="/checkout" className={`list-group-item list-group-item-action mb-1 ${option === "checkout" ? 'active' : ''}`} onClick={() => setOption("Checkout")}>Checkout</Link>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className={`${option === "Profile" ? 'd-block' : 'd-none'}`}>
                        <h5 className='bg-primary text-center p-2 text-light'>Your Profile</h5>
                        <Profile option={option} />
                    </div>
                    <div className={`${option === "Update Profile" ? 'd-block' : 'd-none'}`}>
                        <h5 className='bg-primary text-center p-2 text-light'>Update Your Profile Details</h5>
                        <UpdateProfile setOption={setOption} />
                    </div>
                    <div className={`${option === "Address" ? 'd-block' : 'd-none'}`}>
                        <h5 className='bg-primary text-center p-2 text-light'>Manage Your Address</h5>
                        <Address />
                    </div>
                    <div className={`${option === "Orders" ? 'd-block' : 'd-none'}`}>
                        <h5 className='bg-primary text-center p-2 text-light'>Your Orders</h5>
                        <Orders />
                    </div>
                    <div className={`${option === "Wishlist" ? 'd-block' : 'd-none'}`}>
                        <h5 className='bg-primary text-center p-2 text-light'>Your Wishlist</h5>
                        <Wishlist />
                    </div>
                </div>
            </div>
        </div>
    )
}

