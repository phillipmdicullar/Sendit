import React, { useEffect, useState } from 'react';
import './top.css';

import Box from './icons/box.png';
import Bus from './icons/bus.png';
import Shipped from './icons/shipped.png';
import Canceled from './icons/cancel-order.png';

import NotificationBell from '../../../components/NotificationBell';
import { api } from '../../../api/api';

function Top() {
  const [stats, setStats] = useState({
    total: 0,
    inTransit: 0,
    delivered: 0,
    canceled: 0,
  });

  const fetchStats = async () => {
    try {
      const parcels = await api.getParcels();

      // Compute counts
      const total = parcels.length;
      const inTransit = parcels.filter(p => p.status === 'in_transit').length;
      const delivered = parcels.filter(p => p.status === 'arrived').length;
      const canceled = parcels.filter(p => p.is_cancelled).length;

      setStats({ total, inTransit, delivered, canceled });
    } catch (err) {
      console.error('Failed to fetch parcel stats:', err);
    }
  };

  // Initial fetch + refresh every 10 seconds for "real-time" updates
  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="section">

      {/* HEADER */}
      <div className="top-section">
        <div className="dashboard">
          Dashboard
        </div>

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
              <h3>{stats.total}</h3>
            </div>
            <p>Total parcels</p>
          </div>

          <div className="boxes">
            <div className="top-wrapper">
              <img src={Bus} alt="" />
              <h3>{stats.inTransit}</h3>
            </div>
            <p>In transit</p>
          </div>

          <div className="boxes">
            <div className="top-wrapper">
              <img src={Shipped} alt="" />
              <h3>{stats.delivered}</h3>
            </div>
            <p>Delivered</p>
          </div>

          <div className="boxes">
            <div className="top-wrapper">
              <img src={Canceled} alt="" />
              <h3>{stats.canceled}</h3>
            </div>
            <p>Canceled</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Top;