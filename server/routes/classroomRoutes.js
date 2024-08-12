import express from "express";
import {
  createClassroom,
  getAllClassroom,
  assignTeacherToClassroom,
} from "../controllers/classroomController.js";
import { isPrincipal } from "../middlewares/auth.js";

const router = express.Router();

router.get("/",  getAllClassroom);
router.post("/", isPrincipal, createClassroom);
router.post("/assignteacher", isPrincipal, assignTeacherToClassroom);

export default router;
