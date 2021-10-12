import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import UMCReducer from '../../redux/umcReducer';

function PasswordChange() {
    const history = useHistory();

    const [passwordType, setPasswordType] = useState(false)
    const { username, randString } = useParams();
    const UMCState = useSelector((state) => state)

    const dispatch = useDispatch(UMCReducer)

    const showOrHidePassword = (e) => {
        setPasswordType(e.target.checked)
    }
    const formik = useFormik({

        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },

        onSubmit: values => {
            if (values.newPassword && values.oldPassword && values.confirmPassword && (values.newPassword === values.confirmPassword)) {
                axios.post(`${process.env.REACT_APP_API_DOMAIN}/admin/changepass`, values, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                    .then(function (response) {
                        alert(response.data.msg)
                        // dispatch({
                        //     type: "logout_action"
                        // });
                        // history.push("/login")
                    })
                    .catch(function (error) {
                        // console.log(error);
                        alert(error.response.data.msg)
                    });
            }
            else {
                alert("Password Didn't Matched. And Ensure You Filled Up All Field")
            }
        },

    });

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div className="container mx-auto px-6 py-8">
                    <h3 className="text-gray-700 text-3xl font-medium">Change Password</h3>
                    <form className="px-4 py-8 mt-4 lg:px-0 rounded flex flex-col justify-center items-center bg-white" onSubmit={formik.handleSubmit}>
                        <label className="font-semibold text-xs" htmlFor="usernameField">Old Password</label>
                        <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" required type={passwordType == true ? "text" : "password"} name="oldPassword" onChange={formik.handleChange} value={formik.values.oldPassword} />
                        <label className="font-semibold text-xs" htmlFor="usernameField">New Password</label>
                        <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" required type={passwordType == true ? "text" : "password"} name="newPassword" onChange={formik.handleChange} value={formik.values.newPassword} />
                        <label className="font-semibold text-xs mt-3" htmlFor="passwordField">Confirm Password</label>
                        <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" required type={passwordType == true ? "text" : "password"} name="confirmPassword" onChange={formik.handleChange} value={formik.values.confirmPassword} />
                        <label className="inline-flex items-center mt-3">
                            <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" onChange={(e) => showOrHidePassword(e)} /><span className="ml-2 text-gray-700">Show Password</span>
                        </label>
                        <input type="submit" className={`flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700`} value="Login" />
                        <div className="flex mt-6 justify-center text-xs">
                            <Link to="/forgot" className="text-blue-400 hover:text-blue-500" href="#">Forgot Password</Link>
                            <span className="mx-2 text-gray-300">/</span>
                            <Link to="/signup" className="text-blue-400 hover:text-blue-500" href="#">Sign Up</Link>
                        </div>
                    </form>

                </div>
            </main>
        </div>
    )
}

export default PasswordChange
