import express from "express";
import {
  getAllStudents,
  updateStudent,
  deleteStudent,
  getAllStudentsByGrade,
  assignTeacherToStudent,
} from "../controllers/studentController.js";
import { auth, isPrincipal, isForStudent } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllStudents);
router.get("/grouped", getAllStudentsByGrade);
router.post("/assignteacher", assignTeacherToStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
export default router;
