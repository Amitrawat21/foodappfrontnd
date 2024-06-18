import React, { useEffect, useState } from 'react';
import img from '../../assets/womaneating.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../../Redux/authSlice';
import './Signup.css';
import validation from '../../Validation/Validation';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      const validationErrors = validation(newFormData, true);
      setErrors(validationErrors);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const validationErrors = validation(formData, true);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post('https://foodappbackend-rjtx.onrender.com/auth/register', formData);
        console.log(res);

        if (res.data.success) {
          dispatch(register(res.data));
          toast.success('Sign up successfully');
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          throw new Error(res.data.message || 'Signup failed');
        }
      } catch (error) {
        if (error.response) {

           if(error.response.status === 403){
            toast.error("email is already  incorrect");

           }

          else if (error.response.status === 401) {
           
          } else {
            toast.error("An unexpected error occurred");
          }
        } else if (error.request) {
          toast.error("Failed to connect to server. Please try again.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    }
  };

  return (
    <div className="signUpContainer">
      <div className="signUpWrapper">
        <div className="signUpLeftSide">
          <img src={img} className="leftImg" alt="Signup" />
        </div>
        <div className="signUpRightSide">
          <h2 className="title">Sign Up</h2>
          <form onSubmit={handleSignup} className="signUpForm">
            <input
              type="text"
              name="username"
              placeholder="Type username"
              value={formData.username}
              onChange={changeHandler}
            />
            {isSubmitted && errors.username && (
              <p className='para' style={{ color: "red" }}>{errors.username}</p>
            )}
            <input
              type="email"
              name="email"
              placeholder="Type email"
              value={formData.email}
              onChange={changeHandler}
            />
            {isSubmitted && errors.email && (
              <p className='para'  style={{ color: "red" }}>{errors.email}</p>
            )}
            <input
              type="password"
              name="password"
              placeholder="Type password"
              value={formData.password}
              onChange={changeHandler}
            />
            {isSubmitted && errors.password && (
              <p className='para'  style={{ color: "red" }}>{errors.password}</p>
            )}
            <button className="submitBtn" type="submit">
              Sign Up
            </button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default Signup;
