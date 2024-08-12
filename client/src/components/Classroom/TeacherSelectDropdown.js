import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { assignTeacherToClassroom } from "../features/classroomSlice";

const TeacherSelectDropdown = ({ classroomId, assignedTeacherId }) => {
  const teacherList = useSelector((state) => state.teacher.teachers);
  const dispatch = useDispatch();

  const handleAssignTeacher = (teacherId) => {
    dispatch(assignTeacherToClassroom({ classroomId, teacherId }));
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>Select Teacher</InputLabel>
      <Select
        label="Select Teacher"
        value={assignedTeacherId || ""}
        onChange={(e) => handleAssignTeacher(e.target.value, classroomId)}
      >
        <MenuItem value="">
          <em></em>
        </MenuItem>
        {teacherList.map((teacher) => (
          <MenuItem key={teacher._id} value={teacher._id}>
            {teacher.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TeacherSelectDropdown;
