import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/studentSlice";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const studentList = useSelector((state) => state.student.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Student Dashboard</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Student List</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Grade</th>
              <th className="py-2 px-4 border-b border-gray-200">Email</th>
            </tr>
          </thead>
          <tbody>
            {studentList?.map((student) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;
