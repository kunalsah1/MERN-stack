import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Backbutton from "../Components/Backbutton";
import Spinner from "../Components/Spinner";
import { AiOutlineEdit } from "react-icons/ai";

const ShowEmployees = () => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/employees/${id}`)

      .then((response) => {
        setDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="p-4">
        <Backbutton />
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className="text-center text-3xl font-bold my-10">
              {details.name}
            </div>
            <div className="relative flex flex-col border-2 px-4 border-red-500 rounded-xl h-52 w-1/2 items-start justify-center">
              <Link to={`/employee/edit/${details._id}`}>
                <AiOutlineEdit className="text-3xl absolute top-0 hover:bg-green-200 rounded-xl text-green-700 right-0" />
              </Link>
              <p>
                <span className="font-bold">Name: </span>
                {details.name}
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
      </div>
    </>
  );
};

export default ShowEmployees;
