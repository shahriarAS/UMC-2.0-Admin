import React, { useState, useRef, useEffect } from 'react'
import axios from "axios"
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UpdateProfile from './UpdateProfile';
import PasswordChange from './PasswordChange';
import MyCourses from './MyCourses';

function ProfilePage() {
    const ref = useRef(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [tabTitle, setTabTitle] = useState("update")

    const clickedOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setSidebarOpen(false)
        }
    }

    const toggleMenu = () => {
        setSidebarOpen(sidebarOpen ? false : true)
    }

    useEffect(() => {
        document.addEventListener("click", clickedOutside, true);
        return () => {
            document.removeEventListener("click", clickedOutside, true);
        };
    });
    return (

        <div className="flex h-screen bg-gray-200">

            <button className={`fixed top-1/2 bg-indigo-400 lg:hidden rounded-lg focus:outline-none focus:shadow-outline ${sidebarOpen ? "hidden" : ""}`} onClick={toggleMenu}>
                <svg fill="" viewBox="0 0 20 20" className="w-6 h-6">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
            </button>

            <div className={`fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
            </div>

            <div ref={ref} className={`z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? "block" : "hidden"} lg:block`}>
                <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center">
                        <svg className="h-12 w-12" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z" fill="#4C51BF" stroke="#4C51BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z" fill="white"></path>
                        </svg>

                        <span className="text-gray-700 text-2xl mx-2 font-semibold">Profile</span>
                    </div>
                </div>

                <nav className="mt-10">
                    <button onClick={() => setTabTitle("update")} className={`flex items-center w-full mt-4 py-2 px-6 ${tabTitle == "update" ? "bg-gray-700 bg-opacity-25 text-gray-100" : "text-gray-500"} hover:text-gray-100`}>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                        </svg>

                        <span className="mx-3">Profile Page</span>
                    </button>

                    <button onClick={() => setTabTitle("security")} className={`flex items-center w-full mt-4 py-2 px-6 ${tabTitle == "security" ? "bg-gray-700 bg-opacity-25 text-gray-100" : "text-gray-500"} hover:text-gray-100`}>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z">
                            </path>
                        </svg>

                        <span className="mx-3">Account & Security</span>
                    </button>

                    <button onClick={() => setTabTitle("my_courses")} className={`flex items-center w-full mt-4 py-2 px-6 ${tabTitle == "my_courses" ? "bg-gray-700 bg-opacity-25 text-gray-100" : "text-gray-500"} hover:text-gray-100`}>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                            </path>
                        </svg>

                        <span className="mx-3">My Courses</span>
                    </button>
                </nav>
            </div>
            {
                tabTitle == "update" ? <UpdateProfile /> :
                    tabTitle == "security" ? <PasswordChange /> :
                    tabTitle == "my_courses" ? <MyCourses /> : null
            }
        </div>
    )
}

export default ProfilePage
