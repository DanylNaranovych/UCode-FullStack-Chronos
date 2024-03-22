import express from "express";
import authRouter from "./authRouter.js";
import calendarsRouter from "./calendarsRouter.js";
import eventsRouter from "./eventsRouter.js";
import TokenService from "../utils/tokenService.js";

const router = express.Router();

router.use("/auth", (req, res, next) => next(), authRouter);
router.use('/calendars', TokenService.check, calendarsRouter);
router.use('/events', TokenService.check, eventsRouter);
// router.use('/categories', (req, res, next) => next(), categoriesRouter);
// router.use('/comments', (req, res, next) => next(), commentsRouter);

export default router;