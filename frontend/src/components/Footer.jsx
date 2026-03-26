import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
    return (
        <>
            <div className='flex max-md:flex-col gap-10 justify-around items-center mt-20 w-full mb-10'>
                <div className='flex gap-4'>
                    <span className='text-6xl rounded-xl font-bold shadow'>🚞</span>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-semibold text-4xl'>PlanGo</h1>
                        <span className='font-semibold text-lg text-gray-500 leading-1'>Smart Travel Planner</span>
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <h2 className='text-4xl'>Contact Us</h2>
                    <div className='flex gap-2'>
                        <a href="mailto:vernittyagi@gmail.com"><span className='text-purple-800 text-2xl font-bold'><MdOutlineEmail /></span></a>
                        <div className='w-px bg-black'></div>
                        <a href="https://www.linkedin.com/in/tyagivernit/" target='__blank'><span className='text-2xl text-blue-800'><FaLinkedin /></span></a>
                    </div>
                </div>
                <div className='text-gray-500 font-semibold text-center'>
                    © 2026 PlanGo by Vernit Tyagi. All rights reserved.
                </div>
            </div>
        </>
    )
}

export default Footer
