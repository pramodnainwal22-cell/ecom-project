import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DataTable from 'datatables.net-dt'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import AdminSidebar from '../../../components/Admin/AdminSidebar'
import { getContactUs, deleteContactUs, updateContactUs} from "../../../../Redux/ActionCreators/ContactUsActionCreators"
import { Link } from 'react-router-dom'

export default function AdminContactUsPage() {
    let [data, setData] = useState([])
    let [flag,setFlag] = useState(false)

    let ContactUsStateData = useSelector(state => state.ContactUsStateData )
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are You Sure To Delete That Record :)")) {
            dispatch(deleteContactUs({ id:id }))
            setData(data.filter(x => x.id !== id))
        }
    }

    function updateRecord(id) {
        let index  = data.findIndex(x=>x.id===id)
        data[index].status = !data[index].status
        dispatch(updateContactUs({...data[index]}))
        setFlag(!flag)
     }

    useEffect(() => {
        let time = (() => {
            dispatch(getContactUs())

            if (ContactUsStateData.length)
                setData(ContactUsStateData)
            else
                setData([])

            let time = setTimeout(() => {
                new DataTable('#myTable')
            }, 500)

            return time
        })()

        return () => clearTimeout(time)
    }, [ContactUsStateData.length])

    return (
        <div className="container-fluid my-3">
            <div className='row'>
                <div className='col-lg-3'>
                    <AdminSidebar />
                </div>

                <div className='col-lg-9'>
                    <h5 className='bg-primary text-center p-2 text-light'>ContactUs</h5>

                    <div className='table-responsive'>
                        <table className='table table-bordered' id='myTable'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Subject</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.subject?.slice(0,50)}...</td>
                                        <td style={{cursor:"pointer"}} title='Click Here to Change Status' onClick={()=>updateRecord(item.id)}>{item.status ? "Active" : "Inactive"}</td>
                                        <td>{new Date(item.date).toDateString()}</td>
                                        <td><Link to={`/admin/contactus/show/${item.id}`} className='btn btn-primary'><i className='bi bi-eye'></i></Link></td>
                                        <td>
                                            {item.status?null:<button
                                                className='btn btn-danger'
                                                onClick={() => deleteRecord(item.id)}
                                            >
                                                <i className='bi bi-trash'></i>
                                            </button>}
                                        </td>
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
