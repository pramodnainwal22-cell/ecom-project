import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DataTable from 'datatables.net-dt'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import AdminSidebar from '../../../components/Admin/AdminSidebar'
import { getCheckout } from "../../../../Redux/ActionCreators/CheckoutActionCreators"
import { Link } from 'react-router-dom'

export default function AdminCheckoutPage() {
    let [data, setData] = useState([])

    let CheckoutStateData = useSelector(state => state.CheckoutStateData )
    let dispatch = useDispatch()

    

    useEffect(() => {
        let time = (() => {
            dispatch(getCheckout())

            if (CheckoutStateData.length)
                setData(CheckoutStateData)
            else
                setData([])

            let time = setTimeout(() => {
                new DataTable('#myTable')
            }, 500)

            return time
        })()

        return () => clearTimeout(time)
    }, [CheckoutStateData.length])

    return (
        <div className="container-fluid my-3">
            <div className='row'>
                <div className='col-lg-3'>
                    <AdminSidebar />
                </div>

                <div className='col-lg-9'>
                    <h5 className='bg-primary text-center p-2 text-light'>Checkout</h5>

                    <div className='table-responsive'>
                        <table className='table table-bordered' id='myTable'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Buyer</th>
                                    <th>Order Status</th>
                                    <th>Payment Status</th>
                                    <th>Payment Mode</th>
                                    <th>Total</th>
                                    <th>Date</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.deliveryAddress?.name}
                                            <br />
                                            {item.deliveryAddress?.city},{item.deliveryAddress?.pin}
                                        </td>
                                        <td>{item.orderStatus}</td>
                                        <td>{item.paymentStatus}</td>
                                        <td>{item.paymentMode}</td>
                                        <td>&#8377;{item.total}</td>
                                        <td>{new Date(item.date).toDateString()}</td>
                                        <td><Link to={`/admin/checkout/show/${item.id}`} className='btn btn-primary'><i className='bi bi-eye'></i></Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
