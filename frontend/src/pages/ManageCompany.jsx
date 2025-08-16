import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { IoSettingsSharp } from "react-icons/io5";
import { FaDatabase, FaEdit } from 'react-icons/fa';
import { useNavigate,Link } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import Modal from '../components/Modal'
import Button from '../components/Button'




const ManageCompany = () => {
    const navigate = useNavigate()
    const [companies, setCompanies] = useState([]);
    const [allcompanies, setAllCompanies] = useState([]);

    const fetchCompanies=()=>{
            fetch('http://127.0.0.1:8000/api/manage-company/')
            .then(res => res.json())
            .then(data => {
                setCompanies(data)
                setAllCompanies(data)
            })
        }
    useEffect(() => {
        fetchCompanies()
            
    }, [])

    const handleSearch = (s) => {
        const keyword = s.toLowerCase();
        if (!keyword) {
            setCompanies(allcompanies);
        } else {
            const filterd = allcompanies.filter((filterdData) => filterdData.company_name.toLowerCase().includes(keyword))
            setCompanies(filterd)
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
                <h3 className='text-3xl font-semibold flex items-center justify-center'><IoSettingsSharp className='me-2' />Manage Company</h3>
                <h5 className='text-end flex items-center me-2 mt-7'>
                    <FaDatabase className='ms-auto me-2' />Total Companies<span className='bg-green-400 px-2 py-1 rounded border border-sm ms-2'>{companies.length}</span>
                </h5>
                <div>
                    <input type="text" className=" px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500  m-2 w-150" placeholder='🔍 Search Company..' onChange={(e) => handleSearch(e.target.value)} />
                </div>
                <table className="border-collapse border-gray-400 border-3 w-full rounded-lg overflow-hidden shadow-sm  m-2">
                    <thead className='bg-[#ced4da] text-center'>
                        <tr>
                            <th className="border border-gray-300 p-2">Sr.No</th>
                            <th className="border border-gray-300 p-2">Company Name</th>
                            <th className="border border-gray-300 p-2">Creation Date</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {companies.map((com, index) => (


                            <tr key={com.id}>
                                <td className='border border-sm font-semibold'>{index + 1}</td>
                                <td className='border border-sm font-semibold'>{com.company_name}</td>
                                <td className='border border-sm font-semibold'>{com.company_date}</td>
                                <td className='border border-sm font-semibold'><div className='flex gap-2 justify-center m-2'>
                                   <Modal  company={com} onSuccess={fetchCompanies} /><Button company={com} onSuccess={fetchCompanies}/>
                                </div></td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </AdminLayout>
    )
}

export default ManageCompany
