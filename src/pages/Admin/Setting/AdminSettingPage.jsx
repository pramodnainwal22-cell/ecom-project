import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import AdminSidebar from '../../../components/Admin/AdminSidebar'
import { getSetting, createSetting, updateSetting } from "../../../../Redux/ActionCreators/SettingActionCreators"

var rtePrivacyPolicy;
var rteTermsConditions;
var rteRefundPolicy;

export default function AdminSettingPage() {

    var refdivPrivacyPolicy = useRef(null)
    var refdivTermsConditions = useRef(null)
    var refdivRefundPolicy = useRef(null)

    let [data, setData] = useState({
        siteName: "",
        map1: "",
        map2: "",
        address: "",
        email: "",
        phone: "",
        whatsapp: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        instagram: "",
        youtube: "",
        privacyPolicy: "",
        termsConditions: "",
        refundPolicy: "",
    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    function postData(e) {
        e.preventDefault()

        let item = {
            ...data,
            privacyPolicy: rtePrivacyPolicy.getHTMLCode(),
            termsConditions: rteTermsConditions.getHTMLCode(),
            refundPolicy: rteRefundPolicy.getHTMLCode(),
        }

        if (SettingStateData.length)
            dispatch(updateSetting(item))
        else
            dispatch(createSetting(item))

        toast("Record Has Been Updated!!!")
    }

    useEffect(() => {
        dispatch(getSetting())
        rtePrivacyPolicy = new window.RichTextEditor(refdivPrivacyPolicy.current)
        rteTermsConditions = new window.RichTextEditor(refdivTermsConditions.current)
        rteRefundPolicy = new window.RichTextEditor(refdivRefundPolicy.current)

        if (SettingStateData.length) {
            let item = SettingStateData[0]
            setData({ ...data, ...item })
            rtePrivacyPolicy.setHTMLCode(item.privacyPolicy ? item.privacyPolicy : "")
            rteRefundPolicy.setHTMLCode(item.refundPolicy ? item.refundPolicy : "")
            rteTermsConditions.setHTMLCode(item.termsConditions ? item.termsConditions : "")

        }

    }, [SettingStateData.length])

    return (
        <>
            <ToastContainer />

            <div className="container-fluid my-3">
                <div className='row'>
                    <div className='col-lg-3'>
                        <AdminSidebar />
                    </div>

                    <div className='col-lg-9'>
                        <h5 className='bg-primary text-center p-2 text-light'>
                            Configuration Settings
                        </h5>

                        <form onSubmit={postData}>
                            <div className='row'>

                                <div className='col-12 mb-3'>
                                    <label>Google Map1</label>
                                    <input type='url' name='map1' onChange={getInputData} value={data.map1} placeholder='Google Map1' className='form-control border-primary' />
                                </div>

                                <div className='col-12 mb-3'>
                                    <label>Google Map2</label>
                                    <input type='url' name='map2' onChange={getInputData} value={data.map2} placeholder='Google Map2' className='form-control border-primary' />
                                </div>

                                <div className='col-12 mb-3'>
                                    <label>Address</label>
                                    <input type='text' name='address' onChange={getInputData} value={data.address} placeholder='Address' className='form-control border-primary' />
                                </div>

                                <div className='col-md-3 mb-3'>
                                    <label>Site Name</label>
                                    <input type='text' name='siteName' onChange={getInputData} value={data.siteName} placeholder='Site Name' className='form-control border-primary' />
                                </div>

                                <div className='col-md-3 mb-3'>
                                    <label>Email Address</label>
                                    <input type='email' name='email' onChange={getInputData} value={data.email} placeholder='Email Address' className='form-control border-primary' />
                                </div>

                                <div className='col-md-3 mb-3'>
                                    <label>Phone Number</label>
                                    <input type='text' name='phone' onChange={getInputData} value={data.phone} placeholder='Phone Number' className='form-control border-primary' />
                                </div>

                                <div className='col-md-3 mb-3'>
                                    <label>WhatsApp</label>
                                    <input type='text' name='whatsapp' onChange={getInputData} value={data.whatsapp} placeholder='Whatsapp Number' className='form-control border-primary' />
                                </div>

                                <div className='col-12 mb-3'>
                                    <label>Privacy Policy</label>
                                    <div ref={refdivPrivacyPolicy} className='border border-primary'></div>
                                </div>

                                <div className='col-12 mb-3'>
                                    <label>Terms and Conditions</label>
                                    <div ref={refdivTermsConditions} className='border border-primary'></div>
                                </div>

                                <div className='col-12 mb-3'>
                                    <label>Refund Policy</label>
                                    <div ref={refdivRefundPolicy} className='border border-primary'></div>
                                </div>

                                <div className='col-md-6 mb-3'>
                                    <label>Facebook Profile Page URL</label>
                                    <input type='url' name='facebook' onChange={getInputData} value={data.facebook} placeholder='Facebook' className='form-control border-primary' />
                                </div>

                                <div className='col-md-6 mb-3'>
                                    <label>Twitter Profile Page URL</label>
                                    <input type='url' name='twitter' onChange={getInputData} value={data.twitter} placeholder='Twitter' className='form-control border-primary' />
                                </div>

                                <div className='col-md-6 mb-3'>
                                    <label>Linkedin Profile Page URL</label>
                                    <input type='url' name='linkedin' onChange={getInputData} value={data.linkedin} placeholder='Linkedin' className='form-control border-primary' />
                                </div>

                                <div className='col-md-6 mb-3'>
                                    <label>Instagram Profile Page URL</label>
                                    <input type='url' name='instagram' onChange={getInputData} value={data.instagram} placeholder='Instagram' className='form-control border-primary' />
                                </div>

                                <div className='col-md-6 mb-3'>
                                    <label>Youtube Profile Page URL</label>
                                    <input type='url' name='youtube' onChange={getInputData} value={data.youtube} placeholder='Youtube' className='form-control border-primary' />
                                </div>

                                <div className="col-12">
                                    <button type="submit" className='btn btn-primary w-100'>Submit</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
