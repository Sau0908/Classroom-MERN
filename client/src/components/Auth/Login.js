import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { checkValidateData } from "../utils/validate";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Login = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);
  const handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = loginData;
    const msg = checkValidateData(email);
    if (msg) {
      setErrorMsg(msg);
      return;
    }

    dispatch(login(loginData))
      .unwrap()

      .catch((error) => {
        setErrorMsg(error.message.message || "Login failed. Please try again.");
      });
  };

  return (
    <div className="w-full  mx-auto p-6  ">
      <h2 className="text-2xl my-6">Login Here</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            className="mb-4 w-full"
            value={loginData.email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            className="mb-4"
            value={loginData.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        {errorMsg && (
          <div className="text-red-500 mb-4 text-center">{errorMsg}</div>
        )}
        <div className="mt-6">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
