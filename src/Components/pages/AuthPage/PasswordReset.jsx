import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import UMCReducer from '../../redux/umcReducer';

function PasswordReset() {
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
            newPassword: "",
            confirmPassword: "",
        },

        onSubmit: values => {
            if (values.newPassword && values.confirmPassword && (values.newPassword === values.confirmPassword)) {
                axios.post(`${process.env.REACT_APP_API_DOMAIN}/admin/reset/${username}/${randString}`, values)
                    .then(function (response) {
                        alert(response.data.msg)
                        dispatch({
                            type: "logout_action"
                        });
                        history.push("/login")
                    })
                    .catch(function (error) {
                        // console.log(error);
                        alert(error.response.data.msg)
                    });
            }
            else {
                alert("Fill Up All The Field Correctly. Double Check Before Submit, please.")
            }
        },

    });

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_DOMAIN}/admin/checkString/${username}/${randString}`)
            .then(function (response) {
                // console.log(response.data.msg)
            })
            .catch(function (error) {
                // console.log(error)
                history.push("/")
            });
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-600 text-gray-700">
            <h1 className="text-4xl text-white">Reset Password</h1>
            <form className="flex flex-col bg-white rounded shadow-lg p-12 mt-12" onSubmit={formik.handleSubmit}>
                <label className="font-semibold text-xs" htmlFor="usernameField">New Password</label>
                <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" required type={passwordType == true ? "text" : "password"} name="newPassword" onChange={formik.handleChange} value={formik.values.newPassword} />
                <label className="font-semibold text-xs mt-3" htmlFor="passwordField">Confirm Password</label>
                <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" required type={passwordType == true ? "text" : "password"} name="confirmPassword" onChange={formik.handleChange} value={formik.values.confirmPassword} />
                <label className="inline-flex items-center mt-3">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" onChange={(e) => showOrHidePassword(e)} /><span className="ml-2 text-gray-700">Show Password</span>
                </label>
                <input type="submit" className={`flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700`} value="Reset Password" />
                <div className="flex mt-6 justify-center text-xs">
                    <Link to="/forgot" className="text-blue-400 hover:text-blue-500" href="#">Forgot Password</Link>
                    <span className="mx-2 text-gray-300">/</span>
                    <Link to="/signup" className="text-blue-400 hover:text-blue-500" href="#">Sign Up</Link>
                </div>
            </form>

        </div>
    )
}

export default PasswordReset
