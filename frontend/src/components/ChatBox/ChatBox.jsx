import React from "react";
import { Chatusers } from "./ChatUsers.jsx";
import Chat from "../ChatPage/Chat.jsx";
import Chatnav from "./ChatNav.jsx";
import { ChatState } from "../../context/ChatContext.jsx";
import { Box } from "@chakra-ui/react";
import { ChatWindows } from "../../components/ChatBox/ChatWindows.jsx";

export const ChatBox = () => {
  let { user } = ChatState();
  console.log("user", user);
  return (
    <div>
      {user && <Chatnav user={user} />}
      <Box display={"flex"}>
        {user && <Chatusers />}
        {user && <ChatWindows />}

      </Box>
    </div>
  );
};
