import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import AdminSidebar from '../../../components/Admin/AdminSidebar'

import FormValidator from '../../../Validators/FormValidator'


import { createFeature, getFeature } from '../../../../Redux/ActionCreators/FeatureActionCreators'

export default function AdminFeatureCreatePage() {

    let [data, setData] = useState({
        name: "",
        icon: "",
        shortDescription: "",
        status: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: ' Name  is Mandatory ',
        icon: ' Icon  is Mandatory',
        shortDescription: 'Short Description  is Mandatory'
    })

    let [show, setShow] = useState(false)

    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()
    
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target

        setData({
            ...data, [name]: name === "status" ? (value === "1" ? true : false) : value
        })

        setErrorMessage({
            ...errorMessage, [name]: FormValidator(e)
        })
    }

    function postData(e) {
        e.preventDefault()

        let error = Object.values(errorMessage).find(x => x !== "")
        if (error) {
            setShow(true)
        } else {

            let item = FeatureStateData.find(
                x => x.name?.toLowerCase() === data.name?.toLowerCase()
            )

            if (item) {
                setErrorMessage({
                    ...errorMessage,
                    name: "Feature With This Name Is Already Exist"
                })
                setShow(true)
            } else {
                dispatch(createFeature({ ...data }))

                navigate('/admin/feature')
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getFeature())
        })()
    }, [FeatureStateData.length])

    return (
        <div className="container-fluid my-3">
            <div className='row'>
                <div className='col-lg-3'>
                    <AdminSidebar />
                </div>
                <div className='col-lg-9'>
                    <h5 className='bg-primary text-center p-2 text-light'>
                        Create Feature
                        <Link to="/admin/feature">
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
                                    placeholder='Feature Name'
                                    className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMessage.name && (
                                    <p className='text-danger'>{errorMessage.name}</p>
                                )}
                            </div>
                            <div className='col-12 mb-3'>
                                <label>ShortDescription*</label>
                                <textarea

                                    name='shortDescription'
                                    onChange={getInputData}
                                    placeholder='Short Description' rows={3}
                                    className={`form-control ${show && errorMessage.shortDescription ? 'border-danger' : 'border-primary'}`}></textarea>

                                {show && errorMessage.shortDescription && (
                                    <p className='text-danger'>{errorMessage.shortDescription}</p>
                                )}
                            </div>

                            <div className='col-6 mb-3'>
                                <label>Icon*</label>
                                <input
                                    type='text'
                                    name='icon'
                                    placeholder="Icon Tag eg. <i class='bi bi-list'></i>"
                                    onChange={getInputData}
                                    className={`form-control ${show && errorMessage.icon ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMessage.icon && (
                                    <p className='text-danger'>{errorMessage.icon}</p>
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
