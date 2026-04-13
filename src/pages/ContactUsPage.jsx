import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getSetting } from '../../Redux/ActionCreators/SettingActionCreators'
import { createContactUs } from '../../Redux/ActionCreators/ContactUsActionCreators'
import FormValidator from '../Validators/FormValidator'

let dataOptions = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
}
let errorMessageOptions = {
    name: "Name Feild Is Mendatory",
    email: "Email Feild Is Mendatory",
    phone: "Phone Feild Is Mendatory",
    subject: "Subject Feild Is Mendatory",
    message: "Message Feild Is Mendatory",
}
export default function ContactUsPage() {
    let [data, setData] = useState(dataOptions)
    let [errorMessage, setErrorMessage] = useState(errorMessageOptions)
    let [show, setShow] = useState(false)
    let [message, setMessage] = useState("")

    let [settingData, setSettingData] = useState({
        address: import.meta.env.VITE_APP_ADDRESS,
        map1: import.meta.env.VITE_APP_MAP1,
        map2: import.meta.env.VITE_APP_MAP2,
        email: import.meta.env.VITE_APP_EMAIL,
        phone: import.meta.env.VITE_APP_PHONE,
        whatsapp: import.meta.env.VITE_APP_WHATSAPP,
        facebook: import.meta.env.VITE_APP_FACEBOOK,
        twitter: import.meta.env.VITE_APP_TWITTER,
        linkedin: import.meta.env.VITE_APP_LINKEDIN,
        instagram: import.meta.env.VITE_APP_INSTAGRAM,
        youtube: import.meta.env.VITE_APP_YOUTUBE,
    })
    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

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
            dispatch(createContactUs({ ...data, status: true, date: new Date() }))
            setMessage("Thanks To Contact Us, Our Team Will Contact You Soon To Resolve Your Query")
            setData(dataOptions)
            setErrorMessage(errorMessageOptions)
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = SettingStateData[0]
                setSettingData({
                    address: item.address ? item.address : settingData.address,
                    map1: item.map1 ? item.map1 : settingData.map1,
                    map2: item.map2 ? item.map2 : settingData.map2,
                    email: item.email ? item.email : settingData.email,
                    phone: item.phone ? item.phone : settingData.phone,
                    whatsapp: item.whatsapp ? item.whatsapp : settingData.whatsapp,
                    twitter: item.twitter ? item.twitter : settingData.twitter,
                    facebook: item.facebook ? item.facebook : settingData.facebook,
                    linkedin: item.linkedin ? item.linkedin : settingData.linkedin,
                    instagram: item.instagram ? item.instagram : settingData.instagram,
                    youtube: item.youtube ? item.youtube : settingData.youtube,
                })
            }
        })()
    }, [SettingStateData.length])

    return (
        <div className="container-fluid pt-5">
            <div className="container">
                <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
                    <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
                        Any Questions?
                    </h5>
                    <h1 className="display-4">Please Feel Free To Contact Us</h1>
                </div>
                <div className="row">
                    <div className="col-lg-5">
                        <div className="row g-5 mb-5">
                            <div className="col-6">
                                <div
                                    className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
                                    style={{ height: "200px" }}
                                >
                                    <div
                                        className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                                        style={{ width: "100px", height: "70px", transform: "rotate(-15deg)" }}
                                    >
                                        <i
                                            className="fa fa-2x fa-location-arrow text-white"
                                            style={{ transform: "rotate(15deg)" }}
                                        ></i>
                                    </div>
                                    <Link to={settingData.map1} className="mb-0 text-primary" target='_blank'>{settingData.address}</Link>
                                </div>
                            </div>

                            <div className="col-6">
                                <div
                                    className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
                                    style={{ height: "200px" }}
                                >
                                    <div
                                        className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                                        style={{ width: "100px", height: "70px", transform: "rotate(-15deg)" }}
                                    >
                                        <i
                                            className="fa fa-2x fa-envelope-open text-white"
                                            style={{ transform: "rotate(15deg)" }}
                                        ></i>
                                    </div>
                                    <Link to={`mailto:${settingData.email}`} className="mb-0 text-primary" target='_blank'>{settingData.email}</Link>
                                </div>
                            </div>


                            <div className="col-6">
                                <div
                                    className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
                                    style={{ height: "200px" }}
                                >
                                    <div
                                        className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                                        style={{ width: "100px", height: "70px", transform: "rotate(-15deg)" }}
                                    >
                                        <i
                                            className="fa fa-2x fa-phone text-white"
                                            style={{ transform: "rotate(15deg)" }}
                                        ></i>
                                    </div>
                                    <Link to={`tel:${settingData.phone}`} className="mb-0 text-primary" target='_blank'>{settingData.phone}</Link>
                                </div>
                            </div>

                            <div className="col-6">
                                <div
                                    className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
                                    style={{ height: "200px" }}
                                >
                                    <div
                                        className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                                        style={{ width: "100px", height: "70px", transform: "rotate(-15deg)" }}
                                    >
                                        <i
                                            className="fa fa-2x bi bi-whatsapp text-white"
                                            style={{ transform: "rotate(15deg)" }}
                                        ></i>
                                    </div>
                                    <Link to={`https://we.me/${settingData.whatsapp}`} className="mb-0 text-primary" target='_blank'>{settingData.whatsapp}</Link>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div
                                    className="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
                                    style={{ height: "200px" }}
                                >
                                    <div
                                        className="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                                        style={{ width: "100px", height: "70px", transform: "rotate(-15deg)" }}
                                    >
                                        <i
                                            className="fa fa-2x bi bi-facebook text-white"
                                            style={{ transform: "rotate(15deg)" }}
                                        ></i>
                                        <i
                                            className="fa fa-2x bi bi-twitter text-white"
                                            style={{ transform: "rotate(15deg)" }}
                                        ></i>
                                    </div>
                                    <div>
                                        <Link to={`${settingData.facebook}`} className="mb-0 text-primary mx-1" target='_blank'><i className='bi bi-facebook fs-3'></i></Link>
                                        <Link to={`${settingData.twitter}`} className="mb-0 text-primary mx-1" target='_blank'><i className='bi bi-twitter fs-3'></i></Link>
                                        <Link to={`${settingData.linkedin}`} className="mb-0 text-primary mx-1" target='_blank'><i className='bi bi-linkedin fs-3'></i></Link>
                                        <Link to={`${settingData.instagram}`} className="mb-0 text-primary mx-1" target='_blank'><i className='bi bi-instagram fs-3'></i></Link>
                                        <Link to={`${settingData.youtube}`} className="mb-0 text-primary mx-1" target='_blank'><i className='bi bi-youtube fs-3'></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="row">
                            <div className="col-12" style={{ height: "500px" }}>
                                <div className="position-relative h-100">
                                    <iframe className="position-relative w-100 h-100" src={settingData.map2}></iframe>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center position-relative"
                            style={{ marginTop: "-300px", zIndex: 1 }}
                        >
                            <div className="col-12">
                                <div className="bg-white rounded p-5 m-5 mb-0">
                                    {message?<p className='text-success text-center'>{message}</p>:null}
                                    <form onSubmit={postData}>
                                        <div className="row g-3">
                                            <div className="col-12 ">
                                                <label>Name*</label>
                                                <input type="text" name='name' value={data.name} onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} placeholder="Your Name" />
                                                {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                            </div>
                                            <div className="col-md-6 ">
                                                <label>Email*</label>
                                                <input type="email" name='email' value={data.email} onChange={getInputData} className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} placeholder="Email Address" />
                                                {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                            </div>
                                            <div className="col-md-6 ">
                                                <label>Phone*</label>
                                                <input type="text" name='phone' value={data.phone} onChange={getInputData} className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} placeholder="Phone Number" />
                                                {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                            </div>
                                            <div className="col-12 ">
                                                <label>Subject*</label>
                                                <input type="text" name='subject' value={data.subject} onChange={getInputData} className={`form-control ${show && errorMessage.subject ? 'border-danger' : 'border-primary'}`} placeholder="Subject" />
                                                {show && errorMessage.subject ? <p className='text-danger'>{errorMessage.subject}</p> : null}
                                            </div>
                                            <div className="col-12 ">
                                                <label>Message*</label>
                                                <textarea type="text" name='message' value={data.message} onChange={getInputData} className={`form-control ${show && errorMessage.message ? 'border-danger' : 'border-primary'}`} placeholder="Message" rows={4} ></textarea>
                                                {show && errorMessage.message ? <p className='text-danger'>{errorMessage.message}</p> : null}
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100 py-3" type="submit">
                                                    Send Message
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
