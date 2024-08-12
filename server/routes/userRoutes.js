import express from "express";
import {
  createPrincipal,
  createStudent,
  createTeacher,
  login,
} from "../controllers/userController.js";
import { auth, isPrincipal, isForStudent } from "../middlewares/auth.js";

const router = express.Router();

router.post("/createPrincipal", createPrincipal);
router.post("/createTeacher", auth, isPrincipal, createTeacher);
router.post("/createStudent", auth, isForStudent, createStudent);
router.post("/login", login);

export default router;
