import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import DataTable from 'datatables.net-dt'
import 'datatables.net-dt/css/dataTables.dataTables.min.css'

import AdminSidebar from '../../../components/Admin/AdminSidebar'
import { getSubcategory, deleteSubcategory } from "../../../../Redux/ActionCreators/SubcategoryActionCreators"

export default function AdminSubcategoryPage() {
    let [data, setData] = useState([])

    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are You Sure To Delete That Record :)")) {
            dispatch(deleteSubcategory({ id }))
            setData(data.filter(x => x.id !== id))
        }
    }

    useEffect(() => {
        let time = (() => {
            dispatch(getSubcategory())

            if (SubcategoryStateData.length)
                setData(SubcategoryStateData)
            else
                setData([])

            let time = setTimeout(() => {
                new DataTable('#myTable')
            }, 500)

            return time
        })()

        return () => clearTimeout(time)
    }, [SubcategoryStateData.length])

    return (
        <div className="container-fluid my-3">
            <div className='row'>
                <div className='col-lg-3'>
                    <AdminSidebar />
                </div>

                <div className='col-lg-9'>
                    <h5 className='bg-primary text-center p-2 text-light'>
                        Subcategory
                        <Link to="/admin/subcategory/create">
                            <i className='bi bi-plus text-light fs-5 float-end'></i>
                        </Link>
                    </h5>

                    <div className='table-responsive'>
                        <table className='table table-bordered' id='myTable'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Pic</th>
                                    <th>Status</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>

                                        <td>
                                            <Link
                                                to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`}
                                                target='_blank'
                                                rel='noreferrer'
                                            >
                                                <img
                                                    src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`}
                                                    height={70}
                                                    width={70}
                                                    alt=''
                                                />
                                            </Link>
                                        </td>

                                        <td>{item.status ? "Active" : "Inactive"}</td>

                                        <td>
                                            <Link
                                                to={`/admin/subcategory/update/${item.id}`}
                                                className='btn btn-primary'
                                            >
                                                <i className='bi bi-pencil'></i>
                                            </Link>
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
