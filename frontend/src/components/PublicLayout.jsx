import React from 'react'
import Navbar from '../components/Navbar'

const PublicLayout = ({ children }) => {
    return (
        <div className='bg-gradient-to-b from-[#e9d5ff] to-white min-h-screen flex flex-col justify-between'>
            {/* Top Section */}
            <div className='relative max-w-7xl w-full mx-auto px-4'>

                {/* Vertical Lines */}
                <div className='absolute inset-y-0 left-0 w-px bg-gradient-to-t from-white to-[#f0abfc] z-0'></div>
                <div className='absolute inset-y-0 right-0 w-px bg-gradient-to-t from-white to-[#f0abfc] z-0'></div>

                {/* Navbar */}
                <div className='relative z-10'>
                    <Navbar />
                </div>

                {/* Content */}
                <div className='relative z-10 mt-4'>
                    {children}
                </div>
            </div>

            {/* Footer */}
            <footer className='text-center py-4 text-sm text-neutral-600'>
                &copy; MOTORENTAL 2025. All rights reserved
            </footer>
        </div>
    )
}

export default PublicLayout
