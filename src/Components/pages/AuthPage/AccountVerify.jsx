import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

function AccountVerify() {
    const { username, randString } = useParams();
    const [message, setMessage] = useState({ status: "", text: "" })

    const forgotEmailFunc = (e) => {
        axios.post(`${process.env.REACT_APP_API_DOMAIN}/admin/verify/${username}/${randString}`)
            .then(response => {
                // console.log(response)
                setMessage({
                    status: "200",
                    text: response.data.msg,
                })
            })
            .catch(err => {
                // console.log(err)
                setMessage({
                    status: "401",
                    text: err.response.data.msg,
                })
            })
    }

    useEffect(() => {
        forgotEmailFunc()
    }, [])

    return (

        <div className="h-screen bg-gray-600 flex flex-col text-center justify-center content-center flex-wrap">
            <div className={`px-4 py-3 leading-normal ${message.status == "200" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"} rounded-lg`} role="alert">
                <p>{message.text}</p>
                {/* <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Home</button> */}
            </div>
            {/* <div className="px-4 py-3 leading-normal text-green-700 bg-green-100 rounded-lg" role="alert">
                <p className="font-bold">{message}</p>
                <p>Your Account Has Been Verified Successfully.</p>
            </div>
            <div className="px-4 py-3 leading-normal text-red-700 bg-red-100 rounded-lg" role="alert">
                <p className="font-bold">Successfully Verified</p>
                <p>Your Account Has Been Verified Successfully.</p>
            </div> */}
        </div>
    )
}

export default AccountVerify
