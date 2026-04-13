import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { getCart, deleteCart } from '../../../Redux/ActionCreators/CartActionCreators'
import { getProduct, updateProduct } from '../../../Redux/ActionCreators/ProductActionCreators'
import { createCheckout } from '../../../Redux/ActionCreators/CheckoutActionCreators'

export default function Cart({ title, selected }) {
  let [data, setData] = useState([])
  let [subtotal, setsubtotal] = useState(0)
  let [total, setTotal] = useState(0)
  let [shipping, setShipping] = useState(0)

  let CartStateData = useSelector(state => state.CartStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)
  let dispatch = useDispatch()
  let navigate = useNavigate()

  function deleteRecord(id) {
    if (window.confirm("Are You Sure To Delete That Record :)")) {
      dispatch(deleteCart({ id: id }))
      setData(data.filter(x => x.id !== id))
    }
  }

  function updateRecord(id, option) {
    let item = data.find(x => x.id === id)
    let index = data.findIndex(x => x.id === id)
    

    if ((option === "Dec" && item.qty === 1 || option === "Inc" && item.qty === item.stockQuantity))
      return
    else if (option === "Dec") {
      item['qty'] = item['qty'] - 1
      item['total'] = item['total'] - item['price']
    }
    else {
      item['qty'] = item['qty'] + 1
      item['total'] = item['total'] + item['price']
    }
    data[index] = { ...item }
    calculate(data)
  }

  function placeOrder() {
    let item = {
      user: localStorage.getItem("userid"),
      orderStatus: "Order Has Been Placed",
      paymentMode: selected.paymentMode,
      paymentStatus: "Pending",
      deliveryAddress: selected.deliveryAddress,
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      date: new Date(),
      products: data
    }
    dispatch(createCheckout(item))

    data.forEach(x => {
      let product = ProductStateData.find(p => p.id === x.product)
      product.stockQuantity = product.stockQuantity - x.qty
      product.stock = product.stockQuantity === 0 ? false : true
      dispatch(updateProduct({ ...product }))

      dispatch(deleteCart({ id: x.id }))
    })
    navigate("/order-confirmation")
  }

  function calculate(data) {
    let sum = 0
    data.forEach(x => sum = sum + x.total)
    if (sum > 0 && sum < 1000) {
      setShipping(150)
      setTotal(sum + 150)
    }
    else {
      setShipping(0)
      setTotal(sum)
    }
    setsubtotal(sum)
  }

  useEffect(() => {
    (() => {
      dispatch(getCart())
      if (CartStateData.length) {
        let data = CartStateData.filter(x => x.user === localStorage.getItem("userid"))
        setData(data)
        calculate(data)
      }
    })()
  }, [CartStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getProduct())
    })()
  }, [ProductStateData.length])
  return (
    <>
      {data.length ?
        <>
          <div className="table-responsive">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  {title === "Cart" ? <th></th> : null}
                  <th>Name</th>
                  {title === "Cart" ? <th>Brand</th> : null}
                  <th>Color</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  {title === "Cart" ? <th></th> : null}
                </tr>
              </thead>
              <tbody>
                {data.map(item => {
                  return <tr key={item.id}>
                    {title === "Cart" ? <th>
                      <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} target='_blank' rel='noreferror'>
                        <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} height={50} width={80} alt='' />
                        <small className='d-inline-block'>({`${item.stockQuantity} Left In Stock`})</small>
                      </Link>
                    </th> : null}
                    <th>{item.name}</th>
                    {title === "Cart" ? <th>{item.brand}</th> : null}
                    <th>{item.color}</th>
                    <th>{item.size}</th>
                    <th>&#8377;{item.price}</th>
                    {title === "Cart" ? <th>
                      <div className="btn-group" style={{ width: 130 }}>
                        <button className='btn btn-primary' onClick={() => updateRecord(item.id, "Dec")}><i className='bi bi-dash'></i></button>
                        <h5 className='w-25 text-center'>{item.qty}</h5>
                        <button className='btn btn-primary' onClick={() => updateRecord(item.id, "Inc")}><i className='bi bi-plus'></i></button>
                      </div>
                    </th> : <th>{item.qty}</th>}
                    <th>&#8377;{item.total}</th>
                    {title === "Cart" ? <th><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='bi bi-trash'></i></button></th> : null}
                  </tr>
                })}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-lg-6"></div>
            <div className={`${title === "Cart" ? "col-lg-6" : "col-12"}`}>
              <table className='table'>
                <tbody>
                  <tr>
                    <th>Subtotal Amount</th>
                    <td>&#8377;{subtotal}</td>
                  </tr>
                  <tr>
                    <th>Shipping Amount</th>
                    <td>&#8377;{shipping}</td>
                  </tr>
                  <tr>
                    <th>Total Amount</th>
                    <td>&#8377;{total}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      {title === "Cart" ?
                        <Link to='/checkout' className='btn btn-primary w-100'>Proceed To Checkout</Link> :
                        <button className='btn btn-primary w-100' onClick={placeOrder}>Place Order</button>}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
        :
        <div className='card p-5 text-center'>
          <h3>OOP</h3>
          <h4>No Items In Cart</h4>
          <Link to='/shop' className='btn btn-primary w-25 m-auto'>Shop Now</Link>
        </div>}
    </>
  )
}
