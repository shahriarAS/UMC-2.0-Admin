import React, { useEffect, useState } from "react";
import axios from "axios"

function UserDetail({ setModal, modalData }) {
    // console.log(modalData)
    const updateUserStatus = (active) => {
        axios.put(`${process.env.REACT_APP_API_DOMAIN}/user/update/${modalData["username"]}`, { active }, {
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
    }
    const deleteUser = (active) => {
        axios.delete(`${process.env.REACT_APP_API_DOMAIN}/user/delete/${modalData["username"]}`, {
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
    }
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative my-6">
                    <div className="buser-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="grid md:grid-cols-2 sm:grid-cols-1 m-5 mb-2 gap-1.5">
                            {
                                Object.keys(modalData).map(dataKey => (
                                    (dataKey == "__v" || dataKey == "enrolledCourse" || dataKey == "notifications" || dataKey == "watched" || dataKey == "password" || dataKey == "profilePhoto" || dataKey == "randString") ? null :
                                        (<div>
                                            <p className="text-lg"><span className="font-black">{dataKey}:</span> <span className="italic">{modalData[dataKey].toString()}</span></p>
                                        </div>)
                                ))
                            }
                        </div>
                        <h1 className="text-center buser-2 my-2 font-bold">Set User Active Status</h1>
                        <div className="flex p-4 justify-center">
                            <button onClick={() => updateUserStatus(true)} className="p-1 pl-2 pr-2 bg-green-500 text-gray-100 text-lg rounded-lg focus:buser-4 buser-blue-300 mr-2">Active</button>
                            <button onClick={() => updateUserStatus(false)} className="p-1 pl-2 pr-2 bg-red-500 text-gray-100 text-lg rounded-lg focus:buser-4 buser-blue-300">Inactive</button>
                        </div>
                        <h1 className="text-center buser-2 my-2 font-bold">Delete User</h1>
                        <div className="flex p-4 justify-center">
                            <button onClick={deleteUser} className="p-1 pl-2 pr-2 bg-red-500 text-gray-100 text-lg rounded-lg focus:buser-4 buser-blue-300">Delete</button>
                        </div>
                        <div className="flex items-center justify-end p-6 py-0 buser-t buser-solid buser-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setModal(false)}
                            >
                                Close
          </button>
                        </div>
                    </div>
                </div>
            </div >
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default UserDetail