import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import axios from 'axios'
import { useFormik } from "formik"
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import UMCReducer from '../../redux/umcReducer';

function LoginPage() {
    const [passwordType, setPasswordType] = useState(false)

    const UMCState = useSelector((state) => state)

    const dispatch = useDispatch(UMCReducer)

    const showOrHidePassword = (e) => {
        setPasswordType(e.target.checked)
    }

    const grabUserDetails = () => {
        axios.get(`${process.env.REACT_APP_API_DOMAIN}/admin/view`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                dispatch({
                    type: "populate_user_details",
                    payload: response.data.result

                })
            })
            .catch(error => {
                // console.log(error)
            })
    }

    const formik = useFormik({

        initialValues: {
            usernameOrEmailOrPhone: "",
            password: "",
        },

        onSubmit: values => {
            if (values.usernameOrEmailOrPhone && values.password) {
                axios.post(`${process.env.REACT_APP_API_DOMAIN}/admin/login`, values)
                    .then(function (response) {
                        const decode = jwt_decode(response.data.token)
                        localStorage.setItem('token', response.data.token);
                        dispatch({
                            type: "login_action",
                            payload: decode
                        })
                        grabUserDetails()
                    })
                    .catch(function (error) {
                        // console.log(error);
                        alert(error.response.data.msg)
                    });
            } else {
                alert("Fill Up All The Field Correctly. Double Check Before Submit, please.")
            }
        },

    });
    return (
        UMCState.auth.username ? (
            <Redirect to="/" />
        ) : (
                <div className="flex flex-col items-center justify-center h-screen bg-gray-600 text-gray-700">
                    <h1 className="text-4xl text-white">Log In Here</h1>
                    <form className="flex flex-col bg-white rounded shadow-lg p-12 mt-12" onSubmit={formik.handleSubmit}>
                        <label className="font-semibold text-xs" htmlFor="usernameField">Username or Email or Phone</label>
                        <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" required type="text" name="usernameOrEmailOrPhone" onChange={formik.handleChange} value={formik.values.usernameOrEmailOrPhone} />
                        <label className="font-semibold text-xs mt-3" htmlFor="passwordField">Password</label>
                        <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" required type={passwordType == true ? "text" : "password"} name="password" onChange={formik.handleChange} value={formik.values.password} />
                        <label className="inline-flex items-center mt-3">
                            <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" onChange={(e) => showOrHidePassword(e)} /><span className="ml-2 text-gray-700">Show Password</span>
                        </label>
                        <input type="submit" className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700" value="Login" />
                        <div className="flex mt-6 justify-center text-xs">
                            <Link to="/forgot" className="text-blue-400 hover:text-blue-500" href="#">Forgot Password</Link>
                            <span className="mx-2 text-gray-300">/</span>
                            <Link to="/signup" className="text-blue-400 hover:text-blue-500" href="#">Sign Up</Link>
                        </div>
                    </form>

                </div>)
    )
}

export default LoginPage
