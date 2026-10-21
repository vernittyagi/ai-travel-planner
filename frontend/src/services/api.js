import axios from 'axios'

// baseURL: 'https://backend-chat-app-di8u.onrender.com/api'
const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

export const generateTrip = (data) => {
    console.log("data passed to api is ", data);
    
    return API.post('/itinerary', data)
}

export const getTrip = (slug) => {
    return API.get(`/trip/${slug}`)
}

export const getRecentTrips = () => {
    return API.get('/trips')
}
