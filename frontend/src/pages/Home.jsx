import React, { useState, useEffect } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import PublicLayout from '../components/PublicLayout';
import { MdOutlineTimer } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { CiMoneyCheck1 } from "react-icons/ci";
import { MdDirectionsBike } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { FaGasPump } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";





const Home = () => {

  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = () => {
    fetch('http://127.0.0.1:8000/api/manage-vehicle/')
      .then(res => res.json())
      .then(data => {
        setVehicles(data)
      })
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  return (
    <PublicLayout>
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-20">

        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-700 to-neutral-900">
            Rent Your Dream Ride <span className='text-transparent bg-clip-text bg-gradient-to-b from-neutral-700 to-neutral-900'>Today!</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Choose from top motorbikes, book in minutes, and start your journey hassle-free.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <button className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-md shadow-md transition duration-200">
              Explore Bike
            </button>
            <button className="bg-transparent border border-neutral-300 hover:bg-neutral-200 text-neutral-800 px-6 py-3 rounded-md shadow-sm transition duration-200 flex items-center">
              Book Now <FaArrowRightLong className="ml-2 text-neutral-500" />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 mb-10 md:mb-0 group">
          <img
            className="w-full h-auto rounded-xl shadow-lg border border-neutral-400 group-hover:scale-102 group-hover:!shadow-2xl transition duration 200 ease"
            src="https://cloudinary.poladv.com/dnmadhbfi/image/fetch/f_auto/q_auto/dpr_2/c_fit,h_400,ar_7:4,w_1300/https://adventures.polaris.com/img/indian-rentals.jpg"
            alt="Motorbike Rental"
          />
        </div>
      </div>
      <div className='relative w-full'>
        <div className='absolute top-0 w-full h-px bg-gradient-to-r from-neutral-100 via-[#f0abfc] to-neutral-100 z-0'></div>
      </div>
      <div className='h-[5vh]'></div>
      <div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 my-20 px-2 items-center justify-center'>
          <div className="group flex items-center bg-white shadow-md py-7 hover:bg-pink-50 hover:shadow-xl transition duration-200">
            <div className="bg-pink-400 p-4">
              {/* Replace with actual icon */}
              <span className="text-white text-2xl"><TfiHeadphoneAlt /></span>
            </div>
            <p className="font-bold text-gray-800 group-hover:text-pink-500 text-sm sm:text-base ms-15">24/7 CUSTOMER<br />SUPPORT</p>
            <h1 className='text-neutral-100 group-hover:text-neutral-400 duration-200 font-medium ms-auto me-2'>01</h1>
          </div>
          <div className="group flex items-center bg-white shadow-md py-7 hover:bg-pink-50 hover:shadow-xl transition duration-200">
            <div className="bg-pink-400 p-4">
              {/* Replace with actual icon */}
              <span className="text-white text-2xl"><MdOutlineTimer /></span>
            </div>
            <p className="font-bold text-gray-800 group-hover:text-pink-500 text-sm sm:text-base ms-15">BOOK BIKE<br />ANYTIME</p>
            <h1 className='text-neutral-100 group-hover:text-neutral-400 duration-200 font-medium ms-auto me-2'>02</h1>
          </div>
          <div className="group flex items-center bg-white shadow-md py-7 hover:bg-pink-50 hover:shadow-xl transition duration-200">
            <div className="bg-pink-400 p-4">
              {/* Replace with actual icon */}
              <span className="text-white text-2xl"><IoLocationOutline /></span>
            </div>
            <p className="font-bold text-gray-800 group-hover:text-pink-500 text-sm sm:text-base ms-15">MULTIPLE PICKUP<br />POINTS</p>
            <h1 className='text-neutral-100 group-hover:text-neutral-400 duration-200 font-medium ms-auto me-2'>03</h1>
          </div>
        </div>
        <div className='max-w-7xl mx-auto px-6 py-20'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-neutral-700 to-neutral-900'>
              Our Services
            </h2>
            <p className='mt-4 text-gray-600'>We offer reliable and accessible services to make your rental experience seamless.</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Service Card 1 */}
            <div className='group bg-white rounded-lg shadow-md p-6 hover:bg-pink-50 hover:shadow-xl transition duration-300'>
              <div className='flex items-center gap-4 mb-4'>
                <div className='bg-pink-400 text-white p-3 rounded-full text-2xl'>
                  <MdDirectionsBike />
                </div>
                <h3 className='text-lg font-semibold text-neutral-800 group-hover:text-pink-500 transition'>BIKE RENTAL</h3>
              </div>
              <p className='text-gray-600 group-hover:text-neutral-800'>
                Our team is available around the clock to help you with your queries and ensure a smooth ride.
              </p>
            </div>

            {/* Service Card 2 */}
            <div className='group bg-white rounded-lg shadow-md p-6 hover:bg-pink-50 hover:shadow-xl transition duration-300'>
              <div className='flex items-center gap-4 mb-4'>
                <div className='bg-pink-400 text-white p-3 rounded-full text-2xl'>
                  <CiMoneyCheck1 />
                </div>
                <h3 className='text-lg font-semibold text-neutral-800 group-hover:text-pink-500 transition'>FLEXIBLE PAYMENT</h3>
              </div>
              <p className='text-gray-600 group-hover:text-neutral-800'>
                Rent your dream ride anytime with our easy booking system — fast and flexible!
              </p>
            </div>

            {/* Service Card 3 */}
            <div className='group bg-white rounded-lg shadow-md p-6 hover:bg-pink-50 hover:shadow-xl transition duration-300'>
              <div className='flex items-center gap-4 mb-4'>
                <div className='bg-pink-400 text-white p-3 rounded-full text-2xl'>
                  <GrServices />
                </div>
                <h3 className='text-lg font-semibold text-neutral-800 group-hover:text-pink-500 transition'>BIKE INSPECTION</h3>
              </div>
              <p className='text-gray-600 group-hover:text-neutral-800'>
                Choose from convenient pickup spots across the city for ultimate flexibility.
              </p>
            </div>
          </div>
        </div>
        <div className='h-[5vh]'></div>
        <div className='relative w-full'>
          <div className='absolute top-0 w-full h-px bg-gradient-to-r from-neutral-100 via-[#f0abfc] to-neutral-100 z-0'></div>
        </div>
        <div className='h-[20vh]'></div>
        <div className='relative h-[80vh] mt-9 rounded-2xl overflow-hidden group'>
          {/* Blurred Background Image */}
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm group-hover:scale-110 transition duration 50 ease'
            style={{
              backgroundImage: 'url("https://images.pexels.com/photos/33311354/pexels-photo-33311354.png")',
            }}
          ></div>

          {/* Overlay to darken image slightly */}
          <div className='absolute inset-0 bg-black/40'></div>

          {/* Clear Text Content */}
          <div className='relative z-10 h-full flex items-center justify-center'>
            <div className='text-center text-white p-6'>
              <h1 className='text-4xl md:text-6xl font-bold mb-4'>50% OFF</h1>
              <p className='text-lg md:text-xl'>On your first motorbike rental</p>
              <button className='mt-6 px-6 py-2 bg-pink-500 text-white font-semibold cursor-pointer rounded hover:bg-pink-600 transition duration-200'>
                Book Now
              </button>
            </div>
          </div>
        </div>

        <div className='h-[15vh]'></div>
        <div className='max-w-6xl mx-auto mt-5 py-6 px-5'>
          <div className='flex items bg-center justify-center'>
            <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-neutral-700 to-neutral-900'>Featured Bike</h1>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 my-20 px-2 items-center justify-center group'>
            {vehicles.map((v, idx) => (
              <div className='w-full bg-neutral-200 h-[45vh] rounded shadow-md group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 transition duration 200 '>
                <div className=' flex justify-center'>
                  <img
                    src={`http://127.0.0.1:8000${v.image1}`}
                    alt={v.image1}
                    className="mt-5 h-[150px] rounded object-contain"
                  />
                </div>
                <div className='flex items-center justify-center mt-4 font-semibold text-2xl text-neutral-800'>
                  <h2>{v.vehicle_name}</h2>
                </div>
                <div className='flex items-center justify-center mt-5 text-center'>
                  <SlCalender className='me-2 text-pink-500' /><span className='font-medium text-lg'>{v.vehicle_model_year} Model</span><span className='text-neutral-500 ms-4 me-4'>|</span><FaGasPump className='me-2 text-pink-500' /><span className='font-medium text-lg'>{v.vehicle_fuel_type}</span>
                </div>
                <div className='flex items-center justify-center'>
                  <button className='mt-6 px-6 py-2 bg-pink-500 text-white font-semibold cursor-pointer rounded hover:bg-pink-600 transition duration-200'>
                    {v.vehicle_rent_price} ₹/ Day
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Home;
