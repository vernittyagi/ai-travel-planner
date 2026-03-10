import express from 'express';
const router = express.Router();
import tripUtils  from '../controllers/iteneraryController.js';

router.post("/itinerary", tripUtils.generateItinerary);
router.get("/trips", tripUtils.getTrips)

export default router