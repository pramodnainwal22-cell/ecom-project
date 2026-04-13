import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ShopPage from './pages/ShopPage'
import FeaturesPage from './pages/FeaturesPage'
import TestimonialsPage from './pages/TestimonialsPage'
import FaqPage from './pages/FaqPage'
import ContactUsPage from './pages/ContactUsPage'

import AdminHomepage from './pages/Admin/AdminHomepage'

// Maincategory imports
import AdminMaincategoryPage from './pages/Admin/Maincategory/AdminMaincategoryPage'
import AdminMaincategoryCreatePage from './pages/Admin/Maincategory/AdminMaincategoryCreatePage'
import AdminMaincategoryUpdatePage from './pages/Admin/Maincategory/AdminMaincategoryUpdatePage'

// Subcategory imports
import AdminSubcategoryPage from './pages/Admin/Subcategory/AdminSubcategoryPage'
import AdminSubcategoryCreatePage from './pages/Admin/Subcategory/AdminSubcategoryCreatePage'
import AdminSubcategoryUpdatePage from './pages/Admin/Subcategory/AdminSubcategoryUpdatePage'

//brand imports
import AdminBrandPage from './pages/Admin/Brand/AdminBrandPage'
import AdminBrandCreatePage from './pages/Admin/Brand/AdminBrandCreatePage'
import AdminBrandUpdatePage from './pages/Admin/Brand/AdminBrandUpdatePage'


// feature import
import AdminFeaturePage from './pages/Admin/Feature/AdminFeaturePage'
import AdminFeatureCreatePage from './pages/Admin/Feature/AdminFeatureCreatePage'
import AdminFeatureUpdatePage from './pages/Admin/Feature/AdminFeatureUpdatePage'

//faq import

import AdminFaqPage from './pages/Admin/Faq/AdminFaqPage'
import AdminFaqCreatePage from './pages/Admin/Faq/AdminFaqCreatePage'
import AdminFaqUpdatePage from './pages/Admin/Faq/AdminFaqUpdatePage'

//product import

import AdminProductPage from './pages/Admin/Product/AdminProductPage'
import AdminProductCreatePage from './pages/Admin/Product/AdminProductCreatePage'
import AdminProductUpdatePage from './pages/Admin/Product/AdminProductUpdatePage'

//setting import

import AdminSettingPage from './pages/Admin/Setting/AdminSettingPage'
import PrivacyPolicyPage from './pages/policies/PrivacyPolicyPage'
import RefundPolicyPage from './pages/policies/RefundPolicyPage'
import TermsConditionsPage from './pages/policies/TermsConditionsPage'
import ProductPage from './pages/ProductPage'
import ErrorPage from './pages/ErrorPage'
import SignupPage from './pages/User/SignupPage'
import LoginPage from './pages/User/LoginPage'
import ProfilePage from './pages/User/ProfilePage'
import CheckoutPage from './pages/User/CheckoutPage'
import CartPage from './pages/User/CartPage'
import OrderConfirmationPage from './pages/User/OrderConfirmationPage'
import AdminNewsletterPage from './pages/Admin/Newsletter/AdminNewsletterPage'
import AdminContactUsPage from './pages/Admin/ContactUs/AdminContactUsPage'
import AdminContactUsShowPage from './pages/Admin/ContactUs/AdminContactUsShowPage'
import AdminCheckoutPage from './pages/Admin/Checkout/AdminCheckoutPage'
import AdminCheckoutShowPage from './pages/Admin/Checkout/AdminCheckoutShowPage'
import AdminUserPage from './pages/Admin/User/AdminUserPage'
import AdminUserCreatePage from './pages/Admin/User/AdminUserCreatePage'
import AdminUserUpdatePage from './pages/Admin/User/AdminUserUpdatePage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/Testimonials" element={<TestimonialsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />


        <Route path="/admin" element={<AdminHomepage />} />

        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/tc" element={<TermsConditionsPage />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {
          localStorage.getItem("login") ?
            <>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            </> : null
        }

        {
          localStorage.getItem("login") && localStorage.getItem("role") !== "Buyer" ?
            <>
              <Route path="/admin/maincategory" element={<AdminMaincategoryPage />} />
              <Route path="/admin/maincategory/create" element={<AdminMaincategoryCreatePage />} />
              <Route path="/admin/maincategory/update/:id" element={<AdminMaincategoryUpdatePage />} />

              <Route path="/admin/subcategory" element={<AdminSubcategoryPage />} />
              <Route path="/admin/subcategory/create" element={<AdminSubcategoryCreatePage />} />
              <Route path="/admin/subcategory/update/:id" element={<AdminSubcategoryUpdatePage />} />


              <Route path="/admin/brand" element={<AdminBrandPage />} />
              <Route path="/admin/brand/create" element={<AdminBrandCreatePage />} />
              <Route path="/admin/brand/update/:id" element={<AdminBrandUpdatePage />} />



              <Route path="/admin/feature" element={<AdminFeaturePage />} />
              <Route path="/admin/feature/create" element={<AdminFeatureCreatePage />} />
              <Route path="/admin/feature/update/:id" element={<AdminFeatureUpdatePage />} />


              <Route path="/admin/faq" element={<AdminFaqPage />} />
              <Route path="/admin/faq/create" element={<AdminFaqCreatePage />} />
              <Route path="/admin/faq/update/:id" element={<AdminFaqUpdatePage />} />


              <Route path="/admin/product" element={<AdminProductPage />} />
              <Route path="/admin/product/create" element={<AdminProductCreatePage />} />
              <Route path="/admin/product/update/:id" element={<AdminProductUpdatePage />} />


              <Route path="/admin/setting" element={<AdminSettingPage />} />

              <Route path="/admin/newsletter" element={< AdminNewsletterPage />} />

              <Route path="/admin/contactus" element={< AdminContactUsPage />} />
              <Route path="/admin/contactus/show/:id" element={< AdminContactUsShowPage />} />

              <Route path="/admin/checkout" element={< AdminCheckoutPage />} />
              <Route path="/admin/checkout/show/:id" element={< AdminCheckoutShowPage />} />

              {
                localStorage.getItem("role") === "Super Admin" ?
                  <>
                    <Route path="/admin/user" element={<AdminUserPage />} />
                    <Route path="/admin/user/create" element={<AdminUserCreatePage />} />
                    <Route path="/admin/user/update/:id" element={<AdminUserUpdatePage />} />
                  </> : null
              }
            </> : null
        }

        <Route path="/*" element={<ErrorPage />} />

      </Routes>

      <Footer />
    </BrowserRouter>
  )
}
