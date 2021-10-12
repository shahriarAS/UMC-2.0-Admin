import React, { useState, useRef, useEffect } from 'react'
import axios from "axios"
import JoditEditor from "jodit-react";
import { useSelector } from 'react-redux';

function AddCourse() {
    const editor = useRef(null)
    const [editorState, setEditorState] = useState("")
    const [formValue, setFormValue] = useState({
        title: "",
        courseNumber: "",
        // courseDetails: "",
        trailer: "",
        thumbnail: "",
        price: "",
        features: ""
    })
    const UMCData = useSelector((state) => state)

    const config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(formValue)
        if (formValue.title && formValue.courseNumber && formValue.trailer &&
            formValue.thumbnail && formValue.price && formValue.features) {
            axios.post(`${process.env.REACT_APP_API_DOMAIN}/course/create`, { ...formValue, courseDetails: editorState }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
                .then(function (response) {
                    alert(response.data.msg)
                })
                .catch(function (error) {
                    // console.log(error);
                });
        } else {
            alert("Fill Up All The Field Correctly. Double Check Before Submit, please.")
        }
    }

    return (
        <form className="px-4 py-8 lg:px-0" method="post" onSubmit={handleSubmit}>
            <h3 className="text-gray-700 text-xl font-medium text-center mb-4">Add Course</h3>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                        Title
      </label>
                    <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="First Course" name="title" onChange={(e) => setFormValue({ ...formValue, title: e.target.value })} value={formValue.title} required />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Course Number
      </label>
                    <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="Course 1" name="courseNumber" onChange={(e) => setFormValue({ ...formValue, courseNumber: e.target.value })} value={formValue.courseNumber} required />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                        Course Details
      </label>
                    {/* <input className="block appearance-none w-full bg-gray-200 border border-gray-700 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="courseDetails" onChange={(e) => setFormValue({ ...formValue, courseDetails: e.target.value })} value={formValue.courseDetails} required /> */}
                    <JoditEditor
                        ref={editor}
                        value={editorState}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setEditorState(newContent)} // preferred to use only this option to update the content for performance reasons
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                        Thumbnail
      </label>
                    <input className="block appearance-none w-full bg-gray-200 border border-gray-700 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="thumbnail" onChange={(e) => setFormValue({ ...formValue, thumbnail: e.target.value })} value={formValue.thumbnail} required />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                        Price
      </label>

                    <input className="block appearance-none w-full bg-gray-200 border border-gray-700 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" id="grid-state" name="price" onChange={(e) => setFormValue({ ...formValue, price: e.target.value })} value={formValue.price} required />

                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                        Feathured
      </label>
                    <textarea className="block appearance-none w-full bg-gray-200 border border-gray-700 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="feathured" onChange={(e) => setFormValue({ ...formValue, features: e.target.value })} value={formValue.features} required />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                        Trailer ( Video ID From Youtube )
      </label>
                    <input className="block appearance-none w-full bg-gray-200 border border-gray-700 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="trailer" onChange={(e) => setFormValue({ ...formValue, trailer: e.target.value })} value={formValue.trailer} required />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 my-2 mt-8">
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <input className="flex cursor-pointer items-center justify-center h-12 px-6 w-full bg-blue-600 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700" id="grid-first-name" type="submit" value="Add Course" />
                </div>
            </div>
        </form >

    )
}

export default AddCourse
