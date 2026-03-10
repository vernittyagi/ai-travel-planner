import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import itineraryRoutes from './routes/itineraryRoutes.js'
import connectDb from './config/db.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express()

app.use(cors());
app.use(express.json());
connectDb()
app.get("/", (req,res) => {
    console.log("hitting get api");
    res.send("AI Travel Planner is running")
})

app.use("/api", itineraryRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
