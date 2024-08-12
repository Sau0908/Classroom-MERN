import React, { useEffect } from "react";
import Login from "./Login";
import loginImg from "../assests/img/loginImg.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../features/authSlice";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("Profile");

    if (user) {
      const { email, token, role, id } = JSON.parse(user);

      dispatch(addUser({ email, token, role, id }));
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="hidden object-fill  md:flex md:w-1/2 bg-blue-600 ">
        <div className="text-white text-center">
          <div className="flex justify-center items-end mt-20">
            <img src={loginImg} alt="Illustration" className="h-4/5 w-4/5 " />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Connect with your Classroom</h2>
            <h5>Everything you need in available here.</h5>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col  bg-white p-6">
        <h1 className="text-5xl font-bold mb-2 text-wrap">
          Welcome to Your Classroom
        </h1>
        <p className="mb-4  text-xl text-center ">
          Welcome back! Start Your Study Journey
        </p>
        <div className="flex justify-center "></div>
        <div className=" w-full h-[2px] my-2 bg-gray-300"></div>
        <div className=" w-full">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Layout;
