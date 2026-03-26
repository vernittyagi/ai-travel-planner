import React from "react";
import { getRecentTrips } from '../services/api'
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TripList = () => {
  const [trips, setTrips] = useState([])
  const hasFetched = useRef(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (hasFetched.current) return;
    const fetchTrips = async () => {
      console.log("trips before fetching - ", trips);

      const res = await getRecentTrips()
      console.log('data recieved from get api -', res.data);
      setTrips(res.data)
    }
    fetchTrips()
    hasFetched.current = true;
  }, []
  )

  const handleClick = (slug) => {
    console.log("slug passed in handle is - ", slug);

    navigate(`/my-trip/${slug}`)
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-20 border border-gray-300 p-10 md:rounded-2xl shadow-2xl">
      <h2 className="text-4xl text-gray-800 mb-4">People also created</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {trips?.filter(trip => !window.location.href.toLowerCase().includes(trip.slug)).map((trip, index) => {
          const descriptionInterests = trip.interests.replace(/,\s*| , \s*| ,\s*|, \s*| and\s*|\s+/gi, '-')
          return (
            <div
              key={trip._id}
              onClick={() => handleClick(trip.slug)}
              className="flex flex-col items-center text-center border border-gray-300 rounded-2xl overflow-hidden hover:cursor-pointer shadow hover:shadow-2xl transition-all">
              <img
                className="w-full max-md:w-[90vw] h-70 object-cover"
                src={trip.image} />
              <div className="flex flex-col items-center gap-3 mb-4">
                <span className="capitalize max-md:text-sm font-semibold mx-2">{trip.days} days {trip.destination} trip plan for {descriptionInterests}</span>
                <div className="flex gap-2 max-md:text-sm">
                  <span className="bg-gray-200 text-black rounded-sm font-light text-sm px-2">{trip.days} days</span>
                  <span className="bg-gray-200 text-black rounded-sm font-light text-sm px-2">{trip.destination.split(" ")[0]}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TripList;