import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";

export default function OrderDetails() {
  const { id } = useParams();
  const [parcel, setParcel] = useState(null);

  useEffect(() => {
    api.getParcels().then(data => {
      const found = data.find(p => p.id === Number(id));
      setParcel(found);
    });
  }, [id]);

  if (!parcel) return <p>Loading...</p>;

  return (
    <div>
      <h2>Parcel #{parcel.id}</h2>
      <p>Pickup: {parcel.pickup_location}</p>
      <p>Destination: {parcel.destination}</p>
      <p>Status: {parcel.status}</p>
      <p>Current Location: {parcel.current_location}</p>
    </div>
  );
}