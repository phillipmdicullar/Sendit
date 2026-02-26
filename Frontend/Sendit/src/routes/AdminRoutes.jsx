import React from "react";
import { Routes, Route } from "react-router-dom";

import Admin from "../admin-dashboard/Admin";
import AdminHome from "../admin-dashboard/pages/AdminHome";
import Orders from "../admin-dashboard/pages/Orders";
import Analytics from "../admin-dashboard/pages/Analytics";
import Customers from "../admin-dashboard/pages/Customers";
import Users from "../admin-dashboard/pages/Users";
import Settings from "../admin-dashboard/pages/Settings";
import Notification from "../admin-dashboard/pages/Notification";
import OrderDetails from "../admin-dashboard/pages/OrderDetails";
import EditOrder from "../admin-dashboard/pages/EditOrder";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin-dashboard" element={<Admin />}>
        <Route index element={<AdminHome />} />
        <Route path="home" element={<AdminHome />} />

        {/* ORDERS */}
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrderDetails />} />
        <Route path="orders/:id/edit" element={<EditOrder />} />

        <Route path="analytics" element={<Analytics />} />
        <Route path="customers" element={<Customers />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notification />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;