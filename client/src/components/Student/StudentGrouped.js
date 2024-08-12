import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, fetchStudentGrouped } from "../features/studentSlice";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignTeacherDropdown from "./AssignTeacherDropdown";
import { fetchTeachers } from "../features/teacherSlice";

const StudentGrouped = () => {
  const studentGroups = useSelector((state) => state.student.studentGrouped);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
    dispatch(fetchStudentGrouped());
  }, [dispatch]);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Student List</h1>

      <div className="mb-12 space-y-4">
        {studentGroups?.map((group) => (
          <Accordion key={group._id || "Unnamed"}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">
                Grade {group._id || "Unnamed Grade"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Grade</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Assign Teacher
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {group.students.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>
                        <AssignTeacherDropdown
                          studentId={student._id}
                          assignedTeacherId={student.assignTeacherId}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default StudentGrouped;
