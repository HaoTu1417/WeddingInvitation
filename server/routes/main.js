import express from "express";
import { createCourse } from "../controllers/course.js";
import { createQuest, getQuests } from "../controllers/guest.js";

const router = express.Router();
router.post("/courses", createCourse);
router.post("/guests", createQuest);
router.get("/guestlist", getQuests);
export default router;
