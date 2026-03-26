import Groq from 'groq-sdk'
import dotenv from 'dotenv'
import Trip from '../models/Trip.js'
import getPlaceImage from '../services/imageApi.js'
dotenv.config()

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

const generateItinerary = async (req, res) => {
    try {
        console.log("data recienved at api endpoint - ", req.body);

        const { destination, days, budget, interests } = req.body;
        const prompt = `
        create a ${days}-day travel itinerary for ${destination}.
        Budget: ${budget}
        Interests: ${interests}
        Return a dayby-day travel plan.
        Consider Budget currency for the destination which is given like if budget is given as 2000 for any country in europe than consider it as euros. 
        Return the response in an organized structure like json so that it can be converted to cards later for every day
        Return ONLY valid JSON.

Return ONLY valid JSON.

Structure:

{
  "destination": "",
  "days": {
    "Day 1": {
      "title": "",
      "timeline": {
        "08:00": "",
        "10:00": ""
      }
    },
    "Day 2": {
      "title": "",
      "timeline": {}
    }
  },
  "budget": {
    "accommodation": "",
    "transportation": "",
    "food": "",
    "activities": "",
    "total": ""
  }
}

Return STRICT JSON only and no value should be empty like '"day1": {}'.
Ensure all keys and strings use double quotes as given above.
No comments, no extra text, no explanation.
I should not face parsing issues in your response.
    `
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: "You are a JSON generator. Only output valid JSON"
                }
                , {
                    role: 'user',
                    content: prompt
                }
            ],
            model: 'llama-3.1-8b-instant'
        });
        const image = await getPlaceImage(destination)
        let itinerary = completion.choices[0].message.content
        itinerary = itinerary.replace(/^```json|```$/g, "").trim();
        itinerary = itinerary.replace(/^json\s*/i, "").trim();
        const slug = `${destination}-${days}-days-${interests}-${Date.now()}`.toLowerCase().replace(/,\s*| , \s*| ,\s*|, \s*| and\s*|\s+/gi, "-").replace(/[^\w-]+/g, "")
        const trip = new Trip({
            slug,
            image,
            destination,
            days,
            budget,
            interests,
            itinerary
        })
        await trip.save()
        res.json({
            success: true,
            slug,
            image,
            destination,
            days,
            budget,
            interests,
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

const getTrip = async (req, res) => {
    try {
        const trip = await Trip.findOne({ slug: req.params.slug })
        res.json(trip)
    } catch (error) {
        res.status(500).json({ message: "Error fetching trip." })
    }
}

const getRecentTrips = async (req, res) => {
    try {
        const trips = await Trip.find().sort({ createdAt: -1 }).limit(12)
        console.log("recent trips length is - ", trips.length);

        res.json(trips)
    } catch (error) {
        red.status(500).json({ message: "Error fetching trips" })
    }
}

export default { generateItinerary, getTrip, getRecentTrips };