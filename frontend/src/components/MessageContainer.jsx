import { React } from "react";
import { SendInput } from "./SendInput";
import { Messages } from "./Messages";
import { useSelector } from "react-redux";

export const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user
  );

  const isOnline = onlineUsers?.includes(selectedUser?._id);
  return (
    <>
      {
        selectedUser !== null ? (
          <div className="md:min-w-[550px] flex flex-col bg-gray-500">
            <div className="flex gap-3 items-center bg-zinc-600 text-white px-2 py-2 mb-2">
              <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full">
                  <img className="" src={selectedUser?.profilePhoto} alt="" />
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="text-lg flex justify-between">
                  <p>{selectedUser?.fullname}</p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <Messages />
            </div>
            <SendInput />
          </div>
        ) : (
          <div className="md:min-w-[550px] flex flex-col items-center justify-center ">
            <h1 className="text-4xl text-zinc-200 font-bold">
              Hi,{authUser?.fullname}
            </h1>
            <h1 className="text-3xl text-zinc-200 mt-2">Let's Start Chat</h1>
          </div>
        )
    }
    </>
  );
};
