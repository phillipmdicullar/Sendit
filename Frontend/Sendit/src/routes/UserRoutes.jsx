import React from 'react'
import { Routes, Route } from 'react-router-dom'

import UserLayout from '../user-dashboard/UserLayout'
import CreateOrder from '../user-dashboard/pages/CreateOrder'
import Orders from '../user-dashboard/pages/Orders'
import OrderDetail from '../user-dashboard/pages/OrderDetail'

function UserRoutes(){
  return (
    <Routes>
      <Route path="/user-dashboard" element={<UserLayout />}>
        <Route index element={<Orders />} />
        <Route path="create" element={<CreateOrder />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrderDetail />} />
      </Route>
    </Routes>
  )
}

export default UserRoutes
