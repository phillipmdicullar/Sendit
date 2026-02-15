import React from 'react'
import Bell from '../../../assets/bell.png'
import './top.css';
import Box from './icons/box.png';
function Top() {
  return (
      <div className="section">
            <div className="top-section">
        <div className="dashboard">
            Dashboard
        </div>
        <div className="notification">
            <img src={Bell} alt="Notification Bell" />
            <span>1</span>
        </div>
    </div>
    <div className="center">
      <h2>Welcome back <span>Johny sins!</span></h2>
      <p>Manage your deliveries effieciently</p>
      <div className="box-wrapper">
        <div className="boxes">
          <div className="top-wrapper">
            <img src={Box}/>
          <h3>123</h3>
          </div>
          <p>Total parcels</p>
        </div>
                <div className="boxes">
          <div className="top-wrapper">
            <img src=""/>
          <h3>123</h3>
          </div>
          <p>In transist</p>
        </div>
                <div className="boxes">
          <div className="top-wrapper">
            <img src=""/>
          <h3>123</h3>
          </div>
          <p>Delivered</p>
        </div>
        <div className="boxes">
          <div className="top-wrapper">
            <img src=""/>
          <h3>123</h3>
          </div>
          <p>Canceled</p>
        </div>
        
      </div>
    </div>
      </div>
  )
}

export default Top