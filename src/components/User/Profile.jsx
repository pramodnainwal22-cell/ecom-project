import React, { useEffect, useState } from 'react'

export default function Profile({option}) {
    let [data, setData] = useState({})

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
    }, [option])
    return (
        <div>
            <table className='table table-bordered'>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{data.name}</td>
                    </tr>
                    <tr>
                        <th> User Name</th>
                        <td>{data.username}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{data.email}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>{data.phone}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
