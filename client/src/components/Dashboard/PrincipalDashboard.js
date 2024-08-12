import React from "react";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { stats } from "../utils/constant";
import CreateClassroom from "../Classroom/CreateClassroom";

const PrincipalDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Principal Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`text-sm font-semibold ${stat.percentageColor}`}>
                {stat.percentage}
              </span>

              <div className="text-gray-400">•••</div>
            </div>
            <div className="text-4xl font-bold">{stat.value}</div>
            <div className="text-lg font-semibold text-gray-600">
              {stat.title}
            </div>
          </div>
        ))}
      </div>

      <CreateClassroom />
    </div>
  );
};

export default PrincipalDashboard;
