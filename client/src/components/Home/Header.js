import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../features/authSlice";
import { Button } from "@mui/material";

const Header = () => {
  const role = useSelector((state) => state.auth.role);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("Profile");
    navigate("/login");
  };

  return (
    <div className="fixed top-0 w-full h-16 bg-white text-black shadow-lg px-8 z-20 flex items-center">
      <div className="text-xl font-bold">Classroom</div>
      <nav className="flex-1 flex justify-center space-x-4">
        <Link to="/" className="hover:text-gray-400">
          Home
        </Link>

        {role === "Principal" && (
          <Link to="/principal" className="hover:text-gray-400">
            Principal Dashboard
          </Link>
        )}
        {role === "Teacher" && (
          <Link to="/teacher" className="hover:text-gray-400">
            Teacher Dashboard
          </Link>
        )}
          {role === "Student" && (
          <Link to="/student" className="hover:text-gray-400">
            Student Dashboard
          </Link>
        )}
      </nav>
      <Button onClick={handleLogout} className="ml-auto">
        <LogoutIcon className="hover:text-gray-400" /> Logout
      </Button>
    </div>
  );
};

export default Header;
