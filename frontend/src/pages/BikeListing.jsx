import React, { useState, useEffect } from 'react'
import PublicLayout from '../components/PublicLayout'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineTimer } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { CiMoneyCheck1 } from "react-icons/ci";
import { MdDirectionsBike } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { FaGasPump } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { ToastContainer, toast } from 'react-toastify';


const BikeListing = () => {
    const navigate = useNavigate()

    const [companies, setCompanies] = useState([])
    const [vehicles, setVehicles] = useState([]);
    const [allVehicles, setAllvehicles] = useState([])


    const [selectCompany, setSelectcompany] = useState('')
    const [selectfuel, setSelectfuel] = useState('')


    const fetchVehicles = () => {
        fetch('http://127.0.0.1:8000/api/manage-vehicle/')
            .then(res => res.json())
            .then(data => {
                setVehicles(data)
                setAllvehicles(data)
            })
    }

    useEffect(() => {
        fetchVehicles()

        fetch('http://127.0.0.1:8000/api/manage-company/')
            .then(res => res.json())
            .then(data => {
                setCompanies(data)
            })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectCompany && !selectfuel) {
        setVehicles(allVehicles);
        return;
    }
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/search-vehicle/?company=${selectCompany}&fueltype=${selectfuel}`);
            const data = await response.json();
            setVehicles(data.searchedVehicle || []);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong');
        }
    };
    return (
        <PublicLayout>
            <form className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-20 px-2 items-center justify-center group' onSubmit={handleSubmit}>
                <div>
                    <select
                        name="company"
                        className="w-full p-2 border rounded bg-white text-neutral-500" value={selectCompany} onChange={(e) => setSelectcompany(e.target.value)}>
                        <option>Companies</option>
                        {companies.map((com) => (
                            <option key={com.id} value={com.id}>
                                {com.company_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select
                        name="company"
                        className="w-full p-2 border rounded text-neutral-500 bg-white" value={selectfuel} onChange={(e) => setSelectfuel(e.target.value)}>
                        <option value="" className='text-muted'>Select fule type</option>
                        <option>Petrol</option>
                        <option>CNG</option>
                        <option>Electric</option>
                    </select>
                </div>
                <div>
                    <button className='w-75 bg-pink-400 hover:bg-pink-500 transition duration-200 rounded text-white p-2'>Search</button>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={() => {
                            setSelectcompany('');
                            setSelectfuel('');
                            setVehicles(allVehicles);
                        }}
                        className="w-full bg-pink-400 hover:bg-pink-500 transition duration-200 rounded text-white p-2 me-4"
                    >
                        Reset Filters
                    </button>
                </div>
            </form>
            <div className='h-[5vh]'></div>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='font-medium leading-tight tracking-tight'>FIND YOUR <span className='font-medium leading-tight tracking-tight text-pink-500'>MOTO</span> </h1>
                <p>LISTING <span>{vehicles.length}</span></p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-15 px-2 items-center justify-center group'>
                {vehicles.map((v, idx) => (
                    <div
                        key={v.image1}
                        className='flex flex-col justify-between bg-white h-[400px] rounded shadow-md p-4 transform transition-all duration-300 hover:scale-105 hover:bg-neutral-200'
                    >
                        <div className='flex justify-center'>
                            <img
                                src={v.image1}
                                alt={v.vehicle_name}
                                className='h-[130px] object-contain'
                            />
                        </div>

                        <div className='text-center mt-3'>
                            <Link to={`/vehicledetail/${v.id}`}><h2 className='text-xl font-semibold text-neutral-800 truncate'>{v.vehicle_name}</h2></Link>
                        </div>

                        <div className='flex justify-center items-center gap-2 mt-2 text-sm'>
                            <SlCalender className='text-pink-500' />
                            <span className='text-gray-800 font-medium'>{v.vehicle_model_year} Model</span>
                            <span className='text-gray-500'>|</span>
                            <FaGasPump className='text-pink-500' />
                            <span className='text-gray-800 font-medium'>{v.vehicle_fuel_type}</span>
                        </div>

                        <div className='mt-4 text-center'>
                            <button onClick={()=>navigate(`/vehicledetail/${v.id}`)} className='bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md cursor-pointer'>
                                {v.vehicle_rent_price} ₹/ Day
                            </button>
                        </div>
                    </div>

                ))}
            </div>
            <ToastContainer />
        </PublicLayout>
    )
}

export default BikeListing
