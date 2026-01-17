import React, { useState, useEffect } from 'react'
import PublicLayout from '../components/PublicLayout'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { ToastContainer, toast } from 'react-toastify'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaMotorcycle } from 'react-icons/fa'
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";


const VehicleDetails = () => {
    const userId = localStorage.getItem('userID');
    const [vehicleDetail, setVehicledetail] = useState(null)
    const { vehicleId } = useParams();

    const fetchVehicleDetail = () => {
        fetch(`https://motorental-backend.onrender.com/api/detail-vehicle/${vehicleId}/`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                setVehicledetail(data.detailVehicle);
            })
            .catch(err => console.error("Fetch error:", err));
    };

    useEffect(() => {
        fetchVehicleDetail()
        if(!userId){
            alert('To book ride login first!')
            navigate('/login')
        }
        
    }, [vehicleId])


    const navigate = useNavigate()


    const [formData, setFormdata] = useState({
        start_date: '',
        end_date: '',
        description: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormdata(prev => ({ ...prev, [name]: value }))
    }

    const generateBookingId = () => {
        return Math.floor(Math.random() * 1000000) + 1;
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Get user ID from your auth system or localStorage
         // Make sure to store this on login
        

        const bookingData = {
            user_id: userId, // Send user ID from frontend
            vehicle_id: vehicleId, // From URL params
            start_date: formData.start_date,
            end_date: formData.end_date,
            description: formData.description
        };

        const response = await fetch('https://motorental-backend.onrender.com/api/vehicle-booking/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });

        const data = await response.json();

        if (response.ok) {
            if (data.success) {
                toast.success(`Booking Successful! ID: ${data.booking_id}`);
                setTimeout(() => navigate('/'), 2000);
            } else {
                toast.error(data.error || 'Booking failed');
            }
        } else {
            toast.error(data.error || 'Booking failed');
            console.error('Booking errors:', data.errors);
        }
    } catch (error) {
        toast.error('Network error. Please try again.');
        console.error('Booking error:', error);
    }
};

    return (
        <PublicLayout>
            <div className="max-w-6xl mt-5 px-3 py-5 mx-auto">
                <div className="flex items-center justify-center mb-6">
                    <h1 className="tracking-tight leading-tight bg-gradient-to-b from-neutral-600 to-white bg-clip-text font-medium text-2xl sm:text-3xl">
                        Vehicle Details
                    </h1>
                </div>
                <div className='h-[3vh]'></div>
                <div className='flex items-center justify-center'>
                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <div className='flex items-center justify-center'>
                                <CardTitle className='text-3xl font-bold leading-tight tracking-tight'>Book Now</CardTitle>
                            </div>
                            <div className='flex items-center justify-center'>
                                <CardDescription className='font-medium'>
                                    Book your ride now!
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Start Date</Label>
                                        <input className='border p-3 rounded-xl'
                                            id="email"
                                            type="date"
                                            placeholder="m@example.com"
                                            required
                                            name='start_date'
                                            value={formData.start_date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">End Date</Label>
                                        </div>
                                        <input className='border p-3 rounded-xl' id="password" name='end_date' value={formData.end_date} onChange={handleChange} placeholder='Enter Your Password' type="date" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Description</Label>
                                        </div>
                                        <textarea className='border p-3 rounded-xl' id="password" name='description' value={formData.description} onChange={handleChange} placeholder='Enter Your Description' required />
                                    </div>
                                </div>
                                <CardFooter className="flex-col gap-2 ">
                                    <Button type="submit" className="w-full cursor-pointer mt-6">
                                        Book Now
                                    </Button>
                                </CardFooter>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <div className='h-[8vh]'></div>
                {vehicleDetail && (
                    <div className="space-y-5">
                        <div className=''>

                        </div>
                        {/* Vehicle Info */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h2 className="text-lg sm:text-xl font-medium text-pink-500 flex items-center">
                                <FaMotorcycle className='me-2' /> Model: {vehicleDetail.vehicle_model_year}
                            </h2>
                            <h2 className="text-lg sm:text-xl font-medium text-pink-500 flex items-center">
                                <BsFillFuelPumpFill className='me-2' />  Fuel: {vehicleDetail.vehicle_fuel_type}
                            </h2>
                            <h2 className="text-lg sm:text-xl font-medium text-pink-500 flex items-center">
                                <FaRupeeSign className='me-2' />   Price: {vehicleDetail.vehicle_rent_price}
                            </h2>
                        </div>

                        {/* Vehicle Images */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <img
                                className="w-full h-auto max-h-64 object-cover rounded-2xl shadow-md hover:scale-105 transition duration-300"
                                src={vehicleDetail.image1}
                                alt="Vehicle"
                            />
                            <img
                                className="w-full h-auto max-h-64 object-cover rounded-2xl shadow-md hover:scale-105 transition duration-300"
                                src={vehicleDetail.image2}
                                alt="Vehicle"
                            />
                            <img
                                className="w-full h-auto max-h-64 object-cover rounded-2xl shadow-md hover:scale-105 transition duration-300"
                                src={vehicleDetail.image3}
                                alt="Vehicle"
                            />
                            <img
                                className="w-full h-auto max-h-64 object-cover rounded-2xl shadow-md hover:scale-105 transition duration-300"
                                src={vehicleDetail.image4}
                                alt="Vehicle"
                            />
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    )
}

export default VehicleDetails
