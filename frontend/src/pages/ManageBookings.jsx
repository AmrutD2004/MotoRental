import React, { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import axios from 'axios'
import dayjs from 'dayjs'
import { FaDatabase } from "react-icons/fa";


const ManageBookings = () => {

    const [bookings, setBookings] = useState([])
    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/all-bookings/')
            const data = await response.data

            setBookings(data)

        } catch (err) {
            console.log(err)
        }
    }
    const updateStatus = async (bookingId, status) => {
        try {

            await axios.put(
                `http://127.0.0.1:8000/api/update-status/${bookingId}/`,
                { status }
            )
            fetchBookings()
            // refresh table
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchBookings()
    }, [])
    return (
        <AdminLayout>
            <div className='max-w-7xl mx-auto'>
                <div className='flex flex-col items-center justify-center space-y-2'>
                    <p className='text-3xl font-medium tracking-tight leading-tight'>Manage Bookings</p>
                    <p className='text-sm text-neutral-500 tracking-wide'>Manage all users bookings.</p>
                </div>
                <div className='w-full mt-10'>
                    <div className='items-center flex justify-end me-5 gap-3'>
                        <FaDatabase />Total Bookings: <span className='font-medium'>{bookings.length}</span>
                    </div>
                </div>
                <table className="border-collapse border-gray-400 border-3 w-full rounded-lg overflow-hidden shadow-sm  mt-5">
                    <thead className='bg-[#ced4da] text-center'>
                        <tr>
                            <th className="border border-gray-300 p-2">Sr.No</th>
                            <th className="border border-gray-300 p-2">Booking ID</th>
                            <th className="border border-gray-300 p-2">User Name</th>
                            <th className="border border-gray-300 p-2">Vehicle Name</th>
                            <th className="border border-gray-300 p-2">Contact No.</th>
                            <th className="border border-gray-300 p-2">Start Date</th>
                            <th className="border border-gray-300 p-2">End Date</th>
                            <th className="border border-gray-300 p-2">Total Price</th>
                            <th className='font-medium border border-gray-300 p-2'>Status</th>
                            <th className='font-medium border border-gray-300 p-2'>Action</th>

                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {bookings.map((items, idx) => (
                            <tr key={items.booking_id}>
                                <td className='border border-sm  px-3 py-2'>{idx + 1}</td>
                                <td className='border border-sm text-sm tracking-wide px-3 py-2'>{items.booking_id}</td>
                                <td className='border border-sm text-sm tracking-wide px-3 py-2'>{items.first_name}</td>
                                <td className='border border-sm text-sm tracking-tight px-3 py-2'>{items.vehicle_name}</td>
                                <td className='border border-sm text-sm tracking-wide px-3 py-2'>{items.mobile}</td>
                                <td className='border border-sm text-sm tracking-wide px-3 py-2'>{dayjs(items.start_date).format('D MMM YYYY')}</td>
                                <td className='border border-sm text-sm tracking-wide px-3 py-2'>{dayjs(items.end_date).format('D MMM YYYY')}</td>
                                <td className='border border-sm text-sm tracking-wide px-3 py-2'>{items.total_price}</td>
                                <td className='text-center border border-sm px-4 py-3'>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium
      ${items.status === 'PENDING' && 'bg-yellow-100 text-yellow-700'}
      ${items.status === 'APPROVED' && 'bg-green-100 text-green-700'}
      ${items.status === 'CANCELLED' && 'bg-red-100 text-red-700'}
    `}
                                    >
                                        {items.status}
                                    </span>
                                </td>
                                <td className="border px-3 py-2 space-x-2">
                                    {items.status === 'PENDING' && (
                                        <>
                                            <button
                                                onClick={() => updateStatus(items.booking_id, 'APPROVED')}
                                                className="px-3 py-1 text-xs bg-green-600 text-white rounded"
                                            >
                                                Approve
                                            </button>

                                            <button
                                                onClick={() => updateStatus(items.booking_id, 'CANCELLED')}
                                                className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}

                                    {items.status !== 'PENDING' && (
                                        <span className="text-xs text-neutral-500">No action</span>
                                    )}
                                </td>

                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}

export default ManageBookings