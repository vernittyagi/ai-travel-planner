import Groq from 'groq-sdk'
import dotenv from 'dotenv'
import Trip from '../models/Trip.js'

dotenv.config()

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

const generateItinerary = async (req, res) => {
    try {
        const { destination, days, budget, interests } = req.body;
        const prompt = `
        create a ${days}-day travel itinerary for ${destination}.
        Budget: ${budget}
        Interests: ${interests}
        Return a dayby-day travel plan. 
    `
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            model: 'llama-3.1-8b-instant'
        });
        const itinerary = completion.choices[0].message.content
        const trip = new Trip({
            destination,
            days,
            budget,
            interests,
            itinerary
        })
        await trip.save()
        res.json({
            success: true,
            itinerary
        })

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to generate itinerary."
        })
        
    }

}

const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find().sort({createdAt: -1})
        res.json(trips) 
    } catch (error) {
        res.json(500).json({message: "Error fetching trips."})
    }
}

export default {generateItinerary, getTrips};