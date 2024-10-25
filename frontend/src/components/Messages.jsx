import React from 'react'
import { Message } from './Message'
import { useGetMessages } from '../hooks/useGetMessages'
import { useSelector } from 'react-redux';
import { useGetRealTimeMessage } from '../hooks/useGetRealTimeMessage';

export const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage();
  const {messages} = useSelector(store=>store.message);
  
  // if(!messages) return; // early return

  return (
    <div className='flex-1 px-3 overflow-auto'>
      {
     messages && messages?.map((message)=>{
          return(
            <Message key={message._id} message={message}/>

          )
        })
      }
    </div>
  )
}
