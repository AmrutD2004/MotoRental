import React, {useState, useEffect} from 'react'
import AdminLayout from '../components/AdminLayout'
import { IoIosAddCircle, IoIosAdd} from 'react-icons/io';
import { RiEBikeFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const AddCompany = () => {
    const navigate = useNavigate()
    const [companyName, setCompanyname] = useState('')

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const response = await fetch('https://motorental-backend.onrender.com/api/add-company/',{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({company_name : companyName})
        });

        const data = await response.json();

        try{
            if(response.ok){
                toast.success(data.message);
                setCompanyname('')
            }else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error('Somthing Went Wrong')
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
        <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-8'>
                <div className='shadow-md p-4 rounded ms-3 mt-5'>
                <h2 className="mb-4 text-3xl font-semibold flex items-center gap-2">
                            <IoIosAddCircle />
                            Add Company
                        </h2>
                        <form onSubmit={handleSubmit}>
                        <label className="block mb-2 text-sm font-medium">Company Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded mb-4"
                                placeholder="Enter company name"
                                required
                                onChange={(e)=>setCompanyname(e.target.value)}
                                value={companyName}
                            />
                            <button className='btn px-3 py-3 border border-md rounded bg-[#6c757d] flex items-center text-white hover:bg-[#495057]'>
                                <IoIosAdd/>Add Company
                            </button>
                        </form>
                </div>      
            </div>
            <div className='col-span-4 flex items-center justify-center'>
                <RiEBikeFill style={{fontSize:'180', color:'efefef'}}/>
            </div>
        </div>
        <ToastContainer/>
    </AdminLayout>
  )
}

export default AddCompany
