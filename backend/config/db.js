import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectDb =  async () => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Mongo DB Connected...")
}

export default connectDb