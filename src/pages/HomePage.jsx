import React, { useState, useEffect } from 'react'
import About from '../components/About'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"

import Features from '../components/Features'
import ProductsSliders from '../components/ProductSliders'
import Testimonial from '../components/Testimonial'
import Products from '../components/Products'
import { data, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getSetting } from '../../Redux/ActionCreators/SettingActionCreators'
import { getProduct } from '../../Redux/ActionCreators/ProductActionCreators'
import { getMaincategory } from '../../Redux/ActionCreators/MaincategoryActionCreators'

export default function HomePage() {
  let [settingData, setSettingData] = useState({
    siteName: import.meta.env.VITE_APP_SITE_NAME,
  })

  let SettingStateData = useSelector(state => state.SettingStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)
  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let dispatch = useDispatch()

  useEffect(() => {
    (() => {
      dispatch(getSetting())
      if (SettingStateData.length) {
        let item = SettingStateData[0]
        setSettingData({
          siteName: item.siteName ? item.siteName : settingData.siteName,
        })
      }
    })()
  }, [SettingStateData.length])

  useEffect(() => {
    (() => dispatch(getProduct()))()
  }, [ProductStateData.length])

  useEffect(() => {
    (() => dispatch(getMaincategory()))()
  }, [MaincategoryStateData.length])

  return (
    <>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        <SwiperSlide>
          <div className="container-fluid position-relative" style={{ height: "650px" }}>
            <img
              src="/images/girl.jpg"
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{ zIndex: -1 }}
              alt=""
            />
            <div className="row h-100 align-items-center">
              <div className="col-lg-8 text-center text-lg-start">
                <h5 className="d-inline-block text-dark text-uppercase border-bottom border-5">
                  Welcome To {settingData.siteName}
                </h5>

                <h1 className="text-dark mb-md-4">
                  “Style That Grows With Her.”
                </h1>

                <div className="pt-2">
                  <Link to='/shop?mc=Female' className='btn btn-dark rounded-pill py-md-3 px-md-5 mx-2'>
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="container-fluid position-relative" style={{ height: "650px" }}>
            <img
              src="/images/boy.jpg"
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{ objectFit: 'cover', zIndex: -1 }}
              alt=""
            />
            <div className="row h-100 align-items-center">
              <div className="col-lg-8 text-center text-lg-start">
                <h5 className="d-inline-block text-dark text-uppercase border-bottom border-5">
                  Welcome To {settingData.siteName}
                </h5>

                <h1 className="text-dark mb-md-4">
                  “Cool Clothes for Cool Kids.”
                </h1>

                <div className="pt-2">
                  <Link to='/shop?mc=Male' className='btn btn-dark rounded-pill py-md-3 px-md-5 mx-2'>
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="container-fluid position-relative" style={{ height: "650px" }}>
            <img
              src="/images/female.jpg"
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{ zIndex: -1 }}
              alt=""
            />
            <div className="row h-100 align-items-center">
              <div className="col-lg-8 text-center text-lg-start">
                <h5 className="d-inline-block text-dark text-uppercase border-bottom border-5">
                  Welcome To {settingData.siteName}
                </h5>

                <h1 className="text-dark mb-md-4">
                  “Fashion that Speaks Confidence”
                </h1>

                <div className="pt-2">
                  <Link to='/shop?mc=Male' className='btn btn-dark rounded-pill py-md-3 px-md-5 mx-2'>
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <About />
      {
        MaincategoryStateData.filter(x => x.status).map((item) => {
          let data = ProductStateData.filter(x => x.maincategory === item.name)
          if (data.length)
            return <ProductsSliders key={item.id} maincategory={item.name} data={data} />
        })
      }
      <Features />
      <Products maincategory={MaincategoryStateData.filter(x=>x.status)} data={ProductStateData.filter(x=>x.status)} />
      <Testimonial />

    </>
  )
}
