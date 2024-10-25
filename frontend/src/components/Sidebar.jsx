import React, { useState, useEffect } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { OtherUsers } from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setAuthUser,
  setOnlineUsers,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";

export const Sidebar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { otherUsers, authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (otherUsers && otherUsers.length > 0) {
      setFilteredUsers(otherUsers);
    }
  }, [otherUsers]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (search.trim() === "") {
      toast("Please enter a search term");
      setFilteredUsers(otherUsers);
      return;
    }

    const filtered = otherUsers?.filter((user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase())
    );
    if (filtered.length > 0) {
      setFilteredUsers(filtered);
    } else {
      toast("User not found!");
      setFilteredUsers([]);
    }
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    if (searchValue.trim() === "") {
      setFilteredUsers(otherUsers);
    }
  };

  // logout =>
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`https://chat-app-backend-q4d3.onrender.com/api/v1/user/logout`);

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setAuthUser(null));
        dispatch(setOtherUsers(null));
        dispatch(setOnlineUsers(null));
        dispatch(setSelectedUser(null));
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed!");
    }
  };

  return (
    <>
        <div className="border-r border-slate-500 p-4 flex flex-col md:w-[310px]">
          <form
            onSubmit={searchSubmitHandler}
            className="flex items-center gap-2"
          >
            <input
              value={search}
              onChange={handleSearchChange}
              className="input input-bordered rounded-md"
              type="text"
              placeholder="Search.."
            />
            <button type="submit" className="btn bg-zinc-300 border-none">
              <BiSearchAlt2 className="w-6 h-6" />
            </button>
          </form>

          <div className="divider px-0"></div>
           
          <OtherUsers users={filteredUsers} />
          
          <div className="mt-5">
            <button onClick={logoutHandler} className="btn btn-sm">
              Logout
            </button>
          </div>

          <div className="flex gap-3 items-center">
            <div className={`avatar mt-5 cursor-pointer`}>
              <div className="w-8 rounded-full">
                <img src={authUser?.profilePhoto} alt="" />
              </div>
            </div>
            <div className="mt-5">
              <div className="text-white">
                <p>{authUser?.fullname}</p>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};
