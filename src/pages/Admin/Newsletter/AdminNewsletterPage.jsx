import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DataTable from 'datatables.net-dt'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import AdminSidebar from '../../../components/Admin/AdminSidebar'
import { getNewsletter, deleteNewsletter, updateNewsletter} from "../../../../Redux/ActionCreators/NewsletterActionCreators"

export default function AdminNewsletterPage() {
    let [data, setData] = useState([])
    let [flag,setFlag] = useState(false)

    let NewsletterStateData = useSelector(state => state.NewsletterStateData )
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are You Sure To Delete That Record :)")) {
            dispatch(deleteNewsletter({ id:id }))
            setData(data.filter(x => x.id !== id))
        }
    }

    function updateRecord(id) {
        let index  = data.findIndex(x=>x.id===id)
        data[index].status = !data[index].status
        dispatch(updateNewsletter({...data[index]}))
        setFlag(!flag)
     }

    useEffect(() => {
        let time = (() => {
            dispatch(getNewsletter())

            if (NewsletterStateData.length)
                setData(NewsletterStateData)
            else
                setData([])

            let time = setTimeout(() => {
                new DataTable('#myTable')
            }, 500)

            return time
        })()

        return () => clearTimeout(time)
    }, [NewsletterStateData.length])

    return (
        <div className="container-fluid my-3">
            <div className='row'>
                <div className='col-lg-3'>
                    <AdminSidebar />
                </div>

                <div className='col-lg-9'>
                    <h5 className='bg-primary text-center p-2 text-light'>Newsletter</h5>

                    <div className='table-responsive'>
                        <table className='table table-bordered' id='myTable'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td style={{cursor:"pointer"}} title='Click Here to Change Status' onClick={()=>updateRecord(item.id)}>{item.status ? "Active" : "Inactive"}</td>
                                        <td>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => deleteRecord(item.id)}
                                            >
                                                <i className='bi bi-trash'></i>
                                            </button>
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
