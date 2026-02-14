import React from 'react'
import Bell from '../../../assets/bell.png'
import './top.css'
function Top() {
  return (
    <div className="top-section">
        <div className="dashboard">
            Dashboard
        </div>
        <div className="notification">
            <img src={Bell} alt="Notification Bell" />
            <span>1</span>
        </div>
    </div>
  )
}

export default Top