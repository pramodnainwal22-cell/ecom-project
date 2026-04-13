import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSetting } from '../../../Redux/ActionCreators/SettingActionCreators'

export default function TermsConditionsPage() {
    let [settingData, setSettingData] = useState({
        termsConditions: "",
    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = SettingStateData[0]
                setSettingData({
                    termsConditions: item.termsConditions ? item.termsConditions : settingData.termsConditions,
                    
                })
            }
        })()
    }, [SettingStateData.length])
    return (
        <div className='container my-5'>
            <div dangerouslySetInnerHTML={{__html:settingData.termsConditions}}/>
        </div>
    )
}
