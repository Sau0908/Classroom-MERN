import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassrooms } from "../features/classroomSlice";
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
import { fetchTeachers } from "../features/teacherSlice";

const AssignClassroom = () => {
  const classroomGroups = useSelector((state) => state.classroom.classrooms);
  const teachers = useSelector((state) => state.teacher.teachers);
  const authId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClassrooms());
    dispatch(fetchTeachers());
  }, [dispatch]);

  const getTeacherNameById = (id) => {
    const teacher = teachers.find((teacher) => teacher._id === id);
    return teacher ? teacher.name : "Unknown Teacher";
  };

  return (
    <div className="">
      <h1 className="text-4xl font-bold mb-4">Classroom List</h1>

      <div className="mb-12 space-y-4">
        {classroomGroups?.map((group) => (
          <Accordion key={group._id || "Unnamed"}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">
                {group._id || "Unnamed Classroom Group"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Classroom Name
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Start Time
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      End Time
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Days
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Assigned Teacher
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {group.classrooms
                    .filter((classroom) => classroom.teacherId === authId)
                    .map((classroom) => (
                      <TableRow key={classroom._id}>
                        <TableCell>
                          {classroom.name || "Unnamed Classroom"}
                        </TableCell>
                        <TableCell>{classroom.startTime}</TableCell>
                        <TableCell>{classroom.endTime}</TableCell>
                        <TableCell
                          style={{
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                          }}
                        >
                          {classroom.days.join(", ")}
                        </TableCell>
                        <TableCell>
                          {getTeacherNameById(classroom.teacherId)}
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

export default AssignClassroom;
