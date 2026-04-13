import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import AdminSidebar from '../../../components/Admin/AdminSidebar'

import FormValidator from '../../../Validators/FormValidator'
import ImageValidator from '../../../Validators/ImageValidator'

import { createSubcategory, getSubcategory } from '../../../../Redux/ActionCreators/SubcategoryActionCreators'

export default function AdminSubcategoryCreatePage() {

    const [data, setData] = useState({
        name: "",
        pic: "",
        status: true
    })

    const [errorMessage, setErrorMessage] = useState({
        name: 'Name is Mandatory',
        pic: 'Pic is Mandatory'
    })

    const [show, setShow] = useState(false)

    const SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    const getInputData = (e) => {
        const name = e.target.name
        const value = name === "pic" ? "subcategory/" + e.target.files[0].name : e.target.value

        setData({
            ...data,
            [name]: name === "status" ? (value === "1") : value
        })

        setErrorMessage({
            ...errorMessage,
            [name]: name === "pic" ? ImageValidator(e) : FormValidator(e)
        })
    }

    
    const postData = (e) => {
        e.preventDefault()

        const error = Object.values(errorMessage).find(x => x !== "")
        if (error) {
            setShow(true)
            return
        }

        
        const item = SubcategoryStateData.find(
            x => x.name?.toLowerCase() === data.name?.toLowerCase()
        )

        if (item) {
            setErrorMessage({
                ...errorMessage,
                name: "Subcategory with this name already exists"
            })
            setShow(true)
        } else {
            dispatch(createSubcategory({ ...data }))
            navigate('/admin/subcategory')
        }
    }

    
    useEffect(() => {
        dispatch(getSubcategory())
    }, [])

    return (
        <div className="container-fluid my-3">
            <div className='row'>
                <div className='col-lg-3'>
                    <AdminSidebar />
                </div>
                <div className='col-lg-9'>
                    <h5 className='bg-primary text-center p-2 text-light'>
                        Create Subcategory
                        <Link to="/admin/subcategory">
                            <i className='bi bi-arrow-left text-light fs-5 float-end'></i>
                        </Link>
                    </h5>

                    <form onSubmit={postData}>
                        <div className='row'>

                            <div className='col-12 mb-3'>
                                <label>Name*</label>
                                <input
                                    type='text'
                                    name='name'
                                    onChange={getInputData}
                                    placeholder='Subcategory Name'
                                    className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMessage.name && (
                                    <p className='text-danger'>{errorMessage.name}</p>
                                )}
                            </div>

                            <div className='col-6 mb-3'>
                                <label>Pic*</label>
                                <input
                                    type='file'
                                    name='pic'
                                    onChange={getInputData}
                                    className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMessage.pic && (
                                    <p className='text-danger'>{errorMessage.pic}</p>
                                )}
                            </div>

                            <div className='col-lg-6 mb-3'>
                                <label>Status*</label>
                                <select
                                    name='status'
                                    onChange={getInputData}
                                    className='form-select border-primary'
                                >
                                    <option value='1'>Active</option>
                                    <option value='0'>Inactive</option>
                                </select>
                            </div>

                            <div className='col-12 mb-3'>
                                <button type='submit' className='btn btn-primary w-100'>
                                    Create
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
