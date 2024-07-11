import React from "react";
import { Chatusers } from "./ChatUsers.jsx";
import Chat  from "../ChatPage/Chat.jsx";
import Chatnav from "./ChatNav.jsx";
import { ChatState } from "../../context/ChatContext.jsx";

export const ChatBox = () => {
  let { user } = ChatState();
  console.log("user", user);
  return (
    <div>
      {user && <Chatnav user={user} />}
      <Chatusers />
      <Chat />
    </div>
  );
};
