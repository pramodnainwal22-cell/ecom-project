import React, { useEffect, useState } from 'react'

import Cart from '../../components/User/Cart'

export default function CheckoutPage() {
  let [selected, setSelected] = useState({
    deliveryAddress: {},
    paymentMode: "COD"
  })
  let [address, setAddress] = useState([])

  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      if (response.address) {
        setAddress(response.address)
        setSelected({ ...selected, deliveryAddress: response.address[0] })
      }
    })()
  }, [])
  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col-lg-6">
            <h5 className='bg-primary text-center text-light p-2'>Delivery Address</h5>
            {address?.map(((item, index) => {
              return <div className="card p-3" key={index} onClick={() => setSelected({ ...selected, deliveryAddress: address[index] })}>
                <p className='text-dark'>{item.name}</p>
                <p className='text-dark'>{item.phone},{item.email}</p>
                <p className='text-dark'>{item.address}</p>
                <p className='text-dark'>{item.pin}, {item.city}, {item.state}</p>

                <div className="btn-group position-absolute end-0">
                  {selected.deliveryAddress?.address === item.address ? <i className='bi bi-check fs-3 px-1'></i> : null}
                </div>
              </div>
            }))}
            <h5 className='bg-primary text-center text-light p-2'>Payment Mode</h5>
            <div className="card p-2 text-dark" onClick={() => setSelected({ ...selected, paymentMode: "COD" })}>
              COD
              <div className="btn-group position-absolute end-0 top-0">
                {selected.paymentMode === "COD" ? <i className='bi bi-check fs-3'></i> : null}
              </div>
            </div>
            <div className="card p-2 text-dark" onClick={() => setSelected({ ...selected, paymentMode: "Net Banking/Card/UPI" })}>
              Net Banking/Card/UPI
              <div className="btn-group position-absolute end-0 top-0" >
                {selected.paymentMode === "Net Banking/Card/UPI" ? <i className='bi bi-check fs-3'></i> : null}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <h5 className='bg-primary text-center text-light p-2'>Items In Cart</h5>
            <Cart selected={selected} title="Checkout" />
          </div>
        </div>
      </div >
    </>
  )
}
