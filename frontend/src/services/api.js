import axios from 'axios'

const API = axios.create({
    baseURL: 'https://backend-chat-app-di8u.onrender.com/api'
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
