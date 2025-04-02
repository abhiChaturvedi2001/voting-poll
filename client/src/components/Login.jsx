// src/components/auth/LoginForm.jsx
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import LoaderBtn from "./LoaderBtn";
import axios from "axios";
import toast from "react-hot-toast";
import { apiBaseUrl } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { loginUser } from "@/utils/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      return toast.error("All fields Mandatory");
    }
    setloading(true);
    try {
      const response = await axios.post(`${apiBaseUrl}login`, formData, {
        withCredentials: true,
      });
      toast.success(response?.data?.message);
      dispatch(loginUser(response?.data?.user));
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="w-full max-w-md ">
        <h1 className="text-2xl font-bold text-center ">Welcome to Votely</h1>
        <p className="text-gray-400 text-sm text-center mb-6">
          Login to Create Mutilple polls & check realtime winnings
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="w-full border  rounded-md py-1 px-4   "
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block  text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              className="w-full border  rounded-md py-1 px-4  "
            />
          </div>

          {!loading ? <Button type="submit">Log in</Button> : <LoaderBtn />}

          <div className="mt-5 text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link className="hover:underline" to={"/register"}>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
