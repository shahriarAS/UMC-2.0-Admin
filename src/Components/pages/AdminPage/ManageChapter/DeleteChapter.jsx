import React, { useState, useRef, useEffect } from 'react'
import axios from "axios"
import { useSelector } from 'react-redux';

function DeleteChapter() {
    const [formValue, setFormValue] = useState({
        course: "",
        part: "",
        chapter: "",
    })
    const UMCData = useSelector((state) => state)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formValue.course && formValue.part && formValue.chapter) {
            axios.delete(`${process.env.REACT_APP_API_DOMAIN}/chapter/delete/${formValue.chapter}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
                .then(function (response) {
                    alert(response.data.msg)
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("Fill Up All Field.")
        }
    }

    return (
        <form className="px-4 py-8 lg:px-0" method="post" onSubmit={handleSubmit}>
            <h3 className="text-gray-700 text-xl font-medium text-center mb-4">Delete Chapter</h3>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                        Course Name
      </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-700 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="course" onChange={(e) => setFormValue({ ...formValue, course: e.target.value })} value={formValue.course} required>
                            <option value="">Select A Course</option>
                            {
                                UMCData.allCourse.map(course => (
                                    <option value={course._id}>{course.title}</option>
                                ))
                            }
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                        Part 
                                </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-700 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="part" onChange={(e) => setFormValue({ ...formValue, part: e.target.value })} value={formValue.part} required >
                            <option value="">Select A Part</option>
                            {
                                formValue.course && UMCData.allCourse.find(course => course._id == formValue.course).parts.map(part => (
                                    <option value={part._id}>{part.title}</option>
                                ))
                            }
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                        Chapter Name
                                </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-700 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="chapter" onChange={(e) => setFormValue({ ...formValue, chapter: e.target.value })} value={formValue.chapter} required >
                            <option value="">Select A Chapter</option>
                            {
                                formValue.part && UMCData.allCourse.find(course => course._id == formValue.course).parts.find(part => (part._id == formValue.part)).chapters.map(chapter => (
                                    <option value={chapter._id}>{chapter.title}</option>
                                ))
                            }
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 my-2 mt-8">
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <input className="flex cursor-pointer items-center justify-center h-12 px-6 w-full bg-blue-600 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700" id="grid-first-name" type="submit" value="Delete Chapter" />
                </div>
            </div>
        </form>

    )
}

export default DeleteChapter
