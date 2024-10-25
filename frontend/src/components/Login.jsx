import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthUser } from "../redux/userSlice";

export const Login = () => {
  const [user,setUser] = useState({
    username:"",
    password:"",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/login",user,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      
      navigate("/")
      dispatch(setAuthUser(res.data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setUser({
      username:"",
      password:"",
    }) 
  }
  
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text ">Username</span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              type="text"
              value={user.username}
              onChange={(e)=>setUser({...user,username:e.target.value})}
              placeholder="username"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text ">Password</span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              type="password"
              value={user.password}
              onChange={(e)=>setUser({...user,password:e.target.value})}
              placeholder="password"
            />
          </div>
          <div className="flex items-center justify-center mt-4">
            <button type="submit" className="btn btn-block btn-sm mt-2 border border-slate-700 font-bold border-none">LOG IN NOW</button>
          </div>
          <div className="flex items-center justify-center mt-4">
            <span className="font-semibold text-lg">Don't have an account?</span>
            <Link to="/register" className="mx-1 font-bold text-lg">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};