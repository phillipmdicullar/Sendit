import React from 'react'

export default function Map({ pickup, destination }){
  return (
    <div style={{border:'1px solid #e6eef8', borderRadius:8, padding:12}}>
      <h4>Map placeholder</h4>
      <p>Pickup: {pickup}</p>
      <p>Destination: {destination}</p>
      <div style={{width:'100%',height:200,background:'#f1f5f9',display:'flex',alignItems:'center',justifyContent:'center'}}>Install Google Maps and provide API key to render map here.</div>
    </div>
  )
}
