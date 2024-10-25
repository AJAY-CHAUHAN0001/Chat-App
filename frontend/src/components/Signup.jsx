import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast'
export const Signup = () => {
  const navigate = useNavigate();

  const [user,setUser] = useState({
    fullname:"",
    username:"",
    password:"",
    confirmPassword:"",
    gender:"",
  });

  const handleCheckbox = (gender)=>{
    setUser({...user,gender})
  }

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post("https://chat-app-backend-q4d3.onrender.com/api/v1/user/register",user,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/login")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setUser({
      fullname:"",
      username:"",
      password:"",
      confirmPassword:"",
      gender:"",
    })   
  }
  
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Signup</h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text ">Full Name</span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              type="text"
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              placeholder="full name"
              required
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text ">Username</span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="username"
              required
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
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
              required
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text ">Confirm Password</span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              type="password"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              placeholder="confirm password"
              required
            />
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p>Male</p>
              <input 
              type="checkbox" 
              checked={user.gender==="male"}
              onChange={()=>handleCheckbox("male")}
              defaultChecked 
              className="checkbox mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Female</p>
              <input 
              type="checkbox" 
              checked={user.gender==="female"}
              onChange={()=>handleCheckbox("female")}
              defaultChecked
              className="checkbox mx-2" 
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700 font-bold border-none"
              type="submit"
            >
              SIGN UP NOW
            </button>
          </div>
          <div className="flex items-center justify-center my-2">
            <span>Already have an account?</span>
            <Link to="/login" className="mx-1 font-bold">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
