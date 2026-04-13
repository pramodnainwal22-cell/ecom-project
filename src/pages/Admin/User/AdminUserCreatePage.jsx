import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import AdminSidebar from '../../../components/Admin/AdminSidebar'

import FormValidator from '../../../Validators/FormValidator'


import { createUser, getUser } from '../../../../Redux/ActionCreators/UserActionCreators'

export default function AdminUserCreatePage() {
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        cpassword: "",
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Feild is Mendatory",
        username: "Username Feild is Mendatory",
        email: "Email Feild is Mendatory",
        phone: "Phone Feild is Mendatory",
        password: "Password Feild is Mendatory",
    })

    let [show, setShow] = useState(false)

    let UserStateData = useSelector(state => state.UserStateData)
    let dispatch = useDispatch()

    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {

            if (data.password !== data.cpassword) {
                setErrorMessage({
                    ...errorMessage,
                    password: "Password And Confirm Password Doesn't Matched"
                })
                setShow(true)
                return
            }

            let item = UserStateData.find(x => x.username.toLocaleLowerCase() === data.username.toLocaleLowerCase() || x.email.toLocaleLowerCase() === data.email.toLocaleLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage({
                    ...error,
                    username: item.username.toLocaleLowerCase() === data.username.toLocaleLowerCase() ? "Username Already Taken" : "",
                    email: item.email.toLocaleLowerCase() === data.email.toLocaleLowerCase() ? "Email Address Already Taken" : "",
                })
            }
            else {
                dispatch(createUser({  ...data }))
                navigate("/admin/user")
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getUser())
        })()
    }, [UserStateData.length])

    return (
        <div className="container-fluid my-3">
            <div className='row'>
                <div className='col-lg-3'>
                    <AdminSidebar />
                </div>
                <div className='col-lg-9'>
                    <h5 className='bg-primary text-center p-2 text-light'>
                        Create User
                        <Link to="/admin/user">
                            <i className='bi bi-arrow-left text-light fs-5 float-end'></i>
                        </Link>
                    </h5>

                    <form onSubmit={postData}>
                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <label>Name*</label>
                                <input type="text" name="name" onChange={getInputData} placeholder="Full Name" className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label>Phone*</label>
                                <input type="text" name="phone" onChange={getInputData} placeholder="Phone Number" className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label>User Name*</label>
                                <input type="text" name="username" onChange={getInputData} placeholder="User Name" className={`form-control ${show && errorMessage.username ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label>Email*</label>
                                <input type="email" name="email" onChange={getInputData} placeholder="Email Address" className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label>Password*</label>
                                <input type="password" name="password" onChange={getInputData} placeholder="Password" className={`form-control ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : null}
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label>Confirm Password*</label>
                                <input type="password" name="cpassword" onChange={getInputData} placeholder="Confirm Password" className={`form-control ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />
                            </div>
                            <div className='col-lg-6 mb-3'>
                                <label>Role*</label>
                                <select
                                    name='role'
                                    onChange={getInputData}
                                    className='form-select border-primary'
                                >
                                    <option>Admin</option>
                                    <option>Super Admin</option>
                                </select>
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
                            <div className="col-12 mb-3">
                                <button type='submit' className='btn btn-primary w-100'>Signup</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
