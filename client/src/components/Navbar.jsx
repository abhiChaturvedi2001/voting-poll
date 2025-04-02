import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { apiBaseUrl } from "@/utils/constant";
import { loginUser, logoutUser } from "@/utils/userSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}profile`, {
        withCredentials: true,
      });
      dispatch(loginUser(response?.data?.user));
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleLogout = async () => {
    const response = await axios.post(
      `${apiBaseUrl}logout`,
      {},
      {
        withCredentials: true,
      }
    );
    toast.success(response?.data?.message);
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="flex justify-between px-10 min-h-[8vh]   items-center">
      <Link to={"/"}>
        <h5 className="font-bold">Votely</h5>
      </Link>
      {!user && (
        <Link to={"/register"}>
          <Button>Get Started</Button>
        </Link>
      )}
      {user && (
        <div className="flex items-center space-x-5">
          <p>
            Welcome <span className="font-bold">{user.firstName}</span>
          </p>
          <Link to={"/login"}>
            <Button onClick={handleLogout}>logout</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
