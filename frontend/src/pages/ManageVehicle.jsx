import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { IoSettingsSharp } from "react-icons/io5";
import { FaDatabase, FaEdit } from 'react-icons/fa';
import { CiAirportSign1, CiEdit } from "react-icons/ci";

import { useNavigate,Link } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import Button from '../components/Button'

const ManageVehicle = () => {
  const navigate = useNavigate()
    const [vehicles, setVehicles] = useState([]);
    const [allvehicles, setAllvehicles] = useState([]);

    const fetchVehicles = ()=>{
        fetch('https://motorental-backend.onrender.com/api/manage-vehicle/')
            .then(res => res.json())
            .then(data => {
                setVehicles(data)
                setAllvehicles(data)
            })
    }

    useEffect(() => {
        fetchVehicles()
    }, [])

    const handleSearch = (s) => {
        const keyword = s.toLowerCase();
        if (!keyword) {
            setVehicles(allvehicles);
        } else {
            const filterd = allvehicles.filter((filterdData) => filterdData.vehicle_name.toLowerCase().includes(keyword))
            setVehicles(filterd)
        }

    }
    const adminUser = localStorage.getItem('adminuser')
    useEffect(()=>{
        if (!adminUser){
            navigate('/admin-login')
        }
    },[])

    return (
        <AdminLayout>
            <div>
                <h3 className='text-3xl font-semibold flex items-center justify-center'><IoSettingsSharp className='me-2' />Manage Vehicle</h3>
                <h5 className='text-end  flex items-center me-2 mt-7'>
                    <FaDatabase className='ms-auto me-2' />Total Companies<span className='bg-green-400 px-2 py-1 rounded border border-sm ms-2'>{vehicles.length}</span>
                </h5>
                <div>
                    <input type="text" className=" px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500  m-2 w-150" placeholder='🔍 Search Company..' onChange={(e) => handleSearch(e.target.value)} />
                </div>
                <table className="border-collapse border-gray-400 border-3 w-full rounded-lg overflow-hidden shadow-sm  m-2">
                    <thead className='bg-[#ced4da] text-center'>
                        <tr>
                            <th className="border border-gray-300 p-2">Sr.No</th>
                            <th className="border border-gray-300 p-2">Vehicle Name</th>
                            <th className="border border-gray-300 p-2">Company</th>
                            <th className="border border-gray-300 p-2">Fuel type</th>
                            <th className="border border-gray-300 p-2">Per dat rent</th>
                            <th className="border border-gray-300 p-2">Model Year</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {vehicles.map((v, index) => (


                            <tr key={v.id}>
                                <td className='border border-sm font-semibold'>{index + 1}</td>
                                <td className='border border-sm font-semibold'>{v.vehicle_name}</td>
                                <td className='border border-sm font-semibold'>{v.company_name}</td>
                                <td className='border border-sm font-semibold'>{v.vehicle_fuel_type}</td>
                                <td className='border border-sm font-semibold'>{v.vehicle_rent_price}</td>
                                <td className='border border-sm font-semibold'>{v.vehicle_model_year}</td>

                                <td className='border border-sm font-semibold'><div className='flex gap-2 justify-center m-2'>
                                    <Link to='/admin-editvehicle' state={{vehicleData : v}} className='flex items-center justify-center px-4 py-2 !text-neutral-800 font-sm border hover:bg-[#00ffcc] rounded' style={{ textDecoration: 'none', color: 'white' }}><CiEdit className='me-2' />Edit</Link><Button/>
                                </div></td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </AdminLayout>
  )
}

export default ManageVehicle
