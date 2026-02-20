import React from 'react'
import { Routes, Route } from 'react-router-dom'

import UserLayout from '../user/UserLayout'
import CreateOrder from '../user/pages/CreateOrder'
import Orders from '../user/pages/Orders'
import OrderDetail from '../user/pages/OrderDetail'

function UserRoutes(){
  return (
    <Routes>
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<Orders />} />
        <Route path="create" element={<CreateOrder />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrderDetail />} />
      </Route>
    </Routes>
  )
}

export default UserRoutes
