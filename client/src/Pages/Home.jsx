import axios from "axios";
import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUserAdd, AiOutlineInfoCircle } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Components/userContext";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies, removeCookie] = useCookies([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userName } = useUser();

  const Navigate = useNavigate();
  const verifyCookie = async () => {
    if (!cookies.token) {
      Navigate("/login");
      console.log({ error: "cookie not generated" });
    } else {
      setIsLoggedIn(true);
    }
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/employees", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      setEmployees(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyCookie();
  }, [cookies]);

  const Logout = async () => {
    try {
      await axios.get("http://localhost:5000/logout");
      removeCookie("token");
      setIsLoggedIn(false);
      Navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const searchEmployees = (e) => {
    e.preventDefault();
    const name = e.target.value;
    axios
      .get(`http://localhost:5000/employees/search/${name}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          setEmployees(res.data);
        } else {
          console.log("Invalid response format:", res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const title = (name) => {
    const capName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    return capName;
  };

  return (
    <div className="p-4">
      <div className="flex  flex-col lg:flex-row justify-between items-center gap-x-4">
        <h1 className="text-3xl my-8">Employees List</h1>
        <div className="my-2">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search by Name"
            className=" border-2 border-black w-fit lg:w-96 p-1 rounded-lg"
            onChange={searchEmployees}
          />
        </div>
        <Link to="/employee/add">
          <AiOutlineUserAdd className="text-sky-800 text-4xl hover:bg-green-200 rounded-full" />
        </Link>
        
          <p className="text-2xl">Username: <span className=" text-xl mr-14 font-bold">{userName}</span></p>
      
      </div>
      {loading && <Spinner />}
      <div className="flex  justify-center relative items-center p-8">
        {employees.length === 0 ? (
          <div>
            <div>
              <h1 className="text-3xl">
                Sorry, there are no employees to display at the moment, Please
                login
              </h1>
            </div>
            <div className=" w-full flex justify-around mt-2">
              <Link
                to="/login"
                className="bg-sky-400 w-full text-xl font-bold mx-1 p-1 rounded-xl hover:bg-sky-500 hover:text-white text-center"
              >
                Sign In
              </Link>
              <Link
                to="/"
                className="bg-sky-400 w-full text-xl font-bold p-1 rounded-xl hover:bg-sky-500 hover:text-white text-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 sm:grid-cols-1 w-[60rem] ">
            {employees.map((employee, index) => {
              console.log(employee);
              return (
                <div key={employee._id}>
                  <div className="bg-red-200 p-1 hover:bg-red-300 rounded-xl m-2 relative">
                    <div className=" p-5 m-2 rounded-lg hover:bg-slate-100 bg-slate-200 font-bold flex justify-between items-center ">
                      <p className="absolute top-0 left-0 bg-white rounded-xl w-6 text-center">
                        {index + 1}
                      </p>
                      
                      <p className="w-32 mx-1 overflow-hidden">
                        {title(employee.name)}{" "}
                      </p>

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
                </div>
              );
            })}
          </div>
        )}
      </div>
      {employees.length > 0 && (
        <button
          onClick={(e) => Logout()}
          className=" fixed w-full right-0 bottom-0 bg-red-400 p-1 text-xl font-bold  hover:bg-red-500 hover:text-white"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Home;
