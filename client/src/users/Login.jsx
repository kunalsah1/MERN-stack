import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useUser } from "../Components/userContext";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [password, showPassword] = useState(false);
  const [cookie, setCookie] = useCookies([]);
  const {setUserData} = useUser()

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", user)
      .then((res) => {
        const token = res.data.token;
        setUserData(res.data.userName)
        console.log(res.data.userName);
        setCookie("token", token, { path: "/" });
        navigate("/home");
      })
      .catch((error) => {
        console.log(error, "check frontend login");
      });
  };
  const togglePassword = () => {
    showPassword(!password);
  };

  return (
    <div className=" bg-slate-100">
      <div className="flex  justify-center items-center h-screen flex-col">
        <h1 className="text-4xl text-center font-mono">
          Employees Data Management
        </h1>
        <div className="flex justify-evenly items-start  flex-col  max-w-screen-md h-96 ">
          <h1 className=" text-2xl my-14 font-bold">Sign In</h1>

          <label className="font-bold" htmlFor="email">
            Email:
          </label>
          <input
            className="border-2 border-black p-1 rounded-lg font-bold pr-8"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <label className="font-bold" htmlFor="password">
            Password:
          </label>
          <div className="relative">
            <input
              className="border-2 border-black p-1 rounded-lg font-bold pr-8"
              type={password ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            {password ? (
              <AiFillEyeInvisible
                className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer font"
                onClick={togglePassword}
              />
            ) : (
              <AiFillEye
                className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePassword}
              />
            )}
          </div>

          <button
            onClick={(e) => handleSignIn(e)}
            className="bg-sky-400 my-5 w-full text-xl font-bold p-1 rounded-xl hover:bg-sky-500 hover:text-white"
          >
            Sign In
          </button>
          <Link
            to="/"
            className="bg-sky-400 w-full text-xl font-bold p-1 rounded-xl hover:bg-sky-500 hover:text-white text-center"
          >
            Sign Up
          </Link>
        </div>
      </div>
     
    </div>
  );
};

export default Login;
