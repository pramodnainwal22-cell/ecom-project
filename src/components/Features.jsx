import React, { useEffect } from 'react'
import { getFeature } from '../../Redux/ActionCreators/FeatureActionCreators'
import { useDispatch, useSelector } from 'react-redux'

export default function Features() {
    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => dispatch(getFeature()))()
    }, [FeatureStateData.length])
    
    return (
        <div className="container-fluid py-5">
            <div className="container">
                <div className="text-center mx-auto mb-5">
                    <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Features</h5>
                    <h1>Our Features-Powerful Features Designed to Make Your Shopping Experience Easy, Secure, and Enjoyable</h1>
                    <p> We offers a range of smart and customer-focused features to ensure smooth and hassle-free online shopping. Our platform provides fast product search, easy navigation, secure payment gateways, and real-time order tracking. With responsive customer support, quick checkout, personalized recommendations, and reliable delivery services, we focus on giving you the best shopping experience every time. We continuously upgrade our system to meet your needs and deliver quality with convenience.</p>
                </div>
                <div className="row g-5">
                    {
                        FeatureStateData.filter(x => x.status).map(item => {
                            return <div className="col-lg-4 col-md-6" key={item.id}>
                                <div
                                    className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                                    <div className="service-icon mb-4">
                                        <span className='text-light fs-1' dangerouslySetInnerHTML={{__html: item.icon}} />
                                    </div>
                                    <h4 className="mb-3">{item.name}</h4>
                                    <p className="m-0">{item.shortDescription}</p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>


    )
}
