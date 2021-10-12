import React from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import axios from "axios"
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { emailValidation, urlValidation } from "../../utils/ValidationUtil"

function SignUpPage() {
    const history = useHistory()
    const UMCState = useSelector((state) => state)
    const formik = useFormik({

        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            facebook: "",
            phone: "",
            fullName: "",
            bloodGroup: "",
            fatherPhone: "",
            fatherOccupation: "",
            motherPhone: "",
            motherOccupation: "",
            hscBatch: "",
            schoolName: "",
            collegeName: ""
        },

        onSubmit: values => {
            if (values.password === values.confirmPassword && values.username
                && values.email && emailValidation(values.email) && values.facebook && urlValidation(values.facebook) && values.phone
                && values.fullName && values.bloodGroup && values.fatherPhone
                && values.fatherOccupation && values.motherPhone && values.motherOccupation
                && values.hscBatch && values.schoolName && values.collegeName
            ) {
                axios.post(`${process.env.REACT_APP_API_DOMAIN}/admin/signup`, values)
                    .then(function (response) {
                        alert(response.data.msg)
                        history.push("/")
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
            <Redirect to="/login" />
        ) : (
                <div className="flex flex-col pb-8 items-center justify-center bg-gray-900 text-white" >
                    <form className="w-screen max-w-4xl px-4 lg:px-0 bg-gray-900 mt-8" onSubmit={formik.handleSubmit}>
                        <h1 className="text-4xl text-white text-center mb-8">Sign Up Here</h1>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Username
      </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="shahriar" name="username" onChange={formik.handleChange} value={formik.values.username} required />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Email
      </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="email" placeholder="myemail@email.com" name="email" onChange={formik.handleChange} value={formik.values.email} required />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
                                    Full Name
      </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Shahriar Ahmed Shovon" name="fullName" onChange={formik.handleChange} value={formik.values.fullName} required />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Password
      </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="password" placeholder="************" name="password" onChange={formik.handleChange} value={formik.values.password} required />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Confirm Password
      </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="password" placeholder="************" name="confirmPassword" onChange={formik.handleChange} value={formik.values.confirmPassword} required />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Mobile Number
      </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="017xxxxxxxxx" name="phone" onChange={formik.handleChange} value={formik.values.phone} required />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Facebook
      </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="url" placeholder="https://facebook.com/shovon.0.ahmed" name="facebook" onChange={formik.handleChange} value={formik.values.facebook} required />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Father's / Guardian Phone
      </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Your Guardian Name" name="fatherPhone" onChange={formik.handleChange} value={formik.values.fatherPhone} required />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Father's / Guardian Occupation
      </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Your Father Occupation" name="fatherOccupation" onChange={formik.handleChange} value={formik.values.fatherOccupation} required />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Mother's Phone
      </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Your Mother Name" name="motherPhone" onChange={formik.handleChange} value={formik.values.motherPhone} required />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Mother's Occupation
      </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Your Mother Occupation" name="motherOccupation" onChange={formik.handleChange} value={formik.values.motherOccupation} required />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    School Name
      </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Your School Name" name="schoolName" onChange={formik.handleChange} value={formik.values.schoolName} required />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    College Name
      </label>
                                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Your College Name" name="collegeName" onChange={formik.handleChange} value={formik.values.collegeName} required />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-state">
                                    HSC Batch
      </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="hscBatch" onChange={formik.handleChange} value={formik.values.hscBatch} required>
                                        <option value="">Select HSC Batch</option>
                                        <option>2021</option>
                                        <option>2022</option>
                                        <option>2023</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-state">
                                    Blood Group
      </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="bloodGroup" onChange={formik.handleChange} value={formik.values.bloodGroup} required>
                                        <option value="">Select Blood Group</option>
                                        <option>O+</option>
                                        <option>O-</option>
                                        <option>A+</option>
                                        <option>A-</option>
                                        <option>B+</option>
                                        <option>B-</option>
                                        <option>AB+</option>
                                        <option>AB-</option>

                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 my-2 mt-8">
                            <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                                <input className="flex cursor-pointer items-center justify-center h-12 px-6 w-full bg-blue-600 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700" id="grid-first-name" type="submit" value="Sign Up" />
                            </div>
                        </div>
                    </form>
                </div >
            )
    )
}

export default SignUpPage
