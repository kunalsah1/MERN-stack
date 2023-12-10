import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const SignUp = () => {
  const [user, setUser] = useState({ userName: "", email: "", password: "" });
  const [password, showPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSignUp = (e) => {
    axios
      .post("http://localhost:5000/signup", user)
      .then((res) => navigate("/login"));
    alert("Registration Completed").catch((error) =>
      console.log("check the frontend", error)
    );
  };

  const togglePassword = () => {
    showPassword(!password);
  };

  return (
    <div className=" bg-slate-100">
      <div className="flex p-4 justify-center items-center h-screen flex-col">
        <h1 className="text-4xl text-center font-mono">
          Employees Data Management
        </h1>
        <div className="flex justify-evenly items-start  flex-col  max-w-screen-md h-96 ">
          <h1 className=" text-2xl my-14 font-bold">Sign Up</h1>
          <label className="font-bold" htmlFor="userName">
            UserName:
          </label>
          <input
            className="border-2 border-black p-1 rounded-lg font-bold "
            type="text"
            name="userName"
            value={user.userName}
            onChange={handleChange}
          />
          <label className="font-bold" htmlFor="email">
            Email:
          </label>
          <input
            className="border-2 border-black p-1 rounded-lg font-bold"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />

          <label className="font-bold" htmlFor="password">
            Password:
          </label>

          <div className=" relative">
            <input
              className="border-2 border-black p-1 rounded-lg font-bold"
              type={password ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            {password ? (
              <AiFillEyeInvisible
                className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
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
            onClick={() => handleSignUp()}
            className="bg-sky-400 my-5 w-full text-xl font-bold p-1 rounded-xl hover:bg-sky-500 hover:text-white"
          >
            Sign Up
          </button>
          <Link
            to="/login"
            className="bg-sky-400 w-full text-xl font-bold p-1 rounded-xl hover:bg-sky-500 hover:text-white text-center"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
