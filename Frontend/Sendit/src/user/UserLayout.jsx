import React from 'react'
import Logo from '../assets/logo.png'
import './user.css'
import { NavLink, Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <div className="admin-dashboard">
      <div className="left-panel">
        <div className="top">
          <img src={Logo} alt="logo" />
       
        </div>

        <ul>
          <li>
            <NavLink to="create">Home</NavLink>
          </li>
          <li>
            <NavLink to="orders">Orders</NavLink>
          </li>
          <li>
            <NavLink to="settings">Settings</NavLink>
          </li>
        </ul>
        <div className="logout">
          <button>Logout</button>
        </div>
      </div>
      <div className="right-panel">
        <Outlet />
      </div>
    </div>
  )
}

export default UserLayout