import { useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import TripList from './components/TripList'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <div className='flex flex-col gap-5 justify-center items-center mt-10'>
        <div className='flex gap-4'>
          <span className='text-6xl rounded-xl font-bold shadow'>🚞</span>
          <div className='flex flex-col gap-2'>
            <h1 className='font-semibold text-4xl'>PlanGo</h1>
            <span className='font-semibold text-lg text-gray-500 leading-1'>Smart Travel Planner</span>
          </div>
        </div>
        <div className='lg:w-[90vw] mt-5'>
          <AppRoutes />
          <div className='lg:w-[50vw] md:w-[80vw] mt-20 m-auto'>
            <TripList />
          </div>
          <div className='h-px bg-gray-300 mt-10'></div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
