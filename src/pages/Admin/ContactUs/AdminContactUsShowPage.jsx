import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import AdminSidebar from '../../../components/Admin/AdminSidebar'
import { getContactUs, deleteContactUs, updateContactUs } from "../../../../Redux/ActionCreators/ContactUsActionCreators"

export default function AdminContactUsShowPage() {

    let [data, setData] = useState({})
    let [flag, setFlag] = useState(false)
    let { id } = useParams()
    let ContactUsStateData = useSelector(state => state.ContactUsStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    function deleteRecord() {
        if (window.confirm("Are You Sure To Delete That Record :)")) {
            dispatch(deleteContactUs({ id: id }))
            navigate("/admin/contactus")
        }
    }

    function updateRecord() {
        data.status = !data.status
        dispatch(updateContactUs({ ...data}))
        setFlag(!flag)
    }

    useEffect(() => {
        (() => {
            dispatch(getContactUs())

            if (ContactUsStateData.length) {
                let item = ContactUsStateData.find(x => x.id === id)
                if (item)
                    setData({ ...item })
                else {
                    navigate("/admin/contactus")
                }
            }
        })()
    }, [ContactUsStateData.length])

    return (
        <div className="container-fluid my-3">
            <div className='row'>
                <div className='col-lg-3'>
                    <AdminSidebar />
                </div>

                <div className='col-lg-9'>
                    <h5 className='bg-primary text-center p-2 text-light'>ContactUs Query<Link to="/admin/contactus">
                        <i className='bi bi-plus text-light fs-5 float-end'></i>
                    </Link></h5>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <td>{data.id}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{data.name}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{data.email}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>{data.phone}</td>
                            </tr>
                            <tr>
                                <th>Subject</th>
                                <td>{data.subject}</td>
                            </tr>
                            <tr>
                                <th>Message</th>
                                <td>{data.message}</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td>{data.status ? "Active" : "Inactive"}</td>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <td>{new Date(data.date).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    {data.status ?
                                        <button className='btn btn-primary w-100' onClick={updateRecord}>Update Status</button> :
                                        <button className='btn btn-danger w-100' onClick={deleteRecord}>Delete Status</button>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
