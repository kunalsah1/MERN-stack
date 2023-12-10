import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Backbutton from "../Components/Backbutton";
import { useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";
import { useCookies } from "react-cookie";

const UpdateEmployees = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookies, removeCookies] = useCookies([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true)

    axios
      .get(`http://localhost:5000/employees/${id}`, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          })
      .then((response) => {
        setName(response.data.employee.name);
        setAge(response.data.employee.age);
        setDateJoined(response.data.employee.dateJoined);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        
      });
  },[]);

  const EditEmployees = () => {
    const data = {
      name,
      age,
      dateJoined,
      
    };
   
    setLoading(true);
    axios
      .put(`http://localhost:5000/employees/${id}`, data,{
        headers: {
          Authorization: `Bearer ${cookies.token}`,}
        },)
      .then(() => {
        setLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        console.log("Something went wrong", error);
      });
  };

  return (
    <div className="p-4">
      <Backbutton />
      <div className="  w-screen flex flex-col justify-start items-center">
        <h1 className=" font-bold text-4xl my-10">Edit Employee</h1>
        {loading && <Spinner />}
       
        <div className=" flex flex-col w-fit">
          <label htmlFor="name" className="font-bold text-xl">
            Name:{" "}
          </label>
          <input
            className="border-2 border-black rounded-lg w-96 mb-4 p-1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="age" className="font-bold text-xl">
            Age:{" "}
          </label>
          <input
            className="border-2 border-black rounded-lg w-96 mb-4 p-1"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <label htmlFor="dateJoined" className="font-bold text-xl">
            Date Of Joining:{" "}
          </label>
          <input
            className="border-2 border-black rounded-lg w-96 mb-4 p-1"
            type="date"
            value={dateJoined}
            onChange={(e) => setDateJoined(e.target.value)}
          />
        
         
        </div>
        <button
          onClick={EditEmployees}
          className="bg-sky-400 w-96 p-1 rounded-lg hover:bg-sky-300 font-bold text-2xl"
        >
          Save Change
        </button>
      </div>
    </div>
  );
};

export default UpdateEmployees;
