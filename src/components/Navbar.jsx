import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getSetting } from '../../Redux/ActionCreators/SettingActionCreators'

export default function Navbar() {
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

  let SettingStateData = useSelector(state => state.SettingStateData)
  let dispatch = useDispatch()

  let navigate = useNavigate()
  function logOut() {
    localStorage.clear()
    navigate("/login")
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

  return (
    <>
      <div className="container-fluid py-2 border-bottom">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-6 text-center text-lg-start mb-2 mb-lg-0">
              <div className="d-inline-flex ">
                <Link to={settingData.map1} target="_blank" className="text-decoration-none text-primary pe-3">
                  <i className="bi bi-geo-alt me-2"></i>
                  <span className="d-none d-xl-inline-block">{settingData.address}</span>
                </Link>

                <Link to={`mailto:${settingData.email}`} className="text-decoration-none text-primary pe-3">
                  <i className="bi bi-envelope me-2"></i>
                  <span className="d-none d-xl-inline-block">{settingData.email}</span>
                </Link>

                <Link to={`tel:${settingData.phone}`} className="text-decoration-none text-primary pe-3">
                  <i className="bi bi-telephone me-2"></i>
                  <span className="d-none d-xl-inline-block">{settingData.phone}</span>
                </Link>

                <Link to={`https://wa.me/${settingData.whatsapp}`} target="_blank" className="text-decoration-none text-primary pe-3">
                  <i className="bi bi-whatsapp me-2"></i>
                  <span className="d-none d-xl-inline-block">{settingData.whatsapp}</span>
                </Link>

              </div>
            </div>

            <div className="col-xl-3 col-6 text-center text-lg-end">
              <div className="d-inline-flex align-items-center">
                <Link to={settingData.facebook} target="_blank" className="text-primary px-2">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link to={settingData.twitter} target="_blank" className="text-primary px-2">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link to={settingData.linkedin} target="_blank" className="text-primary px-2">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
                <Link to={settingData.instagram} target="_blank" className="text-primary px-2">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link to={settingData.youtube} target="_blank" className="text-primary px-2">
                  <i className="fab fa-youtube"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid sticky-top bg-white shadow-sm">
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">

            <NavLink to="/" className="navbar-brand">
              <h1 className="m-0 text-uppercase text-primary">
                <i className="bi bi-bag-check me-2"></i>
                {settingData.siteName}
              </h1>
            </NavLink>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav ms-auto py-0">
                <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/about" className="nav-item nav-link">About</NavLink>
                <NavLink to="/shop" className="nav-item nav-link">Shop</NavLink>
                <NavLink to="/features" className="nav-item nav-link">Features</NavLink>
                <NavLink to="/faq" className="nav-item nav-link">Faq</NavLink>
                <NavLink to="/testimonials" className="nav-item nav-link">Testimonials</NavLink>
                <NavLink to="/contactus" className="nav-item nav-link">ContactUs</NavLink>

                {localStorage.getItem("login") ?
                  <div className="nav-item dropdown">
                    <a href='#' className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{localStorage.getItem("name")}</a>
                    <div className="dropdown-menu m-0">
                      <Link to="/profile" className="dropdown-item">Profile</Link>
                      {localStorage.getItem("role") !== "Buyer" ? <Link to="/admin" className="dropdown-item">Admin Dashboard</Link> : null}
                      <Link to="/profile?option=orders" className="dropdown-item">Orders</Link>
                      <Link to="/profile?option=wishlist" className="dropdown-item">Wishlist</Link>
                      <Link to="/cart" className="dropdown-item">Cart</Link>
                      <Link to="/checkout" className="dropdown-item">Checkout</Link>
                      <button onClick={logOut} className='dropdown-item'>Logout</button>
                    </div>
                  </div> :
                  <NavLink to="/login" className="nav-item nav-link">Login</NavLink>
                }
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
