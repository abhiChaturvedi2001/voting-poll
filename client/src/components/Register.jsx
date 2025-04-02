// src/components/auth/RegisterForm.jsx
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { apiBaseUrl } from "@/utils/constant";
import LoaderBtn from "./LoaderBtn";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formData;
    if (!firstName || !lastName || !email || !password) {
      return toast.error("All fields Mandatory");
    }
    setloading(true);
    try {
      const response = await axios.post(`${apiBaseUrl}register`, formData, {
        withCredentials: true,
      });
      toast.success(response?.data?.message);
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Welcome to Votely</h1>
        <p className="text-gray-400 text-sm mb-6 text-center">
          Join Votely to access all features and benefits
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-sm mb-2">
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={onChange}
                className="w-full rounded-md py-1 px-4 border"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="block text-sm mb-2">
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={onChange}
                className="w-full rounded-md py-1 px-4 border"
              />
            </div>
          </div>

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
              className="w-full rounded-md py-1 px-4 border"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              className="w-full rounded-md py-1 px-4 border"
            />
          </div>

          {!loading ? <Button type="submit">Sign up</Button> : <LoaderBtn />}

          <div className="mt-5 text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <Link className="hover:underline" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
