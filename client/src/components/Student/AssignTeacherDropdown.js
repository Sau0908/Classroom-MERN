import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { assignTeacherToStudent } from "../features/studentSlice";

const AssignTeacherDropdown = ({ studentId, assignedTeacherId }) => {
  const teacherList = useSelector((state) => state.teacher.teachers);
  const dispatch = useDispatch();

  const handleAssignTeacher = (teacherId) => {
    dispatch(assignTeacherToStudent({ studentId, teacherId }));
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>Select Teacher</InputLabel>
      <Select
        label="Select Teacher"
        value={assignedTeacherId || ""}
        onChange={(e) => handleAssignTeacher(e.target.value)}
      >
        <MenuItem value="">
          <em>Select a teacher</em>
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

export default AssignTeacherDropdown;
