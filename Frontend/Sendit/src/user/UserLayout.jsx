import React from 'react'
import Logo from '../assets/logo.png'
import './user.css'
import { NavLink, Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <div className="user-layout">

      {/* Sidebar / Navigation */}
      <aside className="user-nav">
        <div className="user-brand">
          <img src={Logo} alt="Sendit" />
          <h3>Sendit</h3>
        </div>

        <nav>
          <NavLink to="/user" end className="nav-item">
            Home
          </NavLink>

          <NavLink to="/user/create" className="nav-item">
            Create Order
          </NavLink>

          <NavLink to="/user/orders" className="nav-item">
            My Orders
          </NavLink>

          <NavLink to="/track" className="nav-item">
            Track Parcel
          </NavLink>
        </nav>
        <div className="button">
          <button>Logout</button>
        </div>
      </aside>

      {/* Page Content */}
      <main className="user-content">
        <Outlet />
      </main>

    </div>
  )
}

export default UserLayout