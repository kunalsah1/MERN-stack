import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner";

const DeleteEmployees = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const removeEmployee = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/employees/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const nav = () => {
    navigate("/");
  };
  return (
    <div className="p-4">
      {loading ? <Spinner /> : ""}
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-around items-center rounded-2xl border-2 border-red-500 w-[50rem] h-[30rem]">
          <h1 className="text-5xl">Are you Sure?</h1>
          <div>
            <button
              onClick={removeEmployee}
              className="bg-red-400 hover:bg-red-500 w-32 font-bold p-2 rounded-full"
            >
              Yes
            </button>
            <button
              onClick={nav}
              className="bg-gray-400 hover:bg-gray-500 w-32 font-bold mx-2 p-2 rounded-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployees;
