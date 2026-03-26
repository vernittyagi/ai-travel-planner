import express from 'express';
const router = express.Router();
import tripUtils  from '../controllers/iteneraryController.js';

router.post("/itinerary", tripUtils.generateItinerary);
router.get("/trip/:slug", tripUtils.getTrip)
router.get("/trips", tripUtils.getRecentTrips)

export default router