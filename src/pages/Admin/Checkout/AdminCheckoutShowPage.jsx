import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import AdminSidebar from '../../../components/Admin/AdminSidebar'
import { getCheckout, updateCheckout } from "../../../../Redux/ActionCreators/CheckoutActionCreators"
import { select } from 'redux-saga/effects'

export default function AdminCheckoutShowPage() {

    let [data, setData] = useState({})
    let [flag, setFlag] = useState(false)
    let { id } = useParams()
    let [orderStatus, setOrderStatus] = useState("")
    let [paymentStatus, setPaymentStatus] = useState("")

    let CheckoutStateData = useSelector(state => state.CheckoutStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    function updateRecord() {
        data.orderStatus = orderStatus
        data.paymentStatus = paymentStatus
        dispatch(updateCheckout({ ...data }))
        setFlag(!flag)
    }

    useEffect(() => {
        (() => {
            dispatch(getCheckout())

            if (CheckoutStateData.length) {
                let item = CheckoutStateData.find(x => x.id === id)
                if (item) {
                    setData({ ...item })
                    setOrderStatus(item.orderStatus)
                    setPaymentStatus(item.paymentStatus)
                }
                else {
                    navigate("/admin/checkout")
                }
            }
        })()
    }, [CheckoutStateData.length])

    return (
        <div className="container-fluid my-3">
            <div className='row'>
                <div className='col-lg-3'>
                    <AdminSidebar />
                </div>

                <div className='col-lg-9'>
                    <h5 className='bg-primary text-center p-2 text-light'>Checkout Query<Link to="/admin/checkout">
                        <i className='bi bi-plus text-light fs-5 float-end'></i>
                    </Link></h5>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <td>{data.id}</td>
                            </tr>
                            <tr>
                                <th>Buyer</th>
                                <td>
                                    {data.deliveryAddress?.name}<br />
                                    {data.deliveryAddress?.phone},  {data.deliveryAddress?.email}<br />
                                    {data.deliveryAddress?.address}<br />
                                    {data.deliveryAddress?.pin}, {data.deliveryAddress?.city}, {data.deliveryAddress?.state}<br />
                                </td>
                            </tr>
                            <tr>
                                <th>Order Status</th>
                                <td>{data.orderStatus}
                                    {data.orderStatus !== "Delivered" ?
                                        <select className='mt-3 form-select border-primary' value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
                                            <option>Order Has Been Placed</option>
                                            <option>Order Has Been Packed</option>
                                            <option>Order Is Ready To Ship</option>
                                            <option>Order Has Been Shipped</option>
                                            <option>Order Is In Transit</option>
                                            <option>Order Has Been Reached To The Final Delivery Station</option>
                                            <option>Order Out Of Delivery</option>
                                            <option>Delivered</option>
                                        </select> : null}
                                </td>
                            </tr>
                            <tr>
                                <th>Payment Mode</th>
                                <td>{data.paymentMode}</td>
                            </tr>
                            <tr>
                                <th>Payment Status</th>
                                <td>{data.paymentStatus}
                                    {data.paymentStatus !== "Done" ?
                                        <select className='mt-3 form-select border-primary' value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                                            <option>Pending</option>
                                            <option>Done</option>
                                        </select> : null}
                                </td>
                            </tr>
                            <tr>
                                <th>Subtotal Amount</th>
                                <td>&#8377;{data.subtotal}</td>
                            </tr>
                            <tr>
                                <th>Shipping Amount</th>
                                <td>&#8377;{data.shipping}</td>
                            </tr>
                            <tr>
                                <th>Total Amount</th>
                                <td>&#8377;{data.total}</td>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <td>{new Date(data.date).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    {data.orderStatus !== "Delivered" || data.paymentStatus !== "Pending" ?
                                        <button className='btn btn-primary w-100' onClick={updateRecord}>Update Status</button> :
                                        null
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <h5 className='text-center p-2 border-primary'>Products In This Order</h5>
                    <div className="table-responsive">
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Brand</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.products?.map((p, index) => {
                                    return <tr key={index}>
                                        <td>
                                            <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p.pic}`} target='_blank' rel='noreferror'>
                                                <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p.pic}`} height={50} width={80} alt='' />
                                            </Link>

                                        </td>
                                        <td>{p.name}</td>
                                        <td>{p.brand}</td>
                                        <td>{p.color}</td>
                                        <td>{p.size}</td>
                                        <td>&#8377;{p.price}</td>
                                        <td>{p.qty}</td>
                                        <td>&#8377;{p.total}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
