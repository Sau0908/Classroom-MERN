import express from "express";
import {
  createClassroom,
  getAllClassroom,
  assignTeacherToClassroom,
} from "../controllers/classroomController.js";
import { isPrincipal } from "../middlewares/auth.js";

const router = express.Router();

router.get("/",  getAllClassroom);
router.post("/",  createClassroom);
router.post("/assignteacher", assignTeacherToClassroom);

export default router;
