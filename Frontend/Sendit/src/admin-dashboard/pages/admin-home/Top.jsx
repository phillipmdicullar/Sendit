import React from 'react'
import './top.css';

import Box from './icons/box.png';
import Bus from './icons/bus.png';
import Shipped from './icons/shipped.png';
import Canceled from './icons/cancel-order.png';

import NotificationBell from '../../../components/NotificationBell';

function Top() {
  return (
    <div className="section">

      {/* HEADER */}
      <div className="top-section">
        <div className="dashboard">
          Dashboard
        </div>

        {/* ✅ Notification lives directly here */}
        <div className="notification">
          <NotificationBell admin={true} />
        </div>
      </div>

      {/* CENTER */}
      <div className="center">
        <h2>
          Welcome back <span>Admin!</span>
        </h2>

        <p>Manage your deliveries efficiently</p>

        <div className="box-wrapper">

          <div className="boxes">
            <div className="top-wrapper">
              <img src={Box} alt="" />
              <h3>123</h3>
            </div>
            <p>Total parcels</p>
          </div>

          <div className="boxes">
            <div className="top-wrapper">
              <img src={Bus} alt="" />
              <h3>123</h3>
            </div>
            <p>In transit</p>
          </div>

          <div className="boxes">
            <div className="top-wrapper">
              <img src={Shipped} alt="" />
              <h3>123</h3>
            </div>
            <p>Delivered</p>
          </div>

          <div className="boxes">
            <div className="top-wrapper">
              <img src={Canceled} alt="" />
              <h3>123</h3>
            </div>
            <p>Canceled</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Top;