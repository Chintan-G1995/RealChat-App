import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Home from "./components/Home/Home";
import Chat from "./components/ChatPage/Chat.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
import ChatHome from "./components/ChatHome/ChatHome";
import { ChatBox } from "./components/ChatBox/ChatBox";

function App() {
  return (
    <>
      <ChakraProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chats" element={<Chat />} />
          <Route path="/chathome" element={<ChatHome />} />
          <Route path="/chatbox" element={<ChatBox/>}/>
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;