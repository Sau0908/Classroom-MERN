import React, { useEffect, useState } from "react";
import LeftNav from "./components/Home/LeftNav";
import Header from "./components/Home/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from "./components/features/authSlice";

const Layout = ({ children }) => {
  const user = useSelector((state) => state.auth);
  const [accessRole, setAccessRole] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userProfile = localStorage.getItem("Profile");

    if (userProfile) {
      const { email, token, role, id } = JSON.parse(userProfile);

      if (!accessRole) {
        setAccessRole(role);
      }

      dispatch(addUser({ email, token, role, id }));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, accessRole]);

  useEffect(() => {
    if (user.role !== accessRole) {
      setAccessRole(user.role);
    }
  }, [user.role, accessRole]);

  return (
    <div>
      <Header />
      <div className="flex flex-col lg:flex-row">
        <LeftNav role={user.role} />
        <div className="sm:w-3/4 ml-0 mt-60 sm:ml-auto sm:mt-10 p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
