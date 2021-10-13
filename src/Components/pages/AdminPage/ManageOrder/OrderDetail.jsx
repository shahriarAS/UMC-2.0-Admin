import React, { useEffect, useState } from "react";
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux';
import UMCReducer from '../../../redux/umcReducer';
import LoadingScreen from '../../LoadingScreen';

function OrderDetail({ setModal, modalData }) {
    const [sectionLoading, setSectionLoading] = useState(false)

    const updateOrderStatus = (order_status) => {
        if (order_status) {
            setSectionLoading(true)
            axios.put(`${process.env.REACT_APP_API_DOMAIN}/order/update/${modalData["_id"]}`, { order_status }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
                .then(function (response) {
                    setSectionLoading(false)
                    alert(response.data.msg)
                })
                .catch(function (error) {
                    setSectionLoading(false)
                    // console.log(error);
                });
        } else {
            alert("Please Set a Order Status")
        }
    }
    return (
        sectionLoading ? <LoadingScreen /> :
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative my-6">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="grid md:grid-cols-2 sm:grid-cols-1 m-5 mb-2 gap-1.5">
                                {
                                    Object.keys(modalData).map(dataKey => (
                                        dataKey == "course" ?
                                            <div>
                                                <p className="text-lg"><span className="font-black">{dataKey}:</span> <span className="italic">{modalData[dataKey].title}</span></p>
                                            </div> :
                                            dataKey == "__v" ? null :
                                                dataKey == "student" ?
                                                    (<div>
                                                        <p className="text-lg"><span className="font-black">{dataKey}:</span> <span className="italic">{modalData[dataKey].username}</span></p>
                                                    </div>) :
                                                    <div>
                                                        <p className="text-lg"><span className="font-black">{String(dataKey).replace("_", " ")}:</span> <span className="italic">{modalData[dataKey]}</span></p>
                                                    </div>
                                    ))
                                }
                            </div>
                            <h1 className="text-center border-2 my-2 font-bold">Set Order Status</h1>
                            <div className="flex p-4 justify-center">
                                <button onClick={() => updateOrderStatus("approved")} className="p-1 pl-2 pr-2 bg-green-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300 mr-2">Approve</button>
                                <button onClick={() => updateOrderStatus("cancelled")} className="p-1 pl-2 pr-2 bg-gray-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300 mr-2">Cancel</button>
                                <button onClick={() => updateOrderStatus("refunded")} className="p-1 pl-2 pr-2 bg-yellow-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300 mr-2">Refund</button>
                                <button onClick={() => updateOrderStatus("pending")} className="p-1 pl-2 pr-2 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300">Pending</button>
                            </div>
                            <div className="flex items-center justify-end p-6 py-0 border-t border-solid border-blueGray-200 rounded-b">
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

export default OrderDetail