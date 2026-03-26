import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TripForm from '../components/TripForm'
import MyTrip from '../components/MyTrip'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={< TripForm/>} />
        <Route path="/my-trip/:slug" element={< MyTrip/>} />
    </Routes>
  )
}

export default AppRoutes
