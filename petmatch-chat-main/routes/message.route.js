import express from "express";

import {
    getMessages
}
from "../controller/message.controller.js";

import {
    isAuthenticated
}
from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get(
    "/:userId",
    isAuthenticated,
    getMessages
);

export default router;