import express from "express";
import {
  getAllTeacher,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacherController.js";
import { auth, isPrincipal, isForStudent } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllTeacher);
router.put("/:id", isPrincipal, updateTeacher);
router.delete("/:id", isPrincipal, deleteTeacher);
export default router;
