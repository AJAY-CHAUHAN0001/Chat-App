import React from "react";
import { Sidebar } from "./Sidebar";
import { MessageContainer } from "./MessageContainer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { authUser } = useSelector((store) => store.user);

  return (
    <>
      {authUser !== null ? (
        <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 shadow-lg">
          <Sidebar />
          <MessageContainer />
        </div>
      ) : (
        <div className="md:min-w-[550px]  sm:h-[250px] flex flex-col items-center justify-center  rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 shadow-lg">
          <h1 className="text-3xl text-zinc-200 font-bold">
            Please Login Here
          </h1>
          <Link to="/login" className="outline-none">
            <button className="btn btn-md mt-3 text-lg">LOGIN</button>
          </Link>
        </div>
      )}
    </>
  );
};
