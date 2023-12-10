import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Backbutton from "../Components/Backbutton";
import Spinner from "../Components/Spinner";
import { AiOutlineEdit } from "react-icons/ai";
import { useCookies } from "react-cookie";

const ShowEmployees = () => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [cookies, removeCookies] = useCookies([]);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        console.log({ error: "cookie not generated" });
      }
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:5000/employees/${id}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        setDetails(response.data.employee);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    verifyCookie();
  }, []);

  const Logout = () => {
    removeCookies("token");
    navigate("/login");
  };

  const title = (name) => {
    if (name) {
      const capName = name[0].toUpperCase() + name.slice(1).toLowerCase();
      return capName;
    } else {
      return "";
    }
  };

  return (
    <>
      <div className="p-4">
        <Backbutton />
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className="text-center text-3xl font-bold my-10">
              {title(details.name)}
            </div>
            <div className="relative flex flex-col border-2 px-4 border-red-500 rounded-xl h-52 w-1/2 items-start justify-center">
              <Link to={`/employee/edit/${details._id}`}>
                <AiOutlineEdit className="text-3xl absolute top-0 hover:bg-green-200 rounded-xl text-green-700 right-0" />
              </Link>
              <p>
                <span className="font-bold">Name: </span>
                {title(details.name)}
              </p>
              <p>
                <span className="font-bold">Age: </span>
                {details.age}
              </p>
              <p>
                <span className="font-bold">Date of Joining:</span>{" "}
                {details.dateJoined}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={Logout}
          className=" fixed w-full right-0 bottom-0 bg-red-400 p-1 text-xl font-bold  hover:bg-red-500 hover:text-white"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default ShowEmployees;
