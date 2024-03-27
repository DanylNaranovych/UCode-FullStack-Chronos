import express from "express";

import controller from "../controllers/eventsController.js";

const router = express.Router();

router.get('/:eventId', controller.getEvent);
router.delete('/:eventId', controller.deleteEvent);
router.patch('/:eventId', controller.updateEvent);
router.post('/share', controller.shareEvent);
router.post('/share/:token', controller.confirmEvent);
router.get('/', controller.getAllCalendarEvents);
router.post('/', controller.createEvent);
// router.post('/:calendarId/add', controller.addUserToCalendar);
// router.delete('/:calendarId/delete', controller.deleteUserFromCalendar);


export default router;