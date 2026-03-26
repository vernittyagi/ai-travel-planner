import React from 'react'
import { useParams } from 'react-router-dom'
import { getTrip } from '../services/api'
import { useState, useEffect } from 'react'

const MyTrip = () => {
    const { slug } = useParams()
    const [trip, setTrip] = useState(null)
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);

        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        const fetchTrip = async () => {
            const res = await getTrip(slug)
            console.log('data recieved from get api -', res.data);
            setTrip(res.data)
        }
        if (slug) {
            fetchTrip()
        }
    }, [slug]
    )

    if (!trip) {
        return (
            <div className="animate-pulse p-10">
                <div className="h-60 bg-gray-300 rounded-xl mb-6"></div>
                <div className="h-6 bg-gray-300 w-1/2 mb-4"></div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="h-40 bg-gray-300 rounded"></div>
                    <div className="h-40 bg-gray-300 rounded"></div>
                    <div className="h-40 bg-gray-300 rounded"></div>
                </div>
            </div>
        );
    }

    const itinerary =
        typeof trip.itinerary === "string"
            ? JSON.parse(trip.itinerary)
            : trip.itinerary

    const titleInterests = trip.interests.replace(/,\s*| , \s*| ,\s*|, \s*| and\s*|\s+/gi, '•')

    return (
        <>
            <div className='relative md:rounded-2xl overflow-hidden shadow-lg'>
                <img src={trip.image} className='w-full h-85 object-cover' />
                {/* overlay */}
                <div className='absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-white text-center'>
                    <h1 className='text-4xl font-bold mb-2'>{trip.destination} Trip Plan</h1>
                    <p className='text-lg opacity-90 capitalize tracking-widest'>{trip.days} Days | {titleInterests}</p>
                    <button
                        onClick={handleCopy}
                        className="bg-purple-800 text-white font-semibold px-4 py-2 rounded-2xl mt-4 hover:cursor-pointer"
                    >
                        {copied ? "✅ Copied!" : "🔗 Share Trip"}
                    </button>
                </div>
            </div>

            {/* trip details */}

            <div
                className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 transition-all'>
                {Object.entries(itinerary.days).map(([day, details]) => (
                    <div key={day} className='bg-white rounded-2xl shadow-md p-5 hover:shadow-2xl transition duration-300'>
                        <h2 className='text-xl font-bold text-blue-600 mb-2'>{day}</h2>
                        <p className='font-semibold mb-3'>{details.title}</p>
                        <div className='space-y-2 text-gray-700 text-sm'>
                            {Object.entries(details.timeline).map(([time, activity]) => (
                                <p key={time}>
                                    <span className='font-bold'>{time}</span> - {activity}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* budget section */}

            <div
                className='mt-10 bg-gray-100 p-6 rounded-2xl shadow'>
                <h2 className='text-2xl mb-4 font-bold'>Budget breakdown💰</h2>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {Object.entries(itinerary.budget).map(([key, value]) => (
                        <div key={key} className='bg-white p-4 rounded-xl shadow'>
                            <p className='text-sm text-gray-500 capitalize'>{key}</p>
                            <p className='font-bold'>{value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MyTrip