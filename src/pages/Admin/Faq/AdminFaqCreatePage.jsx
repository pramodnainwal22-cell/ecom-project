import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import AdminSidebar from '../../../components/Admin/AdminSidebar'

import FormValidator from '../../../Validators/FormValidator'


import { createFaq, getFaq } from '../../../../Redux/ActionCreators/FaqActionCreators'

export default function AdminFaqCreatePage() {

    let [data, setData] = useState({
        question: "",
        answer: "",
        status: true
    })

    let [errorMessage, setErrorMessage] = useState({
        question: ' Question  is Mandatory ',
        answer: ' Answer  is Mandatory'
       
    })

    let [show, setShow] = useState(false)

    let FaqStateData = useSelector(state => state.FaqStateData)
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

            let item = FaqStateData.find(
                x => x.question?.toLowerCase() === data.question?.toLowerCase()
            )

            if (item) {
                setErrorMessage({
                    ...errorMessage,
                    name: "Faq With This Question  Is Already Exist"
                })
                setShow(true)
            } else {
                dispatch(createFaq({ ...data }))

                navigate('/admin/faq')
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getFaq())
        })()
    }, [FaqStateData.length])

    return (
        <div className="container-fluid my-3">
            <div className='row'>
                <div className='col-lg-3'>
                    <AdminSidebar />
                </div>
                <div className='col-lg-9'>
                    <h5 className='bg-primary text-center p-2 text-light'>
                        Create Faq
                        <Link to="/admin/faq">
                            <i className='bi bi-arrow-left text-light fs-5 float-end'></i>
                        </Link>
                    </h5>

                    <form onSubmit={postData}>
                        <div className='row'>

                            <div className='col-12 mb-3'>
                                <label>Question*</label>
                                <input
                                    type='text'
                                    name='question'
                                    onChange={getInputData}
                                    placeholder='Question'
                                    className={`form-control ${show && errorMessage.question ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMessage.question && (
                                    <p className='text-danger'>{errorMessage.question}</p>
                                )}
                            </div>
                            <div className='col-12 mb-3'>
                                <label>Answer*</label>
                                <textarea

                                    name='answer'
                                    onChange={getInputData}
                                    placeholder='Short Description' rows={3}
                                    className={`form-control ${show && errorMessage.answer ? 'border-danger' : 'border-primary'}`}></textarea>

                                {show && errorMessage.answer && (
                                    <p className='text-danger'>{errorMessage.answer}</p>
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
