import React,{useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import AdminLayout from '../components/AdminLayout'

const Admindashboard = () => {
  useEffect(()=>{
    const adminUser = localStorage.getItem('adminuser')
    if (!adminUser){
        navigate('/admin-login')
    }
},[])
  return (
    <AdminLayout>
      <div className='flex items-center justify-center'>
      <h1 className='text-center'>Admin Dashboard</h1>
      </div>
    </AdminLayout>
  )
}

export default Admindashboard
