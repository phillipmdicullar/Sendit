import React from "react";
import Logo from "../assets/logo.png";
import "./admin.css";
import { Link, Outlet,NavLink } from "react-router-dom";
function Admin() {
  return (
    <div className="admin-dashboard">
      <div className="left-panel">
        <div className="top">
          <img src={Logo} alt="logo" />
          <h3>Admin</h3>
        </div>

        <ul>
          <li>
            <NavLink to="home">Home</NavLink>
          </li>
          <li>
            <NavLink to="orders">Orders</NavLink>
          </li>
          <li>
            <NavLink to="analytics">Analytics</NavLink>
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
  );
}

export default Admin;
