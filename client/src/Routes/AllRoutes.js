import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TeacherPage from "../pages/TeacherPage";
import StudentPage from "../pages/StudentPage";
import Layout from "../components/Auth/Layout";
import PrincipalDashboardPage from "../pages/PrincipalDashboardPage";
import TeacherDashboardPage from "../pages/TeacherDashboardPage";
import StudentDashboardPage from "../pages/StudentDashboardPage";
import ClassroomPage from "../pages/ClassroomPage";
import StudentGroupedPage from "../pages/StudentGroupedPage";

const AllRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <Layout />,
    },

    {
      path: "/principal",
      element: <PrincipalDashboardPage />,
    },
    {
      path: "/teacher",
      element: <TeacherDashboardPage />,
    },
    {
      path: "/student",
      element: <StudentDashboardPage />,
    },
    {
      path: "/principal/student",
      element: <StudentPage />,
    },
    {
      path: "/principal/studentgrouped",
      element: <StudentGroupedPage />,
    },
    {
      path: "teacher/student",
      element: <StudentPage />,
    },
    {
      path: "/principal/teacher",
      element: <TeacherPage />,
    },
    {
      path: "/classroom",
      element: <ClassroomPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AllRoutes;
