import React from "react";
import { OtherUser } from "./OtherUser";
import { useGetOtherUsers } from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

export const OtherUsers = ({users}) => {
  //custom hook
  useGetOtherUsers();
  const { otherUsers } = useSelector(store => store.user);
  if (!otherUsers) return; // early return in react
  
  return (
    <div className="overflow-auto flex-1">
      {
        users?.map((user)=>{
          return(
            <OtherUser key={user._id} user={user}/>
          )
        })
      }
    </div>
  );
};
