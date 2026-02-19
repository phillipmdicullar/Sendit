import React, { useState } from 'react'
import '../user.css'

export default function CreateOrder(){
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [recipient, setRecipient] = useState('')
  const [weight, setWeight] = useState('')
  const [status, setStatus] = useState(null)

  async function handleSubmit(e){
    e.preventDefault()
    const payload = { pickup, destination, recipient, weight }
    try{
      const res = await fetch('/api/parcels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if(!res.ok) throw new Error('Failed')
      setStatus('Order created')
      setPickup(''); setDestination(''); setRecipient(''); setWeight('')
    }catch(err){
      setStatus('Error creating order')
    }
  }

  return (
    <div className="summary-container">
      <div className="summary-header">
        <h2>Create Parcel Order</h2>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Pickup address
          <input value={pickup} onChange={(e)=>setPickup(e.target.value)} />
        </label>
        <label>
          Destination address
          <input value={destination} onChange={(e)=>setDestination(e.target.value)} />
        </label>
        <label>
          Recipient name
          <input value={recipient} onChange={(e)=>setRecipient(e.target.value)} />
        </label>
        <label>
          Weight (kg)
          <input value={weight} onChange={(e)=>setWeight(e.target.value)} />
        </label>
        <div>
          <button className="primary-btn" type="submit">Create Order</button>
        </div>
      </form>
      {status && <p>{status}</p>}
    </div>
  )
}
