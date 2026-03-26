import mongoose from "mongoose";

const tripSchema = mongoose.Schema({
    slug: {
        type: String,
        unique: true
    },
    image: {
        type: String,
    },
    destination: {
        type: String,
        required : true
    },
    days: {
        type: Object,
        required : true
    },
    budget: {
        type: Object,
    },
    interests: {
        type: String,
    },
    itinerary: {
        type: mongoose.Schema.Types.Mixed,
    },
    createdAt: {
        type: Date,
        default : Date.now    
    },
}) 

export default mongoose.model("Trip", tripSchema)