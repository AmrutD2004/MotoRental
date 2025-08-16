import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Admindashboard from './pages/Admindashboard'
import Sidebar from './components/Sidebar'
import AddCompany from './pages/AddCompany'
import ManageCompany from './pages/ManageCompany'
import AddVehicles from './pages/AddVehicles'
import ManageVehicle from './pages/ManageVehicle'
import Home from './pages/Home'
import EditVehicle from './pages/EditVehicle'
import Register from './pages/Register'
import UserLogin from './pages/UserLogin'
import BikeListing from './pages/BikeListing'
import VehicleDetails from './pages/VehicleDetails'
import UserBooking from './pages/UserBooking'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bike-listing" element={<BikeListing />} />
        <Route path="/user-booking" element={<UserBooking />} />
        <Route path="/vehicledetail/:vehicleId" element={<VehicleDetails />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/admin-login" element={<Login />} />
        <Route path="/admin-dashboard" element={<Admindashboard />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/admin-addcompany" element={<AddCompany />} />
        <Route path="/admin-managecompany" element={<ManageCompany />} />
        <Route path="/admin-addvehicles" element={<AddVehicles />} />
        <Route path="/admin-managevehicle" element={<ManageVehicle />} />
        <Route path="/admin-editvehicle" element={<EditVehicle />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
