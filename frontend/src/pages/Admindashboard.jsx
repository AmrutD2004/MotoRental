import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import AdminLayout from '../components/AdminLayout'
import axios from 'axios'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import LinearChart from '../components/LinearChart'
const Admindashboard = () => {
  const [vehicles, setVehicles] = useState([])
  const [companies, setCompanies] = useState([])
  const [bookings, setBookings] = useState([])

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/manage-vehicle/')
      const data = await response.data
      console.log(data)
      setVehicles(data)
    } catch (err) {
      console.log(err)
    }

  }
  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/manage-company/')
      const data = await response.data
      console.log(data)
      setCompanies(data)
    } catch (err) {
      console.log(err)
    }
  }
  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/all-bookings/')
      const data = await response.data
      console.log(data)
      setBookings(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchVehicles()
    fetchCompanies()
    fetchBookings()
  }, [])


  useEffect(() => {
    const adminUser = localStorage.getItem('adminuser')
    if (!adminUser) {
      navigate('/admin-login')
    }
  }, [])
  return (
    <AdminLayout>
      <div className='flex items-center justify-center'>
        <h1 className='text-center'>Admin Dashboard</h1>
      </div>
      <div className='max-w-5xl mx-auto mt-10'>
        <div className='flex items-center justify-start'>
          <div className='grid grid-cols-1 lg:grid-cols-3 space-x-4 w-full'>
            <div className='flex flex-col items-start border border-neutral-300 shadow-sm px-5 py-3 rounded-md space-y-4'>
              <span className='font-medium tracking-tight text-sm'>Total Bookings</span>
              <span className='font-semibold tracking-tight text-2xl'>{bookings.length}</span>
            </div>
            <div className='flex flex-col items-start border border-neutral-300 shadow-sm px-5 py-3 rounded-md space-y-4'>
              <span className='font-medium tracking-tight text-sm'>Total Companies</span>
              <span className='font-semibold tracking-tight text-2xl'>{companies.length}</span>
            </div>
            <div className='flex flex-col items-start border border-neutral-300 shadow-sm px-5 py-3 rounded-md space-y-4'>
              <span className='font-medium tracking-tight text-sm'>Total Vehicals</span>
              <span className='font-semibold tracking-tight text-2xl'>{vehicles.length}</span>
            </div>
          </div>
        </div>
        <div className='flex items-start justify-between mt-10'>
          <p className='text-lg text-neutral-700'>Top 3 recent bookings: </p>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} className='text-neutral-600 text-sm hover:underline transition-all duration-200' to={'/manage-bookings'}>View all</Link>
        </div>
        <table className="border-collapse border-gray-400 border-3 w-full rounded-lg overflow-hidden shadow-sm mt-4">
          <thead className='bg-[#ced4da] text-center'>
            <tr>
              <th className="border border-gray-300 p-2">Sr.No</th>
              <th className="border border-gray-300 p-2">Booking ID</th>
              <th className="border border-gray-300 p-2">User Name</th>
              <th className="border border-gray-300 p-2">Vehicle Name</th>
              <th className="border border-gray-300 p-2">Start Date</th>
              <th className="border border-gray-300 p-2">End Date</th>
              <th className="border border-gray-300 p-2">Total Price</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {bookings.slice(0, 3).map((items, idx) => (
              <tr key={items.id}>
                <td className='border border-sm  px-3 py-2'>{idx + 1}</td>
                <td className='border border-sm text-sm tracking-wide px-3 py-2'>{items.booking_id}</td>
                <td className='border border-sm text-sm tracking-wide px-3 py-2'>{items.first_name}</td>
                <td className='border border-sm text-sm tracking-tight px-3 py-2'>{items.vehicle_name}</td>
                <td className='border border-sm text-sm tracking-wide px-3 py-2'>{dayjs(items.start_date).format('D MMM YYYY')}</td>
                <td className='border border-sm text-sm tracking-wide px-3 py-2'>{dayjs(items.end_date).format('D MMM YYYY')}</td>
                <td className='border border-sm text-sm tracking-wide px-3 py-2'>{items.total_price}</td>
              </tr>
            ))}

          </tbody>
        </table>

        <div className='w-full mx-auto scale-75'><div>
          <p className='text-lg'>Booking Value Trend <span className='text-sm text-neutral-500'>(Per-booking price trend over time.)</span></p>
        </div>
          <div className='mt-4'>
            <LinearChart bookings={bookings} />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Admindashboard
