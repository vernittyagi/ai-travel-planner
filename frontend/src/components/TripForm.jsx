import { useForm } from 'react-hook-form'
import { generateTrip } from '../services/api.js'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

const TripForm = () => {
  const navigate = useNavigate()
  const [trip, setTrip] = useState()
  const [suggestions, setSuggestions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  //Res to prevent re-fetch on click & detect outside click
  const isSelectingRef = useRef(false);
  const dropdownContainerRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY.trim();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm()

  const onSubmit = async (data) => {
    const res = await generateTrip(data)
    setTrip(res.data)
    navigate(`/my-trip/${res.data.slug}`)
  }

  const destination = watch("destination")

  //close dropdown when clicking outside destination wrapper

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(dropdownContainerRef.current && dropdownContainerRef.current.contains(event.target)){
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [])

  //Fetch autocomplete suggestions only when user types

  useEffect(() => {
    //!skip api call if destination changed because user clicked a suggestion
    if(isSelectingRef.current){
      isSelectingRef.current = false;
      return
    }

    const delay = setTimeout(async () => {
      if (!destination || destination.length < 2) {
        setSuggestions([])
        setShowDropdown(false)
        return
      }
      try {
        const res = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(destination)}&apiKey=${API_KEY}`);
        const data = await res.json();
        setSuggestions(data.features || []);
        setShowDropdown(true);
      } catch (err) {
        console.error("Geoapify error", err)
      }
    }, 300);
    return () => clearTimeout(delay)
  }, [destination])

  const handleSelectPlace = (place) => {
    const mainPlace =
      place.properties.formatted.split(",")[0] ||
      place.properties.formatted.split("-")[0] ||
      place.properties.formatted.split(" ")[0];

    // Flag that this change came from a click, not typing
    isSelectingRef.current = true;
    setValue("destination", mainPlace, { shouldValidate: true })
    setSuggestions([])
    setShowDropdown(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex max-md:flex-col gap-4 justify-center items-center text-gray-500 mt-5'>
      <div ref={dropdownContainerRef} className='relative'>
        <input 
        className='bg-gray-200 p-3 rounded-md max-md:w-[90vw]' 
        {...register("destination", { required: true })} placeholder='Destination' 
        autoComplete='off'
        onFocus={() => suggestions.length > 0 && setShowDropdown(true)}/>
        {showDropdown && suggestions?.length > 0 && (
          <div className='absolute top-full left-0 w-full bg-white shadow-lg rounded mt-2 z-10 max-h-60 overflow-y-auto'>
            {suggestions?.map((place) => (
              <div
                key={place.properties.place_id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectPlace(place);
                }}
                className='p-2 hover:bg-gray-100 cursor-pointer text-sm'
              >
                {place.properties.formatted}
              </div>
            ))}
          </div>
        )}
      </div>

      <input className='bg-gray-200 p-3 rounded-md max-md:w-[90vw]' {...register("days", { required: true })} placeholder='Days' />
      <input className='bg-gray-200 p-3 rounded-md max-md:w-[90vw]' {...register("budget", { required: true })} placeholder='Budget (destination currency)' />
      <input className='bg-gray-200 p-3 rounded-md max-md:w-[90vw]' {...register("interests", { required: true })} placeholder='Interests' />
      {/* <input className='bg-blue-500 text-white font-bold p-3 rounded-md hover:cursor-pointer' disabled={isSubmitting} type="submit" value="Submit"/> */}
      <button
        type="submit"
        disabled={isSubmitting}
        className='bg-blue-500 text-white font-bold p-3 rounded-md flex gap-2 justify-center items-center hover:cursor-pointer disabled:opacity-50 max-md:w-[90vw]'
      >
        {isSubmitting ? (
          <>
            <span className='w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
            Generating itinerary
          </>
        ) : ("Submit")}
      </button>
    </form>
  )
}

export default TripForm
