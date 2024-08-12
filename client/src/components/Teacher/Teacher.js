import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import CreateEditTeacher from "./CreateEditTeacher";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeachers,
  updateTeacher,
  deleteTeacher,
} from "../features/teacherSlice";
import { createTeacher } from "../features/authSlice";
import Swal from "sweetalert2";

const Teacher = () => {
  const dispatch = useDispatch();
  const teacher = useSelector((state) => state.teacher);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState({
    id: "",
    name: "",
    subject: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  useEffect(() => {
    if (status === "created" || status === "updated" || status === "deleted") {
      dispatch(fetchTeachers());
      setStatus("");
    }
  }, [status, dispatch]);

  const handleOpen = (
    teacher = { id: "", name: "", subject: "", email: "", password: "" }
  ) => {
    setCurrentTeacher(teacher);
    setIsEditing(!!teacher._id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (isEditing) {
      dispatch(
        updateTeacher({
          id: currentTeacher._id,
          name: currentTeacher.name,
          subjectSpecialization: currentTeacher.subject,
          email: currentTeacher.email,
        })
      )
        .then(() => {
          setStatus("updated");
          Swal.fire("Success", "Updated successfully", "success");
        })
        .catch(() => {
          Swal.fire("Error", " failed to Update", "error");
        });
    } else {
      dispatch(createTeacher(currentTeacher))
        .then(() => {
          setStatus("created");
          Swal.fire("Success", "Teacher Created", "success");
        })
        .catch(() => {
          Swal.fire("Error", " Failed to Create Teacher", "error");
        });
    }
    handleClose();
  };

  const handleChange = (field, value) => {
    if ((field === "email" || field === "password") && isEditing) return;
    setCurrentTeacher({ ...currentTeacher, [field]: value });
  };

  const handleDelete = (id) => {
    dispatch(deleteTeacher(id)).then(() => setStatus("deleted"));
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Teacher List</h1>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Teachers</h2>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
          >
            Create Teacher
          </Button>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Subject</th>
              <th className="py-2 px-4 border-b border-gray-200">Email</th>
              <th className="py-2 px-4 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teacher.teachers?.map((teacher) => (
              <tr key={teacher._id}>
                <td className="py-2 px-4 border-b text-center">
                  {teacher.name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {teacher.subjectSpecialization}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {teacher.email}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <Button
                    variant="contained"
                    color="primary"
                    className="mr-2"
                    style={{ marginRight: "4px" }}
                    onClick={() => handleOpen(teacher)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(teacher._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateEditTeacher
        open={open}
        onClose={handleClose}
        isEditing={isEditing}
        teacher={currentTeacher}
        onSave={handleSave}
        onChange={handleChange}
      />
    </div>
  );
};

export default Teacher;
