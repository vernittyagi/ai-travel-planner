import mongoose from "mongoose";

const tripSchema = mongoose.Schema({
    destination: {
        type: String,
        required : true
    },
    days: {
        type: Number,
        required : true
    },
    budget: {
        type: String,
    },
    interests: {
        type: String,
    },
    itinerary: {
        type: String,
    },
    createdAt: {
        type: Date,
        default : Date.now    
    },
}) 

export default mongoose.model("Trip", tripSchema)