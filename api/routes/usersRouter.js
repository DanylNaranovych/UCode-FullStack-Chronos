import express from "express";

import controller from "../controllers/userController.js";

const router = express.Router();

router.post('/photo', controller.updateUserPhoto);

export default router;