import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import  { useDispatch,useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

export const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const {selectedUser} = useSelector(store => store.user);
  const {messages} = useSelector(store=>store.message);

  const sendInputHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://chat-app-backend-q4d3.onrender.com/api/v1/message/send/${selectedUser?._id}`,{message},{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      // console.log(res);
      dispatch(setMessages([...messages, res?.data?.newMessage]));
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  };
  return (
    <form onSubmit={sendInputHandler} className="px-3 my-3 ">
      <div className="w-full relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message..."
          className="border text-sm rounded-lg p-3 border-zinc-700 block w-full bg-gray-600 text-white outline-none"
        />
        <button
          type="submit"
          className="absolute flex inset-y-0 end-0 pr-3 items-center"
        >
          <IoSend/>
        </button>
      </div>
    </form>
  );
};
