import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Orders(){
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    async function load(){
      try{
        const res = await fetch('/api/parcels')
        if(!res.ok) throw new Error('no')
        const data = await res.json()
        if(mounted) setOrders(data)
      }catch(err){
        // fallback sample data
        if(mounted) setOrders([
          { id: '200', pickup: 'Kware', destination: 'Nairobi CBD', status: 'In Transit', currentLocation: 'Kware Kwa Njenga', price: 200 }
        ])
      }finally{ if(mounted) setLoading(false) }
    }
    load()
    return ()=> mounted = false
  },[])

  if(loading) return <div>Loading orders...</div>

  return (
    <div className="summary-container">
      <div className="summary-header">
        <h2>My Orders</h2>
        <div className="summary-actions">
          <NavLink to="/user-dashboard/create" className="primary-btn">Create Order</NavLink>
        </div>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Pickup</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Current Location</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o=> (
              <tr key={o.id}>
                <td>#{o.id}</td>
                <td>{o.pickup}</td>
                <td>{o.destination}</td>
                <td><span className={`status ${o.status==='In Transit'?'transit':''}`}>{o.status}</span></td>
                <td>{o.currentLocation}</td>
                <td>KES {o.price ?? '—'}</td>
                <td className="actions">
                  <NavLink to={`/user-dashboard/orders/${o.id}`} className="view">View</NavLink>
                  <NavLink to={`/user-dashboard/orders/${o.id}`} className="edit">Edit</NavLink>
                  <button className="delete" onClick={async()=>{
                    if(!confirm('Cancel this order?')) return
                    try{ await fetch(`/api/parcels/${o.id}`,{ method: 'DELETE' })
                      setOrders(prev=>prev.filter(x=>x.id!==o.id))
                    }catch(e){ alert('Failed to cancel') }
                  }}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
