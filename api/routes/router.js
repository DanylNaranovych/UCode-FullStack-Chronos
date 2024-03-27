import express from "express";
import authRouter from "./authRouter.js";
import calendarsRouter from "./calendarsRouter.js";
import eventsRouter from "./eventsRouter.js";
import usersRouter from "./usersRouter.js";
import TokenService from "../utils/tokenService.js";

const router = express.Router();

router.use("/auth", (req, res, next) => next(), authRouter);
router.use('/calendars', TokenService.check, calendarsRouter);
router.use('/events', TokenService.check, eventsRouter);
router.use('/users', TokenService.check, usersRouter);
// router.use('/comments', (req, res, next) => next(), commentsRouter);

export default router;