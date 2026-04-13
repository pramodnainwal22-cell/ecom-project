import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../components/Admin/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'


import { getFaq, updateFaq } from '../../../../Redux/ActionCreators/FaqActionCreators'

export default function AdminFaqUpdatePage() {
    let { id } = useParams()
    let [data, setData] = useState({
        question: "",
        answer: "",
        status: true
    })

    let [errorMessage, setErrorMessage] = useState({
        question: '',
        answer: ''

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
                x => x.id !== id && x.question?.toLowerCase() === data.question?.toLowerCase()
            )
            if (item) {

                setErrorMessage({ ...errorMessage, name: "Faq With This Question Is Already Exist" })
                setShow(true)
            } else {
                dispatch(updateFaq({ ...data }))

                navigate('/admin/faq')
            }
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getFaq())

            if (FaqStateData.length) {
                let item = FaqStateData.find(x => x.id === id)
                if (item)
                    setData({ ...data, ...item })
                else
                    navigate("/admin/faq")
            }
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
                        Update Faq
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
                                    value={data.question}
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
                                    value={data.answer}
                                    onChange={getInputData}
                                    placeholder='Short Description' rows={3}
                                    className={`form-control ${show && errorMessage.answer ? 'border-danger' : 'border-primary'}`}></textarea>

                                {show && errorMessage.answer && (
                                    <p className='text-danger'>{errorMessage.answer}</p>
                                )}
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
