import React from "react";
import AssignStudent from "../Teacher/AssignStudent";
import AssignClassroom from "../Teacher/AssignClassroom";

const TeacherDashboard = () => {
  return (
    <div className="p-8">
    
      <AssignStudent />
      <AssignClassroom />
    </div>
  );
};

export default TeacherDashboard;
