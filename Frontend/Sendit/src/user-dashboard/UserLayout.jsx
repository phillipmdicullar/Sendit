import React from 'react'
import Logo from '../assets/logo.png'
import '../admin-dashboard/admin.css'
import { NavLink, Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <div className="admin-dashboard">
      <div className="left-panel">
        <div className="top">
          <img src={Logo} alt="logo" />
          <h3>User</h3>
        </div>

        <ul>
          <li>
            <NavLink to="/user-dashboard">Home</NavLink>
          </li>
          <li>
            <NavLink to="/user-dashboard/create">Create Order</NavLink>
          </li>
          <li>
            <NavLink to="/user-dashboard/orders">My Orders</NavLink>
          </li>
          <li>
            <NavLink to="/track">Track Parcel</NavLink>
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
