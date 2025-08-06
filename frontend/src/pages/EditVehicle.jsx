import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { IoIosAdd } from 'react-icons/io'
import { RiMotorbikeFill } from "react-icons/ri"
import { ToastContainer, toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const EditVehicle = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const vehicleData = location.state?.vehicleData || null
    //fetching Companies
    const [companies, setCompanies] = useState([])

    const adminUser = localStorage.getItem('adminuser')

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin-login')
        }

        fetch('http://127.0.0.1:8000/api/manage-company/')
            .then(res => res.json())
            .then(data => {
                setCompanies(data)
            })
    }, [])

    const [formData, setFormdata] = useState(null)

    useEffect(() => {
    if (vehicleData) {
        setFormdata({
            company: vehicleData.company,
            vehicle_name: vehicleData.vehicle_name,
            vehicle_rent_price: vehicleData.vehicle_rent_price,
            vehicle_desc: vehicleData.vehicle_desc,
            image1: null,
            image2: null,
            image3: null,
            image4: null,
            vehicle_fuel_type: vehicleData.vehicle_fuel_type,
            vehicle_model_year: vehicleData.vehicle_model_year
        });
    }
}, [vehicleData]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormdata(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleImage = (e) => {
        const { name, files } = e.target
        setFormdata(prevState => ({
            ...prevState,
            [name]: files[0]
        }))
    }

        const handleUpdate = async (e) => {
        e.preventDefault()
        
        const formDataToSend = new FormData()
        
        // Append all fields to FormData
        formDataToSend.append('company', formData.company)
        formDataToSend.append('vehicle_name', formData.vehicle_name)
        formDataToSend.append('vehicle_rent_price', formData.vehicle_rent_price)
        formDataToSend.append('vehicle_desc', formData.vehicle_desc)
        formDataToSend.append('vehicle_fuel_type', formData.vehicle_fuel_type)
        formDataToSend.append('vehicle_model_year', formData.vehicle_model_year)
        
        // Only append images if they were changed
        if (formData.image1) formDataToSend.append('image1', formData.image1)
        if (formData.image2) formDataToSend.append('image2', formData.image2)
        if (formData.image3) formDataToSend.append('image3', formData.image3)
        if (formData.image4) formDataToSend.append('image4', formData.image4)

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/update-vehicle/${vehicleData.id}/`, {
                method: 'PUT',
                body: formDataToSend,
                
            })

            const data = await response.json()

            if (response.ok) {
                toast.success(data.message)
                setTimeout(()=>{
                    navigate('/admin-managevehicle')
                },2000)
                
            } else {
                toast.error(data.message || 'Failed to update vehicle')
            }
        } catch (error) {
            toast.error('Network error occurred')
            console.error('Update error:', error)
        }
    }



    return (
        <AdminLayout>
            <div className="shadow m-4 p-6 bg-white rounded">
                <h2 className="text-3xl font-semibold text-center mb-6 flex items-center justify-center">
                    <RiMotorbikeFill className="me-2" /> Edit Vehicle
                </h2>
{formData && (
                <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    encType="multipart/form-data"
                    onSubmit={handleUpdate}
                >
                    <div>
                        <label className="block mb-2 font-medium">Vehicle Name</label>
                        <input
                            type="text"
                            name="vehicle_name"
                            value={formData.vehicle_name}
                            className="w-full p-2 border rounded"
                            placeholder="Enter Vehicle Name"
                            onChange={handleChange} required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Company</label>
                        <select
                            name="company"
                            className="w-full p-2 border rounded"
                            value={formData.company}
                            onChange={handleChange} required
                        >
                            <option value="">Select Company</option>
                            {companies.map((com) => (
                                <option key={com.id} value={com.id}>
                                    {com.company_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 font-medium">Vehicle Description</label>
                        <textarea
                            name="vehicle_desc"
                            value={formData.vehicle_desc}
                            className="w-full p-2 border rounded h-24"
                            placeholder="Enter Description"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Price Per Day (In Rs.)</label>
                        <input
                            type="number"
                            name="vehicle_rent_price"
                            value={formData.vehicle_rent_price}
                            className="w-full p-2 border rounded"
                            onChange={handleChange} required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Select Fuel Type</label>
                        <select
                            name="vehicle_fuel_type"
                            value={formData.vehicle_fuel_type}
                            className="w-full p-2 border rounded"
                            onChange={handleChange} required
                        >
                            <option value="">Select Fuel Type</option>
                            <option>Petrol</option>
                            <option>CNG</option>
                            <option>Electric</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Model Year</label>
                        <input
                            type="text"
                            name="vehicle_model_year"
                            value={formData.vehicle_model_year}
                            className="w-full p-2 border rounded"
                            onChange={handleChange} required
                        />
                    </div>

                    <div className="md:col-span-2 mt-8">
                        <h3 className="text-red-600 text-lg font-semibold mb-4">Upload Images</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">Image1</label>
                                <input
                                    name="image1"
                                    type="file"
                                    accept="image/*"
                                    className="w-full p-2 border rounded"
                                    onChange={handleImage} 
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Image2</label>
                                <input
                                    name="image2"
                                    type="file"
                                    accept="image/*"
                                    className="w-full p-2 border rounded"
                                    onChange={handleImage} 
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Image3</label>
                                <input
                                    name="image3"
                                    type="file"
                                    accept="image/*"
                                    className="w-full p-2 border rounded"
                                    onChange={handleImage} 
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Image4</label>
                                <input
                                    name="image4"
                                    type="file"
                                    accept="image/*"
                                    className="w-full p-2 border rounded"
                                    onChange={handleImage} 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 mt-8 text-center">
                        <button
                            type="submit"
                            className="btn px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 inline-flex items-center gap-2"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
                )}

                <ToastContainer autoClose={2000} />
            </div>
        </AdminLayout>
    )
}

export default EditVehicle
