import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Users from '../admin-dashboard/pages/Users';
import Admin from '../admin-dashboard/Admin';
import Orders from '../admin-dashboard/pages/Orders';
import Analytics from '../admin-dashboard/pages/Analytics';
import Customers from '../admin-dashboard/pages/Customers';
import AdminHome from '../admin-dashboard/pages/AdminHome';
import Settings from '../admin-dashboard/pages/Settings';

function AdminRoutes() {
  return (
    <Routes>

      {/* Parent Layout */}
      <Route path="/admin-dashboard" element={<Admin />}>

        {/* Child routes rendered in <Outlet /> */}
        <Route index element={<AdminHome />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="orders" element={<Orders />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="customers" element={<Customers />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />

      </Route>

    </Routes>
  )
}

export default AdminRoutes
