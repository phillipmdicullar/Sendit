import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";

export default function OrderDetails() {
  const { id } = useParams();
  const [parcel, setParcel] = useState(null);

  useEffect(() => {
    const loadParcel = async () => {
      const data = await api.getParcels();
      const found = data.find(p => p.id === Number(id));
      setParcel(found);
    };
    loadParcel();
  }, [id]);

  if (!parcel) return <p>Loading...</p>;

  // Safely convert current_location object to string
  const locationStr = parcel.current_location
    ? `${parcel.current_location.latitude}, ${parcel.current_location.longitude}`
    : "Unknown";

  return (
    <div>
      <h2>Parcel #{parcel.id}</h2>
      <p>Pickup: {parcel.pickup_location}</p>
      <p>Destination: {parcel.destination}</p>
      <p>Status: {parcel.status}</p>
      <p>Current Location: {locationStr}</p>
    </div>
  );
}