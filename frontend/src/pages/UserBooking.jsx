import React, { useState, useEffect } from 'react';
import PublicLayout from '../components/PublicLayout';
import { Link } from 'react-router-dom';

const UserBooking = () => {
    const [myBookings, setMybookings] = useState([]);
    const userId = localStorage.getItem('userID');

    const fetchBookings = (userId) => {
        fetch(`https://motorental-backend.onrender.com/api/user-bookings/${userId}`)
            .then(res => res.json())
            .then(data => {
                setMybookings(data.userBookings || []);
            })
            .catch(err => console.error('Error fetching bookings:', err));
    };

    useEffect(() => {
        if (userId) {
            fetchBookings(userId);
        }
    }, [userId]);

    return (
        <PublicLayout>
            <div className='flex items-center justify-center font-medium leading-tight bg-gradient-to-b from-neutral-600 to-white bg-clip-text mt-9 tracking-tighter'>
                <h1>My Bookings</h1>
            </div>
            <div className='h-[10vh]'></div>
            <div>
                {myBookings.length === 0 ? (
                    <div className='flex items-center justify-center'>
                        <h2 className='text-2xl text-neutral-500'>Oops.. you don't have any bookings <Link to='/bike-listing' className='!text-pink-500 !underline'>Book your ride now</Link></h2>
                    </div>
                ) : (
                    <table className='border-collapse border-black border-3 w-full rounded-lg overflow-hidden shadow-sm m-2'>
                        <thead className='font-medium text-center'>
                            <tr>
                                <th className='font-medium border border-neutral-800'>Sr No.</th>
                                <th className='font-medium border border-neutral-800'>Booking ID</th>
                                <th className='font-medium border border-neutral-800'>Vehicle</th>
                                <th className='font-medium border border-neutral-800'>Start Date</th>
                                <th className='font-medium border border-neutral-800'>End Date</th>
                                <th className='font-medium border border-neutral-800'>Total Price</th>
                                <th className='font-medium border border-neutral-800'>Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {myBookings.map((booking, index) => (
                                <tr key={booking.vehicle_id}>
                                    <td className='text-center border border-neutral-800 px-4 py-3'>{index + 1}</td>
                                    <td className='text-center border border-neutral-800 px-4 py-3'>{booking.booking_id}</td>
                                    <td className='text-center border border-neutral-800 px-4 py-3'>{booking.vehicle_name}</td>
                                    <td className='text-center border border-neutral-800 px-4 py-3'>{booking.start_date}</td>
                                    <td className='text-center border border-neutral-800 px-4 py-3'>{booking.end_date}</td>
                                    <td className='text-center border border-neutral-800 px-4 py-3'>{booking.total_price}</td>
                                    <td className='text-center border border-neutral-800 px-4 py-3'>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium
      ${booking.status === 'PENDING' && 'bg-yellow-100 text-yellow-700'}
      ${booking.status === 'APPROVED' && 'bg-green-100 text-green-700'}
      ${booking.status === 'CANCELLED' && 'bg-red-100 text-red-700'}
    `}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <div className='h-[20vh]'></div>
            <div className='h-full'></div>
        </PublicLayout>
    );
};

export default UserBooking;
