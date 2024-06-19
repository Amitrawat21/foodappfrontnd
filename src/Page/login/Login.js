import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/womaneating2.jpg";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../Redux/authSlice";
import validation from "../../Validation/Validation";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (isSubmitted) {
      const newFormData = {
        ...formData,
        [name]: value,
      };
      const validationErrors = validation(newFormData, false);
      setErrors(validationErrors);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const validationErrors = validation(formData, false);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const res = await axios.post("https://foodappbackend-rjtx.onrender.com/auth/login", formData);

        if (res.data.success) {
          console.log(res.data);
          dispatch(login(res.data));
          toast.success("Login successful");
          setTimeout(() => {
            navigate("/");
          }, 2500);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error("Password is incorrect");
          } else if (error.response.status === 404) {
            toast.error("User email not found");
          } else {
            toast.error("An unexpected error occurred");
          }
        } else if (error.request) {
          toast.error("Failed to connect to server. Please try again.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="loginContainer">
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 1000,
          }}
        >
          please wait ... &nbsp;
          <CircularProgress />
        </Box>
      )}

      <div className="loginWrapper">
        <div className="loginLeftSide">
          <img src={img} className="leftImg" alt="Login Visual" />
        </div>
        <div className="loginRightSide">
          <h2 className="title">Login</h2>
          <form onSubmit={handleLogin} className="loginForm">
            <input
              type="email"
              placeholder="Type email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
            />
            {isSubmitted && errors.email && (
              <p className="para" style={{ color: "red" }}>
                {errors.email}
              </p>
            )}
            <input
              type="password"
              placeholder="Type password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
            />
            {isSubmitted && errors.password && (
              <p className="para" style={{ color: "red" }}>
                {errors.password}
              </p>
            )}
            <button className="submitBtn" type="submit" disabled={loading}>
              Login
            </button>
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default Login;
