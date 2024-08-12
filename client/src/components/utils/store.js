import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import teacherSlice from "../features/teacherSlice";
import studentSlice from "../features/studentSlice";
import classroomSlice from "../features/classroomSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    teacher: teacherSlice,
    student: studentSlice,
    classroom: classroomSlice,
  },
});
