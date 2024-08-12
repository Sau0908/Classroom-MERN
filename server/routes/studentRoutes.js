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
router.post("/assignteacher", isPrincipal, assignTeacherToStudent);
router.put("/:id", isForStudent, updateStudent);
router.delete("/:id", isForStudent, deleteStudent);
export default router;
