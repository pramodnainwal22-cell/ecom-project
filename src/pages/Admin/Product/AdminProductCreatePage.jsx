import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import AdminSidebar from '../../../components/Admin/AdminSidebar'

import FormValidator from '../../../Validators/FormValidator'
import ImageValidator from '../../../Validators/ImageValidator'

import { createProduct } from '../../../../Redux/ActionCreators/ProductActionCreators'
import { getMaincategory } from '../../../../Redux/ActionCreators/MaincategoryActionCreators'
import { getSubcategory } from '../../../../Redux/ActionCreators/SubCategoryActionCreators'
import { getBrand } from '../../../../Redux/ActionCreators/BrandActionCreators'

let colors = ["White", "Black", "Blue", "Red", "Green", "Yellow", "Pink", "Navy", "Gray", "Orange", "Lavender", "N/A"]
let sizes = ["XXXL", "XXL", "XL", "L", "M", "SM", "XS", "NB", "26", "28", "30", "32", "34", "36", "38", "40", "42", "N/A"]

var rte

export default function AdminProductCreatePage() {
    let refdiv = useRef(null)

    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: [],
        size: [],
        basePrice: 0,
        discount: 0,
        finalPrice: 0,
        stock: true,
        stockQuantity: 0,
        pic: [],
        status: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: ' Name is Mandatory ',
        color: 'Please Select Atleast One Color',
        size: 'Please Select Atleast One Size',
        basePrice: ' Base Price is Mandatory ',
        discount: ' Discount is Mandatory ',
        stockQuantity: ' Stock Quantity is Mandatory ',
        pic: ' Pic is Mandatory'
    })

    let [show, setShow] = useState(false)

    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)

    let dispatch = useDispatch()
    let navigate = useNavigate()

    function getInputData(e) {
        let name = e.target.name
        let value = name === "pic" ? Array.from(e.target.files).map(x => "product/" + x.name) : e.target.value
        // let value = name === "pic" ? e.target.files[0] : e.target.value    In case of real backend

        setData({
            ...data,
            [name]: name === "status" || name === "stock"
                ? (value === "1" ? true : false)
                : value
        })

        setErrorMessage({
            ...errorMessage,
            [name]: name === "pic" ? ImageValidator(e) : FormValidator(e)
        })
    }

    function getCheckboxData(key, value) {
        let arr = key === "color" ? [...data.color] : [...data.size]

        if (arr.includes(value))
            arr = arr.filter(x => x !== value)
        else
            arr.push(value)

        setErrorMessage({ ...errorMessage, [key]: arr.length ? "" : `Please Select Atleast One ${key}` })
        setData({ ...data, [key]: arr })
    }

    function postData(e) {
        e.preventDefault()

        let error = Object.values(errorMessage).find(x => x !== "")
        if (error) {
            setShow(true)
        } else {
            let bp = parseInt(data.basePrice)
            let d = parseInt(data.discount)
            let fp = parseInt(bp - bp * d / 100)
            let sc = parseInt(data.stockQuantity)

            dispatch(createProduct({
                ...data,
                maincategory: data.maincategory ? data.maincategory : MaincategoryStateData[0].name,
                subcategory: data.subcategory ? data.subcategory : SubcategoryStateData[0].name,
                brand: data.brand ? data.brand : BrandStateData[0].name,
                basePrice: bp,
                discount: d,
                finalPrice: fp,
                stockQuantity: sc,
                description: rte.getHTMLCode()
            }))

            navigate('/admin/product')
        }
    }

    useEffect(() => {
        rte = new window.RichTextEditor(refdiv.current)
        rte.setHTMLCode("")
    }, [])

    useEffect(() => {
        dispatch(getMaincategory())
    }, [dispatch])

    useEffect(() => {
        dispatch(getSubcategory())
    }, [dispatch])

    useEffect(() => {
        dispatch(getBrand())
    }, [dispatch])

    return (
        <div className="container-fluid my-3">
            <div className='row'>
                <div className='col-lg-3'>
                    <AdminSidebar />
                </div>
                <div className='col-lg-9'>
                    <h5 className='bg-primary text-center p-2 text-light'>
                        Create Product
                        <Link to="/admin/product">
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
                                    className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMessage.name && <p className='text-danger'>{errorMessage.name}</p>}
                            </div>

                            <div className='col-md-3 mb-3'>
                                <label>Maincategory*</label>
                                <select name='maincategory' onChange={getInputData} className='form-select border-primary'>
                                    {MaincategoryStateData.filter(x => x.status).map(item =>
                                        <option key={item.id}>{item.name}</option>
                                    )}
                                </select>
                            </div>

                            <div className='col-md-3 mb-3'>
                                <label>Subcategory*</label>
                                <select name='subcategory' onChange={getInputData} className='form-select border-primary'>
                                    {SubcategoryStateData.filter(x => x.status).map(item =>
                                        <option key={item.id}>{item.name}</option>
                                    )}
                                </select>
                            </div>

                            <div className='col-md-3 mb-3'>
                                <label>Brand*</label>
                                <select name='brand' onChange={getInputData} className='form-select border-primary'>
                                    {BrandStateData.filter(x => x.status).map(item =>
                                        <option key={item.id}>{item.name}</option>
                                    )}
                                </select>
                            </div>

                            <div className='col-md-3 mb-3'>
                                <label>Stock*</label>
                                <select name='stock' onChange={getInputData} className='form-select border-primary'>
                                    <option value={1}>In Stock</option>
                                    <option value={0}>Out of Stock</option>
                                </select>
                            </div>

                            <div className='col-12 mb-3'>
                                <label>Color*</label>
                                <div className='row border border-primary p-2 m-1 rounded'>
                                    {colors.map((item, index) => (
                                        <div key={index} className='mb-3 col-xl-2 col-lg-3 col-md-4 col-6'>
                                            <input
                                                type='checkbox'
                                                checked={data.color.includes(item)}
                                                onChange={() => getCheckboxData('color', item)}
                                            />
                                            <label className='ms-2'>{item}</label>
                                        </div>
                                    ))}
                                </div>
                                {show && errorMessage.color && <p className='text-danger'>{errorMessage.color}</p>}
                            </div>

                            <div className='col-12 mb-3'>
                                <label>Size*</label>
                                <div className='row border border-primary p-2 m-1 rounded'>
                                    {sizes.map((item, index) => (
                                        <div key={index} className='mb-3 col-xl-2 col-lg-3 col-md-4 col-6'>
                                            <input
                                                type='checkbox'
                                                checked={data.size.includes(item)}
                                                onChange={() => getCheckboxData('size', item)}
                                            />
                                            <label className='ms-2'>{item}</label>
                                        </div>
                                    ))}
                                </div>
                                {show && errorMessage.size && <p className='text-danger'>{errorMessage.size}</p>}
                            </div>

                            <div className='col-lg-6 mb-3'>
                                <label>Base Price*</label>
                                <input type='number' name='basePrice' onChange={getInputData}
                                    className={`form-control ${show && errorMessage.basePrice ? 'border-danger' : 'border-primary'}`} />
                            </div>

                            <div className='col-lg-6 mb-3'>
                                <label>Discount*</label>
                                <input type='number' name='discount' onChange={getInputData}
                                    className={`form-control ${show && errorMessage.discount ? 'border-danger' : 'border-primary'}`} />
                            </div>

                            <div className='col-12 mb-3'>
                                <label>Description*</label>
                                <div ref={refdiv} className='border border-primary'></div>
                            </div>

                            <div className='col-lg-4 mb-3'>
                                <label>Stock Quantity*</label>
                                <input type='number' name='stockQuantity' onChange={getInputData}
                                    className={`form-control ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-primary'}`} />
                            </div>

                            <div className='col-lg-4 mb-3'>
                                <label>Pic*</label>
                                <input type='file' name='pic' multiple onChange={getInputData}
                                    className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMessage.pic && errorMessage.pic.split(".").map((err, i) =>
                                    <p key={i} className='text-danger'>{err}</p>
                                )}
                            </div>

                            <div className='col-lg-4 mb-3'>
                                <label>Status*</label>
                                <select name='status' onChange={getInputData} className='form-select border-primary'>
                                    <option value='1'>Active</option>
                                    <option value='0'>Inactive</option>
                                </select>
                            </div>

                            <div className='col-12 mb-3'>
                                <button type='submit' className='btn btn-primary w-100'>Create</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
