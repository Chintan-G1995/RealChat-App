import React from "react";
import "./Chat.css";
import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";

const Chat = () => {
  const [chats, setChats] = useState([
    { id: 1, name: "Ushank", lastMessage: "Hi there!", avatar: "" },
    { id: 2, name: "Jay", lastMessage: "Hello!", avatar: "" },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, sender: "Ushank", content: "Hi there!" },
    { id: 2, sender: "Jay", content: "Hello!" },
  ]);

  const [currentChat, setCurrentChat] = useState(chats[0]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    const messageInput = event.target.elements.messageInput;
    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      content: messageInput.value,
    };
    setMessages([...messages, newMessage]);
    messageInput.value = "";
  };
  // const validation = () => {
  //   const sendbutton = document.getElementsByClassName("send")[0];
  //   const sendInput = document.getElementsByClassName("send-input");

  //   if (sendInput.length === 0) {
  //     //send button visibility false
  //     sendbutton.style.visibility = "hidden";
  //   }else{
  //     sendbutton.style.visibility = "visible";
  //   }
    
  // };

  // validation();
  return (
    <>
      <div className="main-container">
        <div className="left-container">
          <h1>Chats List</h1>
          <div className="search-container">
            <Input
              color="teal"
              placeholder="Search"
              _placeholder={{ color: "inherit" }}
            />
            <Button colorScheme="green" variant="solid">
              Search
            </Button>
          </div>
          <div className="chat-list">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="chat-item"
                onClick={() => setCurrentChat(chat)}
              >
                <img src="./avatar1.png" alt={chat.name} />
                <div>
                  <h2>{chat.name}</h2>
                  <p>{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="right-container">
          <h1>{currentChat.name}'s Chat</h1>
          <div className="chat-window">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${
                  message.sender === "You" ? "sent" : "received"
                }`}
              >
                <p>{message.content}</p>
              </div>
            ))}
          </div>
          <form className="message-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              name="messageInput"
              placeholder="Type a message"
              className="send-input"
            />
            <button type="submit" className="send">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
