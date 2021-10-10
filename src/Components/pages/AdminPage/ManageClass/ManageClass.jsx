import React, { useState, useRef, useEffect } from 'react'
import axios from "axios"
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddClass from './AddClass';
import DeleteCourse from '../ManageCourse/DeleteCourse';
import DeleteClass from './DeleteClass';
import UpdateClass from './UpdateClass';

function ManageClass() {
    const [formValue, setFormValue] = useState({
        title: "",
        classNumber: "",
        videoLink: "",
        course: "",
        part: "",
        chapter: ""
    })
    const UMCData = useSelector((state) => state)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formValue.title && formValue.classNumber && formValue.videoLink &&
            formValue.course && formValue.part && formValue.chapter) {
            axios.post(`${process.env.REACT_APP_API_DOMAIN}/class/create`, formValue, {
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
        <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div className="container mx-auto px-6 py-8">
                    <h3 className="text-gray-700 text-3xl font-medium">Manage Class</h3>
                    <AddClass />
                    <UpdateClass />
                    <DeleteClass />
                </div>
            </main>
        </div>
    )
}

export default ManageClass
