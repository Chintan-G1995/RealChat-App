import Login from "../components/login/Login";
import Signup from "../components/signup/Signup";
import Home from "../components/Home/Home";
import ChatPage from "../components/ChatPage/Chat";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
import ChatHome from "../components/ChatHome/ChatHome";

function App() {
  return (
    <>
      <ChakraProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chathome" element={<ChatHome />} />
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
