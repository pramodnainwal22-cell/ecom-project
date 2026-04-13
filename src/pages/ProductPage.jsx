import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import 'swiper/css/pagination';
import ProductSliders from '../components/ProductSliders';
import Testimonial from '../components/Testimonial';

import { getProduct } from '../../Redux/ActionCreators/ProductActionCreators';
import { getTestimonial } from '../../Redux/ActionCreators/TestimonialActionCreators';
import { getCart, createCart } from '../../Redux/ActionCreators/CartActionCreators';
import { getWishlist, createWishlist } from '../../Redux/ActionCreators/WishlistActionCreators';
import { useDispatch, useSelector } from 'react-redux';

export default function ProductPage() {
    let [selected, setSelected] = useState({
        color: "",
        size: "",
        qty: 1,
    })
    let { id } = useParams()
    let [data, setData] = useState({})
    let [relatedProducts, setRelatedProducts] = useState([])
    let [reviewStats, setReviewStats] = useState({
        rating: 0,
        star: [0, 0, 0, 0, 0],
        total: 0
    })

    let [show, setShow] = useState("Description")

    let ProductStateData = useSelector(state => state.ProductStateData)
    let CartStateData = useSelector(state => state.CartStateData)
    let WishlistStateData = useSelector(state => state.WishlistStateData)
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)

    let dispatch = useDispatch()
    let navigate = useNavigate()

    const sliderOptions = {
        loop: true,
        modules: [Autoplay, Pagination],
        pagination: {
            clickable: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    }

    function addToCart() {
        let item = CartStateData.find(x => x.user === localStorage.getItem("userid") && x.product === id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: id,
                color: selected.color,
                size: selected.size,
                qty: selected.qty,
                total: selected.qty * data.finalPrice,

                // Remove following lines in case of real backend
                name: data.name,
                brand: data.brand,
                stockQuantity: data.stockQuantity,
                price: data.finalPrice,
                pic: data.pic[0],
            }
            dispatch(createCart(item))
        }
        navigate("/cart")
    }

    function addToWishlist() {
        let item = WishlistStateData.find(x => x.user === localStorage.getItem("userid") && x.product === id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: id,

                // Remove following lines in case of real backend
                name: data.name,
                brand: data.brand,
                color: data.color,
                size: data.size,
                stockQuantity: data.stockQuantity,
                price: data.finalPrice,
                pic: data.pic[0],
            }
            dispatch(createWishlist(item))
        }
        navigate("/profile?option=wishlist")
    }

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find(x => x.id === id)
                if (item) {
                    setData(item)
                    setSelected({
                        ...selected,
                        color: item.color[0],
                        size: item.size[0],
                    })
                    setRelatedProducts(ProductStateData.filter(x => x.maincategory === item.maincategory))
                }
                else
                    window.history.back()
            }
        })()
    }, [ProductStateData.length, id])

    useEffect(() => {
        (() => dispatch(getCart()))()
    }, [CartStateData.length])

    useEffect(() => {
        (() => dispatch(getWishlist()))()
    }, [WishlistStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
            if (TestimonialStateData.length) {
                let reviews = TestimonialStateData.filter(x => x.product === id)
                let total = 0
                let star = [0, 0, 0, 0, 0]
                reviews.forEach(x => {
                    total += x.star
                    star[x.star - 1] += 1
                })
                setReviewStats({
                    rating: (total / reviews.length).toFixed(1),
                    star: star,
                    total: reviews.length
                })
            }
        })()
    }, [TestimonialStateData.length])

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6">
                    <Swiper {...sliderOptions}>
                        {
                            data?.pic?.map((item, index) => {
                                return <SwiperSlide key={index}>
                                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item}`} height={450} className='w-100' />
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>
                <div className="col-md-6">
                    <h5 className='bg-primary p-2 text-center text-light'>{data.name ?? ""}</h5>
                    <table className='table table-bordered'>
                        <tbody>
                            <tr>
                                <th>Maincategory</th>
                                <td>{data.maincategory}</td>
                            </tr>
                            <tr>
                                <th>Subcategory</th>
                                <td>{data.subcategory}</td>
                            </tr>
                            <tr>
                                <th>Brand</th>
                                <td>{data.brand}</td>
                            </tr>
                            <tr>
                                <th>Color</th>
                                <td>{
                                    data?.color?.map((item, index) => {
                                        return <button key={index} onClick={() => setSelected({ ...selected, color: item })} className={`btn ${selected.color === item ? 'btn-primary' : 'btn-light'}`}>{item}</button>
                                    })
                                }</td>
                            </tr>
                            <tr>
                                <th>Size</th>
                                <td>{
                                    data?.size?.map((item, index) => {
                                        return <button key={index} onClick={() => setSelected({ ...selected, size: item })} className={`btn ${selected.size === item ? 'btn-primary' : 'btn-light'}`}>{item}</button>
                                    })
                                }</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td><del>&#8377;{data.basePrice}</del>&#8377;{data.finalPrice} <sup>{data.discount}%Off</sup></td>
                            </tr>
                            <tr>
                                <th>Stock</th>
                                <td>{data.stock ? `${data.stockQuantity} Left In Stock` : `Out Of Stock`}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    {
                                        data.stock ?
                                            <div className="row w-100">
                                                <div className="col-md-4">
                                                    <div className="btn-group w-100">
                                                        <button className='btn btn-primary' onClick={() => selected.qty > 1 ? setSelected({ ...selected, qty: selected.qty - 1 }) : null}><i className='bi bi-dash'></i></button>
                                                        <h5 className='w-25 text-center'>{selected.qty}</h5>
                                                        <button className='btn btn-primary' onClick={() => selected.qty < data.stockQuantity ? setSelected({ ...selected, qty: selected.qty + 1 }) : null}><i className='bi bi-plus'></i></button>
                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="btn-group">
                                                        <button className='btn btn-primary' onClick={addToCart}><i className='bi bi-cart-check'></i> Add to Cart </button>
                                                        <button className='btn btn-primary' onClick={addToWishlist}><i className='bi bi-heart'></i> Add to Wishlist </button>
                                                    </div>
                                                </div>
                                            </div> :
                                            <button className='btn btn-primary' onClick={addToWishlist}><i className='bi bi-heart'></i> Add to Wishlist </button>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="btn-group my-3">
                <button className={`btn ${show === "Description" ? "btn-primary" : "btn-light"}`} onClick={() => setShow("Description")} >Description</button>
                <button className={`btn ${show === "Reviews" ? "btn-primary" : "btn-light"}`} onClick={() => setShow("Reviews")} >Reviews</button>
            </div>

            <div className={`${show === "Description" ? "d-block" : 'd-none'}`}>
                <div className='card p-4' dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>

            <div className={`${show === "Reviews" ? "d-block" : 'd-none'}`}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card p-2 text-center">
                            <h2>Rating</h2>
                            <h3>{reviewStats.rating}/5</h3>
                            <h5>Total Reviews : {reviewStats.total}</h5>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-3">5 Star ({reviewStats.star[4]})</div>
                            <div className="col-9">
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar"
                                        style={{ width: `${(reviewStats.star[4] / reviewStats.total) * 100}%` }}>
                                        {((reviewStats.star[4] / reviewStats.total) * 100)?.toFixed(0)}%</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">4 Star ({reviewStats.star[3]})</div>
                            <div className="col-9">
                                <div className="progress">
                                    <div className="progress-bar bg-primary" role="progressbar"
                                        style={{ width: `${(reviewStats.star[3] / reviewStats.total) * 100}%` }}>
                                        {((reviewStats.star[3] / reviewStats.total) * 100)?.toFixed(0)}%</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">3 Star ({reviewStats.star[2]})</div>
                            <div className="col-9">
                                <div className="progress">
                                    <div className="progress-bar bg-info" role="progressbar"
                                        style={{ width: `${(reviewStats.star[2] / reviewStats.total) * 100}%` }}>
                                        {((reviewStats.star[2] / reviewStats.total) * 100)?.toFixed(0)}%</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">2 Star ({reviewStats.star[1]})</div>
                            <div className="col-9">
                                <div className="progress">
                                    <div className="progress-bar bg-warning" role="progressbar"
                                        style={{ width: `${(reviewStats.star[1] / reviewStats.total) * 100}%` }}>
                                        {((reviewStats.star[1] / reviewStats.total) * 100)?.toFixed(0)}%</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">1 Star ({reviewStats.star[0]})</div>
                            <div className="col-9">
                                <div className="progress">
                                    <div className="progress-bar bg-danger" role="progressbar"
                                        style={{ width: `${(reviewStats.star[0] / reviewStats.total) * 100}%` }}>
                                        {((reviewStats.star[0] / reviewStats.total) * 100)?.toFixed(0)}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Testimonial pid={data.id} />
            </div>

            <div className="mt-3">
                <ProductSliders maincategory="Related Products" data={relatedProducts} />
            </div>
        </div>
    )
}
