import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../components/Admin/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'
import ImageValidator from '../../../Validators/ImageValidator'

import { getBrand, updateBrand } from '../../../../Redux/ActionCreators/BrandActionCreators'

export default function AdminBrandUpdatePage() {
    let { id } = useParams()
    let [data, setData] = useState({
        name: "",
        pic: "",
        status: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: '',
        pic: ''
    })

    let [show, setShow] = useState(false)

    let BrandStateData = useSelector(state => state.BrandStateData)

    let dispatch = useDispatch()

    let navigate = useNavigate()

    function getInputData(e) {
        let name = e.target.name
        let value = name === "pic" ? "brand/" + e.target.files[0].name : e.target.value

        setData({
            ...data, [name]: name === "status" ? (value === "1" ? true : false) : value
        })

        setErrorMessage({
            ...errorMessage,
            [name]: name === "pic" ? ImageValidator(e) : FormValidator(e)
        })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error) {
            setShow(true)
        } else {
            let item = BrandStateData.find(
                x => x.id !== id && x.name?.toLowerCase() === data.name?.toLowerCase()
            )
            if (item) {
         
                setErrorMessage({ ...errorMessage, name: "Brand With This Name Is Already Exist" })
                setShow(true)
            } else {
                dispatch(updateBrand({ ...data }))
                 // let formData = new FormData()
                // formData.append("name",data.name)
                // formData.append("pic",data.pic)
                // formData.append("status",data.status)
                // dispatch(createBrand(formData))
                navigate('/admin/brand')
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getBrand())
          
            if (BrandStateData.length) {
                let item = BrandStateData.find(x => x.id === id)
                if (item)
                    setData({ ...data, ...item })
                else
                    navigate("/admin/brand")
            }
        })()
    }, [BrandStateData.length])

    return (
        <div className="container-fluid my-3">
            <div className='row'>
                <div className='col-lg-3'>
                    <AdminSidebar />
                </div>
                <div className='col-lg-9'>
                    <h5 className='bg-primary text-center p-2 text-light'>
                        Update Brand
                        <Link to="/admin/brand">
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
                                    value={data.name}
                                    onChange={getInputData}
                                    placeholder='Brand Name'
                                    className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMessage.name ? (
                                    <p className='text-danger'>{errorMessage.name}</p>
                                ) : null}
                            </div>

                            <div className='col-6 mb-3'>
                                <label>Pic</label>
                                <input
                                    type='file'
                                    name='pic'
                                    onChange={getInputData}
                                    className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMessage.pic ? (
                                    <p className='text-danger'>{errorMessage.pic}</p>
                                ) : null}
                            </div>

                            <div className='col-lg-6 mb-3'>
                                <label>Status</label>
                                <select
                                    name='status'
                                    onChange={getInputData}
                                    value={data.status ? "1" : "0"}
                                    className='form-select border-primary'
                                >
                                    <option value='1'>Active</option>
                                    <option value='0'>Inactive</option>
                                </select>
                            </div>

                            <div className='col-12 mb-3'>
                                <button type='submit' className='btn btn-primary w-100'>
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
