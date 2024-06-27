import React, { useState } from "react";
import "./Signup.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  let name_txt = document.getElementById("name");
  let email_txt = document.getElementById("email");
  let phone_txt = document.getElementById("phone");
  let pass_txt = document.getElementById("password");
  let cpass_txt = document.getElementById("confirm-password");
  let file_txt = document.getElementById("profile-photo");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState("");

  let navigate = useNavigate();


  function clear() {
    name_txt.value = "";
    email_txt.value = "";
    phone_txt.value = "";
    pass_txt.value = "";
    cpass_txt.value = "";
    file_txt.value = "";
    setError("");
  }

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(name, email, password, confirmPass, file);
    let formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("pass", pass);
    formData.append("confirmPass", confirmPass);
    formData.append("file", file);

//Axios server code
    let {data} = await axios.post(
      "http://localhost:5000/api/v1/user/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    localStorage.setItem("token",data.token)
    navigate("/chats",{replace:true})
  

     //File type check  
    // if (file && !["image/jpeg", "image/png"].includes(file.type)) {
    //   setError("File type must be JPEG or PNG");
    //   return;
    // }
    
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key} :: ${value}`);
    // }
    toast.success("Signup Successfully");
    clear();
    navigate = `/login?${queryParams}`;
    
 };

  return (
    <div className="signup-container">
        <div className="container">
      <h1>Signup</h1>
      <form class="signup-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          
          title="Please enter a valid email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label for="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          
          title="Please enter a valid 10-digit phone number"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />

        <label for="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          placeholder="Confirm your password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          required
        />

        <label htmlFor="photo">Photo</label>
        <input
          type="file"
          id="profile-photo"
          name="profile-photo"
          value={file}
          onChange={(e) => setFile(e.target.files[0])}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div class="buttons">
          <button type="submit">Submit</button>
          <button type="reset">Cancel</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Signup;
