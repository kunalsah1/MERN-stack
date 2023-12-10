import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const BackButton = ({ redirect = "/home" }) => {
  return (
    <div className="flex">
      <Link
        to={redirect}
        className=" bg-slate-400 text-white px-4 py-1 rounded-lg w-fit hover:bg-black"
      >
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
};

export default BackButton;
