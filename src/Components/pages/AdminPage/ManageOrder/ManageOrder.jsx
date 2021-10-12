import React, { useState, useEffect, useMemo } from 'react'
import { useTable, useGlobalFilter, useSortBy } from 'react-table'
import OrderDetail from "./OrderDetail"
import axios from "axios"

function ManageOrder() {
    const [data, setData] = useState([])

    const [openModal, setOpenModal] = useState(false)
    const [modalData, setModalData] = useState([])

    const columns = useMemo(
        () => [
            // {
            //     Header: 'ID',
            //     accessor: '_id',
            // },
            {
                Header: 'Student Username',
                accessor: 'student.username',
            },
            {
                Header: 'Sender Number',
                accessor: 'sender_number',
            },
            {
                Header: 'Receiver Number',
                accessor: 'receiver_number',
            },
            {
                Header: 'Payment Method',
                accessor: 'payment_method',
            },
            {
                Header: 'Paid Ammount',
                accessor: 'paid_ammount',
            },
            {
                Header: 'Transaction ID',
                accessor: 'transaction_id',
            },
            {
                Header: 'Reference',
                accessor: 'reference',
            },
            {
                Header: 'Order Status',
                accessor: 'order_status',
            },
            {
                Header: 'Course',
                accessor: 'course.title',
            },
            {
                Header: "Order Placed",
                accessor: "created_at"
            }
        ],
        []
    )

    const grabOrder = () => {
        axios.get(`${process.env.REACT_APP_API_DOMAIN}/order/view`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                // console.log(response.data.result)
                setData(response.data.result)
            })
            .catch(error => {
                // console.log(error)
            })
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({ columns, data }, useGlobalFilter, useSortBy)

    const { globalFilter } = state

    const showModalFunc = (data) => {
        setModalData(data)
        setOpenModal(true)
    }

    useEffect(() => {
        grabOrder()
    }, [])

    return (
        <>
        {openModal ? <OrderDetail setModal={setOpenModal} modalData={modalData} /> : null}
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    <div className="container mx-auto px-6 py-8">
                        <div className="overflow-x-scroll">
                            <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
                                <div className="flex justify-between">
                                    <div className="inline-flex border border-gray-500 rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
                                        <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                                            <div className="flex">
                                                <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                                                    <svg width="18" height="18" className="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <input value={globalFilter || ""} onChange={(e) => setGlobalFilter(e.target.value)} type="text" className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin" placeholder="Search" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                                <table className="min-w-full" {...getTableProps()}>
                                    <thead>
                                        {headerGroups.map(headerGroup => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers.map(column => (
                                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider text-sm">
                                                        {column.render('Header')}
                                                        <span>
                                                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                                        </span>
                                                    </th>
                                                ))}
                                            </tr>))}
                                    </thead>
                                    <tbody className="bg-white" {...getTableBodyProps()}>
                                        {rows.map(row => {
                                            prepareRow(row)
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells.map(cell => {
                                                        return (
                                                            cell.column.id == "created_at" ? (
                                                                <td {...cell.getCellProps()} className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                                                    <div className="flex items-center">
                                                                        <div>
                                                                            <div className="text-sm leading-5 text-gray-800">{String(cell.value).split("T")[0]}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            ) : <td {...cell.getCellProps()} className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                                                    <div className="flex items-center">
                                                                        <div>
                                                                            <div className="text-sm leading-5 text-gray-800">{cell.render('Cell')}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                        )
                                                    })}
                                                    <td onClick={() => showModalFunc(row.original)} className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                                        <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">View Details</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div >
                    </div></main></div>
        </>
    )
}

export default ManageOrder
