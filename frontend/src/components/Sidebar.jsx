import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { RiEBikeFill } from "react-icons/ri";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaBookmark, FaSearch, FaUser } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineCircle } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import axios from 'axios'

import '../assets/css/admin.css'

const Sidebar = () => {
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

    useEffect(()=>{
      fetchBookings()
    },[])

  const [openMenu, setOpenmenu] = useState({
    vehicle: false,
    booking: false,
    company : false
  })

  const toggleMenu = (menu) => {
    setOpenmenu((prev) => ({ ...prev, [menu]: !prev[menu] }))
  }

  return (
    <div className='bg-[#adb5bd] w-62.5 h-screen ' style={{ position: 'fixed' }}>
      <div className='text-center p-3 border-b-2'>
        <img className='ms-15 ' src="/images/Admin-Profile.png" alt="adminlogo" style={{ width: '100px' }} />
        <h3 className='font-bold italic mt-2'>Admin</h3>
      </div>

      <div className='flex items-center justify-center mt-5 w-full hover:text-amber-300'>
        <Link to={'/admin-dashboard'} className='text-white  px-4 py-2 hover:bg-[#6c757d] p-2 m-0.5 w-full flex items-center' style={{ color: 'white' }}><MdDashboard className='me-2' />Dashboard</Link>
      </div>

      <div className='flex items-center justify-center mt-5'>
      <button onClick={() => toggleMenu('company')} className='text-white  px-4 py-2 hover:bg-[#6c757d] p-2 m-0.5 w-full flex items-center' style={{ color: 'white' }}>
          <RiMotorbikeFill className='me-2' />Companies
          {!openMenu.company ? (
            <RiArrowDropDownLine className='me-2 ms-auto' style={{ fontSize: '30', color: 'white' }} />
          ) : (
            <RiArrowDropUpLine className='me-2 ms-auto' style={{ fontSize: '30', color: 'white' }} />
          )}
        </button>
      </div>
      {openMenu.company && (
        <div>
          <Link to="/admin-addcompany" className='text-white  px-8 py-2 hover:text-amber-300 p-2 m-0.5 w-full flex items-center vehicle' style={{ color: 'white' }}><MdOutlineCircle className='me-2' />Add Company</Link>
          <Link to='/admin-managecompany' className='text-white  px-8 py-2  p-2 m-0.5 w-full flex items-center vehicle' style={{ color: 'white' }}><MdOutlineCircle className='me-2' />Manage Company</Link>
        </div>
      )}

      <div className='flex items-center bg-[#adb5bd] justify-center mt-5'>
        <button onClick={() => toggleMenu('vehicle')} className='text-white  px-4 py-2 hover:bg-[#6c757d] p-2 m-0.5 w-full flex items-center' style={{ color: 'white' }}>
          <RiMotorbikeFill className='me-2' />vehicles
          {!openMenu.vehicle ? (
            <RiArrowDropDownLine className='me-2 ms-auto' style={{ fontSize: '30', color: 'white' }} />
          ) : (
            <RiArrowDropUpLine className='me-2 ms-auto' style={{ fontSize: '30', color: 'white' }} />
          )}
        </button>
      </div>
      {openMenu.vehicle && (
        <div>
          <Link to='/admin-addvehicles' className='text-white  px-8 py-2 hover:text-amber-300 p-2 m-0.5 w-full flex items-center vehicle' style={{ color: 'white' }}><MdOutlineCircle className='me-2' />Add Vehicles</Link>
          <Link to='/admin-managevehicle' className='text-white  px-8 py-2  p-2 m-0.5 w-full flex items-center vehicle' style={{ color: 'white' }}><MdOutlineCircle className='me-2' />Manage Vehicles</Link>
        </div>
      )}

      <div className='flex items-center justify-center mt-5'>
        <button onClick={() => toggleMenu('booking')} className='text-white  px-4 py-2 hover:bg-[#6c757d] p-2 m-0.5 w-full flex items-center' style={{ color: 'white' }}>
          <FaBookmark className='me-2' />Bookings <span className='ms-auto bg-red-500 px-2.5 border py-1 rounded-full text-sm font-medium scale-75'>{bookings.length}</span>
          {!openMenu.booking ? (
            <RiArrowDropDownLine className='me-2 ms-auto' style={{ fontSize: '30', color: 'white' }} />
          ) : (
            <RiArrowDropUpLine className='me-2 ms-auto' style={{ fontSize: '30', color: 'white' }} />
          )}
        </button>
        
      </div>
      {openMenu.booking && (
        <div>
          <Link to={'/manage-bookings'} className='text-white  px-8 py-2  p-2 m-0.5 w-full flex items-center vehicle' style={{ color: 'white' }}><MdOutlineCircle className='me-2' />Manage Bookings</Link>
        </div>
      )}
    </div>
  )
}

export default Sidebar
