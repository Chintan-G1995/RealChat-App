import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='nav-container'>
        <div className='nav-content'>
            <img src="/chaiq-logo.gif" alt="" /><h1>Welcome to Chat-App</h1>
            
        </div>
        <div className='link'>
          <NavLink to="signup">Register</NavLink>
          <NavLink to="login">Login</NavLink>
        </div>
    </div>
  )
}

export default Navbar