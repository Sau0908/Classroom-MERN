import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import CreateEditStudent from "./CreateEditStudent";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  updateStudent,
  deleteStudent,
} from "../features/studentSlice";
import { createStudent } from "../features/authSlice";
import Swal from "sweetalert2";

const Student = () => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.student);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({
    id: "",
    name: "",
    grade: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    if (status === "created" || status === "updated" || status === "deleted") {
      dispatch(fetchStudents());
      setStatus("");
    }
  }, [status, dispatch]);

  const handleOpen = (
    student = { id: "", name: "", grade: "", email: "", password: "" }
  ) => {
    setCurrentStudent(student);
    setIsEditing(!!student._id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (isEditing) {
      dispatch(
        updateStudent({
          id: currentStudent._id,
          name: currentStudent.name,
          grade: currentStudent.grade,
          email: currentStudent.email,
        })
      )
        .then(() => {
          setStatus("updated");
          Swal.fire("Success", " SuceesFully Updated", "success");
        })
        .catch(() => {
          Swal.fire("Error", " Failed to Update ", "error");
        });
    } else {
      dispatch(createStudent(currentStudent))
        .then(() => {
          setStatus("created");
          Swal.fire("Success", "Student Created", "success");
        })
        .catch(() => {
          Swal.fire("Error", " Failed to Create Student", "error");
        });
    }
    handleClose();
  };

  const handleChange = (field, value) => {
    if ((field === "email" || field === "password") && isEditing) return;
    setCurrentStudent({ ...currentStudent, [field]: value });
  };

  const handleDelete = (id) => {
    dispatch(deleteStudent(id)).then(() => {
      setStatus("deleted");
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Student List</h1>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Students</h2>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
          >
            Create Student
          </Button>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Grade</th>
              <th className="py-2 px-4 border-b border-gray-200">Email</th>
              <th className="py-2 px-4 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {student.students?.map((student) => (
              <tr key={student._id}>
                <td className="py-2 px-4 border-b text-center">
                  {student.name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {student.grade}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {student.email}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <Button
                    variant="contained"
                    color="primary"
                    className="mr-2"
                    style={{ marginRight: "4px" }}
                    onClick={() => handleOpen(student)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(student._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateEditStudent
        open={open}
        onClose={handleClose}
        isEditing={isEditing}
        student={currentStudent}
        onSave={handleSave}
        onChange={handleChange}
      />
    </div>
  );
};

export default Student;
