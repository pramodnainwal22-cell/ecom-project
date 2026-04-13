import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getSetting } from '../../Redux/ActionCreators/SettingActionCreators'
import { getNewsletter, createNewsletter } from '../../Redux/ActionCreators/NewsletterActionCreators'

export default function Footer() {
  let [settingData, setSettingData] = useState({
    siteName: import.meta.env.VITE_APP_SITE_NAME,
    address: import.meta.env.VITE_APP_ADDRESS,
    map1: import.meta.env.VITE_APP_MAP1,
    email: import.meta.env.VITE_APP_EMAIL,
    phone: import.meta.env.VITE_APP_PHONE,
    whatsapp: import.meta.env.VITE_APP_WHATSAPP,
    facebook: import.meta.env.VITE_APP_FACEBOOK,
    twitter: import.meta.env.VITE_APP_TWITTER,
    linkedin: import.meta.env.VITE_APP_LINKEDIN,
    instagram: import.meta.env.VITE_APP_INSTAGRAM,
    youtube: import.meta.env.VITE_APP_YOUTUBE,
  })

  let [email, setEmail] = useState("")
  let [message, setMessage] = useState("")

  let SettingStateData = useSelector(state => state.SettingStateData)
  let NewsletterStateData = useSelector(state => state.NewsletterStateData)
  let dispatch = useDispatch()

  function postData(e) {
    e.preventDefault()
    if (email === "" || email.length < 13)
      setMessage("Please Enter a Valid Email Address")
    else{
      let item = NewsletterStateData.find(x=>x.email===email)
      if(item)
        setMessage("This Email Address is Already Registered With Us")
      else{
        dispatch(createNewsletter({email:email,status:true}))
        setMessage("Thanks To Subscribe Our Newsletter Service")
        setEmail("")
      }
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getSetting())
      if (SettingStateData.length) {
        let item = SettingStateData[0]
        setSettingData({
          siteName: item.siteName ? item.siteName : settingData.siteName,
          address: item.address ? item.address : settingData.address,
          map1: item.map1 ? item.map1 : settingData.map1,
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

  useEffect(() => {
    (() => dispatch(getNewsletter()))()
  }, [NewsletterStateData.length])

  return (
    <>
      <div className="container-fluid bg-dark text-light mt-5 py-5">
        <div className="container py-5">
          <div className="row g-5">

            <div className="col-lg-4 col-md-6">
              <Link to="/" className="fs-4 d-inline-block text-light
                text-uppercase border-bottom border-5 border-secondary mb-4">
                <i className="bi bi-bag-check me-2"></i> {settingData.siteName}
              </Link>
              <p className="mb-4 text-justify">
                “Apni Shop is your trusted eCommerce destination for quality products at honest prices.
                We focus on reliability, convenience, and customer satisfaction, offering Link wide range of everyday essentials and trending items delivered straight to your doorstep with ease and confidence.”
              </p>
              <Link
                to={settingData.map1}
                target="_blank"

                className="d-block text-light mb-2"
              >
                <i className="bi bi-geo-alt-fill fs-5 text-light
                  me-3"></i>
                {settingData.address}
              </Link>
              <Link
                to={`mailto:${settingData.email}`}
                className="d-block text-light mb-2"
              >
                <i className="bi bi-envelope-fill fs-5 text-light
                  me-3"></i>
                {settingData.email}
              </Link>
              <Link
                to={`tel:${settingData.phone}`}
                className="d-block text-light mb-2"
              >
                <i className="bi bi-telephone-fill fs-5 text-light
                  me-3"></i>
                {settingData.phone}
              </Link>
              <Link
                to={`https://wa.me/${settingData.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="d-block text-light mb-2"
              >
                <i className="bi bi-whatsapp fs-5 text-light
                  me-3"></i>
                {settingData.whatsapp}
              </Link>
            </div>


            <div className="col-lg-4 col-md-6">
              <h4 className="d-inline-block text-light text-light
                text-uppercase border-bottom border-5 border-secondary mb-4">
                Popular Links
              </h4>
              <div className="d-flex flex-column">
                <Link className="text-light mb-2" to="/"><i className='fa fa-angle-right me-2'></i> Home</Link>
                <Link className="text-light mb-2" to="/about"><i className='fa fa-angle-right me-2'></i> About</Link>
                <Link className="text-light mb-2" to="/shop"><i className='fa fa-angle-right me-2'></i> Shop</Link>
                <Link className="text-light mb-2" to="/features"><i className='fa fa-angle-right me-2'></i>Features </Link>
                <Link className="text-light mb-2" to="/faq"><i className='fa fa-angle-right me-2'></i> Faq</Link>
                <Link className="text-light mb-2" to="/testimonials"><i className='fa fa-angle-right me-2'></i> Testimonials</Link>
                <Link className="text-light mb-2" to="/contactus"><i className='fa fa-angle-right me-2'></i> ContactUs</Link>
                <Link className="text-light mb-2" to="/privacy-policy"><i className='fa fa-angle-right me-2'></i> Privacy Policy</Link>
                <Link className="text-light mb-2" to="/tc"><i className='fa fa-angle-right me-2'></i> Terms and Conditions</Link>
                <Link className="text-light mb-2" to="/refund-policy"><i className='fa fa-angle-right me-2'></i> Refund Policy</Link>
                <Link className="text-light mb-2" to="/data-policy"><i className='fa fa-angle-right me-2'></i> Data Policy</Link>

              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <h4 className="d-inline-block text-light text-light
                text-uppercase border-bottom border-5 border-secondary mb-4">
                Newsletter
              </h4>
              <p className='text-justify'>“Subscribe to our newsletter to receive the latest updates, exclusive offers, and new product announcements. Stay informed and never miss exciting deals from Apni Shop.”</p>
              <form onSubmit={postData}>
                <div className="input-group">
                  <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control p-3 border-0" placeholder="Your Email Address" />
                  <button className="btn btn-primary" type='submit'>Subscribe</button>
                </div>
                {message ? <p>{message}</p> : null}
              </form>
              <h6 className=" mt-5 text-light
                         text-uppercase mt-4 mb-3">Follow Us</h6>
              <div className="d-flex mt ">
                <Link className="btn btn-lg-btn-primary text-light
                 -btn-lg-square-rounded-circle me-2" to={settingData.twitter} target='_blank'><i className="fab fa-twitter"></i></Link>
                <Link className="btn btn-lg-btn-primary text-light
                 -btn-lg-square-rounded-circle me-2" to={settingData.facebook} target='_blank'><i className="fab fa-facebook-f"></i></Link>
                <Link className="btn btn-lg-btn-primary text-light
                 -btn-lg-square-rounded-circle me-2" to={settingData.linkedin} target='_blank'><i className="fab fa-linkedin-in"></i></Link>
                <Link className="btn btn-lg-btn-primary text-light
                 -btn-lg-square-rounded-circle me-2" to={settingData.instagram} target='_blank'><i className="fab fa-instagram"></i></Link>
                <Link className="btn btn-lg-btn-primary text-light
                 -btn-lg-square-rounded-circle me-2" to={settingData.youtube} target='_blank'><i className="fab fa-youtube"></i></Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="container-fluid bg-dark text-light border-top border-secondary py-4">
        <div className="container">
          <div className="row">
            <div className="text-center">
              <p className='mb-md-0'>&copy;
                <Link className="text-light
              " href='/'>{settingData.siteName}</Link>. All Rights Reserved.
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
