import React from "react";
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react"

const Login = () => {

  const navigate=useNavigate()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const handleSubmit=async (e)=>{
    e.preventDefault()

    let formData=new FormData()
    formData.append("email",email)
    formData.append("password",password)
    
    let {data} = await axios.post(
      "http://localhost:4000/api/v1/user/login",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("user",JSON.stringify(data))
    navigate("/chatbox",{replace:true})
  }
  return (
    <div className="main-container">
      <div className="container">
        <h1>Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="email">Email or Phone</label>
          <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} />

          <label htmlFor="password">Password</label>
          <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} />
          <div className="btn">
            <button type="submit">Login</button>
            <button className="cancle">Cancle</button>
          </div>
          <div className="forget">
          <a href="">Forget Password</a>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Login;