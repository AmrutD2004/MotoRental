import React from 'react'
import '../assets/css/admin.css'
import { Link, useNavigate } from 'react-router-dom'
import { MdChevronRight, MdLogout } from "react-icons/md";
import { toast,ToastContainer } from 'react-toastify';
import { MdChevronLeft  } from "react-icons/md";




const Adminheader = ({toggleSidebar, siderBar}) => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('adminuser')
        toast.success('Logout Successfull')
        setTimeout(() => {
            navigate('/admin-login')
        }, 2000)
    }
    return (
        <>
            <div className="navbar bg-[#6c757d] shadow-sm py-3 flex items-center">
                <button onClick={toggleSidebar} className='border border-sm px-2 py-2 rounded ms-3 hover:bg-[#343a40]'style={{fontSize: '20px', color:'white'}}>{siderBar ? <MdChevronLeft/> : <MdChevronRight/>}</button><img src="/images/homemoto.png" alt="motologo" style={{width : '30px'}} /><Link className="btn btn-ghost text-lg font-extrabold ms-2 " style={{ fontWeight: '850', color: 'white' }}>MOTORENTAL</Link>
                <div className='ms-auto me-5'>
                    <button className='border border-black rounded bg-red-500 text-shadow-white hover:bg-red-700 text-white px-3 py-2 flex items-center'onClick={handleLogout}><MdLogout className='me-2'/>Logout</button>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}

export default Adminheader
