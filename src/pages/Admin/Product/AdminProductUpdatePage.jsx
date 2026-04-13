import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import AdminSidebar from '../../../components/Admin/AdminSidebar'

import FormValidator from '../../../Validators/FormValidator'
import ImageValidator from '../../../Validators/ImageValidator'

import { updateProduct, getProduct } from '../../../../Redux/ActionCreators/ProductActionCreators'
import { getMaincategory } from '../../../../Redux/ActionCreators/MainCategoryActionCreators'
import { getSubcategory } from '../../../../Redux/ActionCreators/SubcategoryActionCreators'
import { getBrand } from '../../../../Redux/ActionCreators/BrandActionCreators'

let colors = ["White", "Black", "Blue", "Red", "Green", "Yellow", "Pink", "Navy", "Gray", "Orange", "Lavender", "N/A"]
let sizes = ["XXXL", "XXL", "XL", "L", "M", "SM", "XS", "NB", "26", "28", "30", "32", "34", "36", "38", "40", "42", "N/A"]

var rte

export default function AdminProductUpdatePage() {
    let refdiv = useRef(null)
    let { id } = useParams()
    let [flag, setFlag] = useState(false)

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
        name: '',
        color: '',
        size: '',
        basePrice: '',
        discount: '',
        stockQuantity: '',
        pic: ''
    })

    let [show, setShow] = useState(false)

    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)

    let dispatch = useDispatch()
    let navigate = useNavigate()

    function getInputData(e) {
        let name = e.target.name
        if (name === "pic") {
            var picError = ImageValidator(e)
        }
        if (name === "pic" && picError === "") {
            var value = data.pic.concat(Array.from(e.target.files).map(x => "product/" + x.name))
            // let value = e.target.files[0]     In case of real backend
            setData({ ...data, pic: value })
        }
        else if(name!=="pic"){
            var value = e.target.value
            setData({ ...data, [name]: name === "status" || name === "stock" ? (value === "1" ? true : false) : value })

        }
        setErrorMessage({ ...errorMessage, [name]: name === "pic" ? picError : FormValidator(e) })
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

            dispatch(updateProduct({
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
        dispatch(getMaincategory())
    }, [dispatch])

    useEffect(() => {
        dispatch(getSubcategory())
    }, [dispatch])

    useEffect(() => {
        dispatch(getBrand())
    }, [dispatch])

    useEffect(() => {
        dispatch(getProduct())
        rte = new window.RichTextEditor(refdiv.current)
        if (ProductStateData.length) {
            let item = ProductStateData.find(x => x.id === id)
            if (item) {
                setData({ ...data, ...item })
                rte.setHTMLCode(item.description)
            }
            else {
                navigate("/admin/product")
            }
        }
    }, [dispatch])

    return (
        <div className="container-fluid my-3">
            <div className='row'>
                <div className='col-lg-3'>
                    <AdminSidebar />
                </div>
                <div className='col-lg-9'>
                    <h5 className='bg-primary text-center p-2 text-light'>
                        Update Product
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
                                    value={data.name}
                                    onChange={getInputData}
                                    className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`}
                                />
                                {show && errorMessage.name && <p className='text-danger'>{errorMessage.name}</p>}
                            </div>

                            <div className='col-md-3 mb-3'>
                                <label>Maincategory*</label>
                                <select name='maincategory' value={data.maincategory} onChange={getInputData} className='form-select border-primary'>
                                    {MaincategoryStateData.filter(x => x.status).map(item =>
                                        <option key={item.id}>{item.name}</option>
                                    )}
                                </select>
                            </div>

                            <div className='col-md-3 mb-3'>
                                <label>Subcategory*</label>
                                <select name='subcategory' value={data.subcategory} onChange={getInputData} className='form-select border-primary'>
                                    {SubcategoryStateData.filter(x => x.status).map(item =>
                                        <option key={item.id}>{item.name}</option>
                                    )}
                                </select>
                            </div>

                            <div className='col-md-3 mb-3'>
                                <label>Brand*</label>
                                <select name='brand' value={data.brand} onChange={getInputData} className='form-select border-primary'>
                                    {BrandStateData.filter(x => x.status).map(item =>
                                        <option key={item.id}>{item.name}</option>
                                    )}
                                </select>
                            </div>

                            <div className='col-md-3 mb-3'>
                                <label>Stock*</label>
                                <select name='stock' value={data.stock} onChange={getInputData} className='form-select border-primary'>
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
                                <input type='number' value={data.basePrice} name='basePrice' onChange={getInputData}
                                    className={`form-control ${show && errorMessage.basePrice ? 'border-danger' : 'border-primary'}`} />
                            </div>

                            <div className='col-lg-6 mb-3'>
                                <label>Discount*</label>
                                <input type='number' value={data.discount} name='discount' onChange={getInputData}
                                    className={`form-control ${show && errorMessage.discount ? 'border-danger' : 'border-primary'}`} />
                            </div>

                            <div className='col-12 mb-3'>
                                <label>Description*</label>
                                <div ref={refdiv} className='border border-primary'></div>
                            </div>

                            <div className='col-lg-6 mb-3'>
                                <label>Stock Quantity*</label>
                                <input type='number' value={data.stockQuantity} name='stockQuantity' onChange={getInputData}
                                    className={`form-control ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-primary'}`} />
                            </div>

                            <div className='col-lg-6 mb-3'>
                                <label>Pic*</label>
                                <input type='file' name='pic' multiple onChange={getInputData}
                                    className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />
                                {show && errorMessage.pic && errorMessage.pic.split(".").map((err, i) =>
                                    <p key={i} className='text-danger'>{err}</p>
                                )}
                            </div>

                            <div className='col-lg-6 mb-3'>
                                <label>Old Pic(Click On Image To Remove)</label>
                                <div>
                                    {
                                        data.pic?.map((item, index) => {
                                            return <img key={index}
                                                onClick={() => {
                                                    data.pic.splice(index, 1)
                                                    setFlag(!flag)
                                                }}
                                                src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item}`} height={70} width={70} className='m-1' />
                                        })
                                    }
                                </div>
                            </div>

                            <div className='col-lg-6 mb-3'>
                                <label>Status*</label>
                                <select name='status' value={data.status ? "1" : "0"} onChange={getInputData} className='form-select border-primary'>
                                    <option value='1'>Active</option>
                                    <option value='0'>Inactive</option>
                                </select>
                            </div>

                            <div className='col-12 mb-3'>
                                <button type='submit' className='btn btn-primary w-100'>Update</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
