import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import DataTable from 'datatables.net-dt'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import AdminSidebar from '../../../components/Admin/AdminSidebar'
import { getUser, deleteUser, updateUser } from "../../../../Redux/ActionCreators/UserActionCreators"

export default function AdminUserPage() {
    let [data, setData] = useState([])
    let [flag,setFlag] = useState(false)
    let UserStateData = useSelector(state => state.UserStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are You Sure To Delete That Record :)")) {
            dispatch(deleteUser({ id: id }))
            setData(data.filter(x => x.id !== id))
        }
    }

    function updateRecord(id) {
        let index = data.findIndex(x => x.id === id)
        data[index].status = !data[index].status
        dispatch(updateUser({ ...data[index] }))
        setFlag(!flag)
    }

    useEffect(() => {
        let time = (() => {
            dispatch(getUser())

            if (UserStateData.length)
                setData(UserStateData)
            else
                setData([])

            let time = setTimeout(() => {
                new DataTable('#myTable')
            }, 500)

            return time
        })()

        return () => clearTimeout(time)
    }, [UserStateData.length])

    return (
        <div className="container-fluid my-3">
            <div className='row'>
                <div className='col-lg-3'>
                    <AdminSidebar />
                </div>

                <div className='col-lg-9'>
                    <h5 className='bg-primary text-center p-2 text-light'>
                        User
                        <Link to="/admin/user/create">
                            <i className='bi bi-plus text-light fs-5 float-end'></i>
                        </Link>
                    </h5>

                    <div className='table-responsive'>
                        <table className='table table-bordered' id='myTable'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.role}</td>
                                            <td style={{ cursor: "pointer" }} title='Click Here to Change Status' onClick={() => updateRecord(item.id)}>
                                                {item.status ? "Active" : "Inactive"}</td>

                                            <td>
                                                {item.role === "Buyer" ? null : <Link
                                                    to={`/admin/user/update/${item.id}`}
                                                    className='btn btn-primary'
                                                >
                                                    <i className='bi bi-pencil'></i>
                                                </Link>}
                                            </td>

                                            <td>
                                                <button
                                                    className='btn btn-danger'
                                                    onClick={() => deleteRecord(item.id)}
                                                >
                                                    <i className='bi bi-trash'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
