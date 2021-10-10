import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MyCourses() {
    const [allCourses, setAllCourses] = useState([])
    const UMCUser = useSelector((state) => state.userDetails)

    const grabAllCourses = () => {
        axios.get(`${process.env.REACT_APP_API_DOMAIN}/course/view`)
            .then(response => {
                let tempCourseList = response.data.result.filter(i => UMCUser.enrolledCourse.includes(i._id))
                setAllCourses(tempCourseList)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        grabAllCourses()
    }, [])

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div className="container mx-auto px-6 py-8">
                    <h3 className="text-gray-700 text-3xl font-medium">My Courses</h3>
                    <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0 mt-8">
                        {
                            allCourses && allCourses.map(course => (
                                <div key={Math.random()} className="max-w-sm mx-4 md:mx-2 bg-gray-900 border-2 border-gray-400 px-6 pt-0 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                                    <h3 className="mb-3 pt-3 text-xl font-bold text-white">Beginner Friendly</h3>
                                    <div className="relative">
                                        <img className="w-full rounded-xl" src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Colors" />
                                        <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">{course.price} BDT</p>
                                    </div>
                                    <h1 className="mt-4 text-white text-3xl font-bold cursor-pointer">
                                        {course.title}
                                    </h1>
                                    <div className="my-4 text-white">
                                        <div className="flex space-x-1 items-center">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </span>
                                            <p>Last Update {course.updated_at}</p>
                                        </div>
                                        {/* <div className="flex space-x-1 items-center">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                    <p>{course.videos.length} Classes Already</p>
                                </div> */}
                                        <div className="flex space-x-1 items-center">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </span>
                                            <p>{course.enrolledCount} Enrolled</p>
                                        </div>
                                        <div className="flex space-x-1 items-center">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                </svg>
                                            </span>
                                            <p>Vanilla JS</p>
                                        </div>
                                        <Link to={`/courses/view/${course._id}`}><button className="mt-4 text-xl w-full text-white bg-indigo-600 py-1.5 rounded-xl shadow-lg">Course Details</button></Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

export default MyCourses
