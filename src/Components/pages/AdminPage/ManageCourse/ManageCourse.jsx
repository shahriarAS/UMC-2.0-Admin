import React, { useState, useRef, useEffect } from 'react'
import axios from "axios"
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddCourse from './AddCourse';
import DeleteCourse from './DeleteCourse';
import UpdateCoure from './UpdateCourse';

function ManageCourse() {
    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div className="container mx-auto px-6 py-8">
                    <h3 className="text-gray-700 text-3xl font-medium">Manage Course</h3>
                    <AddCourse />
                    <UpdateCoure />
                    <DeleteCourse />
                </div>
            </main>
        </div>
    )
}

export default ManageCourse
