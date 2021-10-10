import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

function PasswordForgot() {
    const [forgotEmail, setForgotEmail] = useState("")
    const history = useHistory();

    const forgotEmailFunc = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_DOMAIN}/admin/forgot`, { email: forgotEmail })
            .then(response => {
                console.log(response)
                alert(response.data.msg)
                history.push("/")
            })
            .catch(err => {
                console.log(err)
                alert(err.response.data.msg)
            })
    }

    return (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-600 text-gray-700">
            <div className="text-center px-4">
                <h1 className="text-2xl text-white">Forgot your password ?</h1>
                <p className="text-md mt-4 text-gray-300">Just enter your email address below and we'll send you a link to reset your password!</p>
            </div>
            <form className="flex flex-col bg-white rounded shadow-lg p-12 mt-12" onSubmit={forgotEmailFunc}>
                <label className="font-semibold text-xs" htmlFor="usernameField">Email</label>
                <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="email" name="email" required value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
                <input type="submit" className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm cursor-pointer text-blue-100 hover:bg-blue-700" value="Send Reset Link" />
                <p className="text-sm text-center text-gray-400 mt-4">
                    Don't have an account yet?
          <Link to="/signup" className="font-semibold ml-2 text-indigo-500 focus:text-indigo-600 focus:outline-none focus:underline">Sign up</Link>.
        </p>
            </form>

        </div>
    )
}

export default PasswordForgot
