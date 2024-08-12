import React from "react";
import { Link } from "react-router-dom";

const LeftNav = ({ role }) => {
  return (
    <div className="fixed top-16 left-0 w-full bg-gray-800 text-white flex flex-col shadow-lg z-10 lg:w-1/4 md:w-1/4 sm:w-full sm:h-full">
      <nav className="flex flex-col p-4 space-y-4">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">
          Home
        </Link>

        {role === "Principal" && (
          <>
            <Link
              to="/principal/student"
              className="hover:bg-gray-700 p-2 rounded"
            >
              Students
            </Link>
            <Link
              to="/principal/teacher"
              className="hover:bg-gray-700 p-2 rounded"
            >
              Teachers
            </Link>
            <Link
              to="/principal/studentgrouped"
              className="hover:bg-gray-700 p-2 rounded"
            >
              Assign Teacher to Student
            </Link>
            <Link to="/classroom" className="hover:bg-gray-700 p-2 rounded">
              Assign Teacher to Classroom
            </Link>
          </>
        )}

        
        {role === "Teacher" && (
          <>
            <Link
              to="/teacher/student"
              className="hover:bg-gray-700 p-2 rounded"
            >
              Students
            </Link>
          </>
        )}

      
        {role === "Student" && (
          <>
          
            <Link to="/allclassmates" className="hover:bg-gray-700 p-2 rounded">
              Classmates
            </Link>
          
          </>
        )}
      </nav>
    </div>
  );
};

export default LeftNav;
