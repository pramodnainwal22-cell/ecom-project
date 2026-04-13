import React, { useEffect, useState } from 'react'
import FormValidator from '../../Validators/FormValidator'

import { ToastContainer, toast } from 'react-toastify'

let addressDataOptions = {
  name: "",
  email: "",
  phone: "",
  address: "",
  pin: "",
  city: "",
  state: "",
}
let errorMessageOptions = {
  name: "Name Feild is Mendatory",
  email: "Email Feild is Mendatory",
  phone: "Phone Feild is Mendatory",
  address: "Address Feild is Mendatory",
  pin: "Pin Feild is Mendatory",
  city: "City Feild is Mendatory",
  state: "State Feild is Mendatory",
}

export default function Address() {
  let [addressData, setAddressData] = useState(addressDataOptions)
  let [errorMessage, setErrorMessage] = useState(errorMessageOptions)
  let [show, setShow] = useState(false)

  let [data, setData] = useState({})
  let [option, setOption] = useState("Create")

  let [showModal, setShowModal] = useState(false)
  let [flag, setFlag] = useState(false)

  function getInputData(e) {
    let { name, value } = e.target
    setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
    setAddressData({ ...addressData, [name]: value })

  }

  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      if (option === "Create")
        data.address = data.address ? data.address.concat([addressData]) : [addressData]
      else
        data.address[addressData.index] = { ...addressData }

      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
        method: 'PUT',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ ...data })
      })
      response = await response.json()
      toast("Address Record Has Been Updated!!!")
      setShowModal(false)
    }

    setAddressData(addressDataOptions)
    setErrorMessage(errorMessageOptions)
  }

  function createAddress() {
    setShowModal(true)
    setAddressData(addressDataOptions)
    setErrorMessage(errorMessageOptions)
    setShow(false)
    setOption("Create")
  }

  function updateAddress(index) {
    setShowModal(true)
    setAddressData({ ...data.address[index], index: index })
    setErrorMessage(addressDataOptions)
    setShow(false)
    setOption("Update")
  }

  async function deleteRecord(idx) {
    if (window.confirm("Are You Sure To Delete That Record :)")) {
      data.address = data.address.filter((x, index) => idx !== index)
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
        method: 'PUT',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ ...data })
      })
      response = await response.json()
      toast("Address Record Has Been Deleted!!!")
      setFlag(!flag)
    }
  }

  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      setData({ ...response })
    })()
  }, [])
  return (
    <>
      <div className='mb-5'>
        <button className='btn btn-primary float-end' onClick={createAddress}>Add New Address</button>
      </div>
      <div className='mt-5'>
        {data?.address?.map((item, index) => {
          return <div className="card p-3 my-3" key={index}>
            <p className='text-dark'>{item.name}</p>
            <p className='text-dark'>{item.phone},{item.email}</p>
            <p className='text-dark'>{item.address}</p>
            <p className='text-dark'>{item.pin}, {item.city}, {item.state}</p>

            <div className="btn-group position-absolute end-0">
              <button className='btn btn-primary' onClick={() => updateAddress(index)}>Edit</button>
              <button className='btn btn-danger' onClick={() => deleteRecord(index)}>Delete</button>
            </div>
          </div>
        })}
      </div>

      <div className={`modal fade ${showModal ? 'show d-block' : 'd-none'}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" style={{ minWidth: "70vw" }}>
          <form onSubmit={postData}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{option} Address</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row">

                  <div className="col-lg-4 col-12 mb-3">
                    <label>Name*</label>
                    <input type="text" name="name" onChange={getInputData} value={addressData.name} className={`form-control ${show && errorMessage.name ?
                      'border-danger' : 'border-primary'}`} placeholder='Full Name' />
                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                  </div>

                  <div className="col-lg-4 col-12 mb-3">
                    <label>Email Id*</label>
                    <input type="text" name="email" onChange={getInputData} value={addressData.email} className={`form-control ${show && errorMessage.email ?
                      'border-danger' : 'border-primary'}`} placeholder='Email Address' />
                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                  </div>

                  <div className="col-lg-4 col-12 mb-3">
                    <label>Phone</label>
                    <input type="text" name="phone" onChange={getInputData} value={addressData.phone} className={`form-control ${show && errorMessage.phone ?
                      'border-danger' : 'border-primary'}`} placeholder='Phone Number' />
                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                  </div>

                  <div className="col-12 mb-3">
                    <label>Address*</label>
                    <textarea name="address" onChange={getInputData} value={addressData.address} className={`form-control ${show && errorMessage.address ?
                      'border-danger' : 'border-primary'}`} placeholder='Address' rows={2}></textarea>
                    {show && errorMessage.address ? <p className='text-danger'>{errorMessage.address}</p> : null}
                  </div>

                  <div className="col-lg-4 col-12 mb-3">
                    <label>Pin Code*</label>
                    <input type="text" name="pin" onChange={getInputData} value={addressData.pin} className={`form-control ${show && errorMessage.pin ?
                      'border-danger' : 'border-primary'}`} placeholder='Pincode' />
                    {show && errorMessage.pin ? <p className='text-danger'>{errorMessage.pin}</p> : null}
                  </div>

                  <div className="col-lg-4 col-12 mb-3">
                    <label>City Name*</label>
                    <input type="text" name="city" onChange={getInputData} value={addressData.city} className={`form-control ${show && errorMessage.pin ?
                      'border-danger' : 'border-primary'}`} placeholder='City Name' />
                    {show && errorMessage.pin ? <p className='text-danger'>{errorMessage.pin}</p> : null}
                  </div>

                  <div className="col-lg-4 col-12 mb-3">
                    <label>State Name*</label>
                    <input type="text" name="state" onChange={getInputData} value={addressData.state} className={`form-control ${show && errorMessage.state ?
                      'border-danger' : 'border-primary'}`} placeholder='State Name' />
                    {show && errorMessage.state ? <p className='text-danger'>{errorMessage.state}</p> : null}
                  </div>

                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">{option}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
