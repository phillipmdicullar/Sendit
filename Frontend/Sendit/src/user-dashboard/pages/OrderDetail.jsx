import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Map from '../components/Map'

export default function OrderDetail(){
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [editing, setEditing] = useState(false)
  const [destination, setDestination] = useState('')

  useEffect(()=>{
    let mounted = true
    async function load(){
      try{
        const res = await fetch(`/api/parcels/${id}`)
        const data = await res.json()
        if(mounted) { setOrder(data); setDestination(data.destination) }
      }catch(err){
        // fallback
        if(mounted) setOrder({ id, pickup: 'Kware', destination: 'Nairobi CBD', status: 'In Transit', currentLocation: 'Kware Kwa Njenga', price: 200 })
      }
    }
    load()
    return ()=> mounted = false
  },[id])

  if(!order) return <div>Loading...</div>

  async function save(){
    try{
      await fetch(`/api/parcels/${id}`, {
        method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ destination })
      })
      setOrder(prev=>({ ...prev, destination }))
      setEditing(false)
    }catch(err){ alert('Failed') }
  }

  async function cancel(){
    if(!confirm('Cancel this order?')) return
    try{ await fetch(`/api/parcels/${id}`, { method: 'DELETE' }); alert('Cancelled') }catch(e){ alert('Failed') }
  }

  return (
    <div className="summary-container">
      <div className="summary-header">
        <h2>Order #{order.id}</h2>
      </div>
      <div style={{display:'flex',gap:20}}>
        <div style={{flex:1}}>
          <p><strong>Pickup:</strong> {order.pickup}</p>
          <p><strong>Destination:</strong> {order.destination}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Current location:</strong> {order.currentLocation}</p>
          <p><strong>Price:</strong> KES {order.price}</p>

          {editing ? (
            <div>
              <label>Destination<input value={destination} onChange={e=>setDestination(e.target.value)} /></label>
              <div><button className="primary-btn" onClick={save}>Save</button> <button onClick={()=>setEditing(false)}>Cancel</button></div>
            </div>
          ) : (
            <div style={{marginTop:12}}>
              <button className="edit" onClick={()=>setEditing(true)}>Edit Destination</button>
              <button className="delete" onClick={cancel}>Cancel Order</button>
            </div>
          )}
        </div>
        <div style={{width:400}}>
          <Map pickup={order.pickup} destination={order.destination} />
        </div>
      </div>
    </div>
  )
}
