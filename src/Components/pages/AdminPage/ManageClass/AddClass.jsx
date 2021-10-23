import React, { useState, useRef, useEffect } from 'react'
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux';
import UMCReducer from '../../../redux/umcReducer';
import JoditEditor from "jodit-react";
import { urlValidation } from "../../../utils/ValidationUtil"
import LoadingScreen from '../../LoadingScreen';


function AddClass() {
    const [sectionLoading, setSectionLoading] = useState(false)
    const editor = useRef(null)
    const [editorState, setEditorState] = useState("")
    const [formValue, setFormValue] = useState({
        title: "",
        classNumber: "",
        videoLink: "",
        course: "",
        part: "",
        chapter: ""
    })
    const UMCData = useSelector((state) => state)

    // Redux Dispatch
    const dispatch = useDispatch(UMCReducer);

    const grabAllCourse = () => {
        axios.get(`${process.env.REACT_APP_API_DOMAIN}/course/view`)
            .then(response => {
                dispatch({
                    type: "populate_all_courses",
                    payload: response.data.result
                })
            })
            .catch(error => {
                // console.log(error)
            })
    }

    const config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formValue.title && formValue.classNumber && formValue.videoLink && formValue.course && formValue.part && formValue.chapter
            && editorState) {
            setSectionLoading(true)
            axios.post(`${process.env.REACT_APP_API_DOMAIN}/class/create`, { ...formValue, classCaption: editorState }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
                .then(function (response) {
                    grabAllCourse()
                    setSectionLoading(false)
                    alert(response.data.msg)
                })
                .catch(function (error) {
                    setSectionLoading(false)
                    // console.log(error);
                });
        } else {
            alert("Fill Up All The Field Correctly. Double Check Before Submit, please.")
        }
    }

    return (
        sectionLoading ? <LoadingScreen /> :
            <form className="px-4 py-8 lg:px-0" method="post" onSubmit={handleSubmit}>
                <h3 className="text-gray-700 text-xl font-medium text-center mb-4">Add Class</h3>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Title
      </label>
                        <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="First Class" name="title" onChange={(e) => setFormValue({ ...formValue, title: e.target.value })} value={formValue.title} required />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Class Number
      </label>
                        <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="Class 1" name="classNumber" onChange={(e) => setFormValue({ ...formValue, classNumber: e.target.value })} value={formValue.classNumber} required />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Vimeo Video ID / Facebook Video Link
      </label>
                        <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Video Link ( NOT Embded, Only Link)" name="videoLink" onChange={(e) => setFormValue({ ...formValue, videoLink: e.target.value })} placeholder="571191143" value={formValue.videoLink} required />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Class Caption
      </label>
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
                            Course Name
      </label>
                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-700 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="course" onChange={(e) => setFormValue({ ...formValue, course: e.target.value })} value={formValue.course} required>
                                <option key={Math.random()} value="">Select A Course</option>
                                {
                                    UMCData.allCourse.map(course => (
                                        <option key={Math.random()} value={course._id}>{course.title}</option>
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
                                <option key={Math.random()} value="">Select A Part</option>
                                {
                                    formValue.course && UMCData.allCourse.find(course => course._id == formValue.course).parts.map(part => (
                                        <option key={Math.random()} value={part._id}>{part.title}</option>
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
                                <option key={Math.random()} value="">Select A Chapter</option>
                                {
                                    formValue.part && UMCData.allCourse.find(course => course._id == formValue.course).parts.find(part => (part._id == formValue.part)).chapters.map(chapter => (
                                        <option key={Math.random()} value={chapter._id}>{chapter.title}</option>
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
                        <input className="flex cursor-pointer items-center justify-center h-12 px-6 w-full bg-blue-600 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700" id="grid-first-name" type="submit" value="Add Class" />
                    </div>
                </div>
            </form>

    )
}

export default AddClass
