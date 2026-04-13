import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

import "swiper/css"
import SingleProduct from './SingleProduct'

export default function ProductSliders({ maincategory, data }) {
  let sliderOptions = {
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
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    modules: [Autoplay],
  }

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
          <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">{maincategory !== "Related Products" ? `${maincategory} Products` : `Our Other ${maincategory}`}</h5>
          {maincategory === "Related Products" ? null : <h1>Checkout Our Awesome Products for {maincategory}</h1>}
        </div>

        <Swiper {...sliderOptions}>
          <div className='price-carousel position-relative' style={{ padding: "0 45px 45px 45px" }}>
            {
              data.map(item => {
                return <SwiperSlide key={item.id}>
                  <SingleProduct item={item} />
                </SwiperSlide>
              })
            }
          </div>

        </Swiper>
      </div>
    </div>
  )
}
