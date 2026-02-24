import React from 'react'
import Logo from '../assets/logo.png'
import './user.css'
import { NavLink, Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <div className="user-dashboard">
      <div className="user-panel">
        <ul>
          <li>
            <NavLink to="/user">Home</NavLink>
          </li>
          <li>
            <NavLink to="/user/create">Create Order</NavLink>
          </li>
          <li>
            <NavLink to="/user/orders">My Orders</NavLink>
          </li>
          <li>
            <NavLink to="/track">Track Parcel</NavLink>
          </li>
        </ul>
      </div>
      <div className="bottom-panel">
        <Outlet />
      </div>
    </div>
  )
}

export default UserLayout
