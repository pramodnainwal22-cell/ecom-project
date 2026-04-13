import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import 'swiper/css/pagination';

import { getTestimonial } from "../../Redux/ActionCreators/TestimonialActionCreators"
import { Link } from 'react-router-dom';

export default function Testimonial({ pid }) {
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()
    const sliderOptions = {
        breakpoints: {
            640: {
                slidesPerView: 1,

                spaceBetween: 0,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
        loop: true,
        modules: [Autoplay, Pagination],
        slidesPerView: 3,
        pagination: {
            clickable: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    }

    function getStar(star) {
        if (star === 5)
            return <>
                <i className='bi bi-star-fill text-warning'></i>
                <i className='bi bi-star-fill text-warning'></i>
                <i className='bi bi-star-fill text-warning'></i>
                <i className='bi bi-star-fill text-warning'></i>
                <i className='bi bi-star-fill text-warning'></i>
            </>
        else if (star === 4)
            return <>
                <i className='bi bi-star-fill text-warning'></i>
                <i className='bi bi-star-fill text-warning'></i>
                <i className='bi bi-star-fill text-warning'></i>
                <i className='bi bi-star-fill text-warning'></i>
                <i className='bi bi-star text-warning'></i>
            </>
        else if (star === 3)
            return <>
                <i className='bi bi-star-fill text-warning'></i>
                <i className='bi bi-star-fill text-warning'></i>
                <i className='bi bi-star-fill text-warning'></i>
                <i className='bi bi-star text-warning'></i>
                <i className='bi bi-star text-warning'></i>
            </>
        else if (star === 2)
            return <>
                <i className='bi bi-star-fill text-warning'></i>
                <i className='bi bi-star-fill text-warning'></i>
                <i className='bi bi-star text-warning'></i>
                <i className='bi bi-star text-warning'></i>
                <i className='bi bi-star text-warning'></i>
            </>
        else
            return <>
                <i className='bi bi-star-fill text-warning'></i>
                <i className='bi bi-star text-warning'></i>
                <i className='bi bi-star text-warning'></i>
                <i className='bi bi-star text-warning'></i>
                <i className='bi bi-star text-warning'></i>
            </>
    }

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
        })()
    }, [TestimonialStateData.length])

    return (
        <div className="container-fluid py-5">
            <div className="container">
                {pid === undefined ?
                    <div className="text-center mx-auto mb-5">
                        <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Reviews</h5>
                        <h1>Our Happy Customers</h1>
                        <p> We are committed to providing a smooth and reliable online shopping experience. The platform offers a wide range of quality products, user-friendly navigation, and secure transactions. With a focus on customer satisfaction, ApniShop continues to build trust by delivering value, convenience, and dependable service to every visitor.</p>
                    </div> : null}
                <div className="row justify-content-center">
                    <div className="col-12">
                        <Swiper {...sliderOptions}>
                            {TestimonialStateData.filter(x => pid ? x.product === pid : true).map(x => {
                                return <SwiperSlide key={x.id}>
                                    <div className="testimonial-item text-center">
                                        <div className="position-relative mb-5">
                                            <Link className='fs-5' to={`/product/${x.product}`}>{x.pname}</Link>
                                            <div className='text-center'>
                                                {getStar(x.star)}
                                            </div>

                                        </div>
                                        <p className='testimonial-message'>{x.message}</p>
                                        <hr className="w-25 mx-auto" />
                                        <h5>{x.userName}</h5>
                                    </div>
                                </SwiperSlide>
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}
