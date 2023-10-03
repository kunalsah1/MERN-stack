import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUserAdd, AiOutlineInfoCircle } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Spinner from "../Components/Spinner";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/employees")
      .then((res) => {
        setEmployees(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const title = (name) => {
    const capName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    return capName;
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center gap-x-4">
        <h1 className="text-3xl my-8">Employees List</h1>
        <Link to="/employee/add">
          <AiOutlineUserAdd className="text-sky-800 text-4xl hover:bg-green-200 rounded-full" />
        </Link>
      </div>
      {loading && <Spinner />}
      <div className="flex justify-center items-center ">
        {employees.length === 0 ? (
          <h1 className="text-3xl">
            Sorry, there are no employees to display at the moment
          </h1>
        ) : (
          <div className="grid grid-cols-3 w-[60rem] ">
            {employees.map((employee, index) => {
              return (
                <div key={employee._id}>
                  {/* <Link to={`/employee/info/${employee._id}`}> */}
                    <div className="bg-red-200 p-1 hover:bg-red-100 rounded-xl m-2 relative">
                      <div className=" p-5 m-2 rounded-lg hover:bg-slate-100 bg-slate-200 font-bold flex justify-between cursor-pointer ">
                        <p className="absolute top-0 left-0 bg-white rounded-xl w-6 text-center">
                          {index + 1}
                        </p>
                        <p>{title(employee.name)} </p>

                        <div className="flex">
                          <Link to={`/employee/info/${employee._id}`}>
                            <AiOutlineInfoCircle className="mx-2 cursor-pointer mt-1 text-2xl text-green-600 rounded-lg  hover:bg-black" />
                          </Link>
                          <Link to={`/employee/remove/${employee._id}`}>
                            <RiDeleteBin6Fill className="cursor-pointer mt-1 text-2xl text-red-600 rounded-lg  hover:bg-black" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  {/* </Link> */}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
