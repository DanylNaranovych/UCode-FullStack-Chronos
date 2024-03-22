import express from "express";

import controller from "../controllers/calendarsController.js";

const router = express.Router();

router.get('/', controller.getAllUserCalendars);
router.post('/', controller.createUserCalendar);
router.get('/:calendarId', controller.getCalendar);
router.delete('/:calendarId', controller.deleteCalendar);
router.patch('/:calendarId', controller.updateCalendar);
router.post('/:calendarId/add', controller.addUserToCalendar);
router.delete('/:calendarId/delete', controller.deleteUserFromCalendar);


export default router;