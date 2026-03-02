import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { api } from "../../api/api";

const mapContainerStyle = {
  height: "500px",
  width: "100%",
};

export default function OrderDetails() {
  const { id } = useParams();
  const [parcel, setParcel] = useState(null);
  const [pickupPos, setPickupPos] = useState(null);
  const [destPos, setDestPos] = useState(null);

  // Replace with your Google Maps API Key
  const GOOGLE_MAPS_API_KEY = "AIzaSyAZCWy8JwbXSWS05QBXElvZaDsikj8VVZ4";

  useEffect(() => {
    const loadParcel = async () => {
      const data = await api.getParcels();
      const found = data.find((p) => p.id === Number(id));
      setParcel(found);

      // Geocode pickup and destination if coordinates not stored
      if (found) {
        // If you already store lat/lng, use them directly
        // For demo, let's assume we have coordinates in parcel
        if (found.pickup_lat && found.pickup_lng) {
          setPickupPos({ lat: found.pickup_lat, lng: found.pickup_lng });
        } else {
          // Fallback demo position
          setPickupPos({ lat: 37.7749, lng: -122.4194 });
        }

        if (found.dest_lat && found.dest_lng) {
          setDestPos({ lat: found.dest_lat, lng: found.dest_lng });
        } else {
          // Fallback demo position
          setDestPos({ lat: 34.0522, lng: -118.2437 });
        }
      }
    };

    loadParcel();
  }, [id]);

  if (!parcel || !pickupPos || !destPos) return <p>Loading parcel map...</p>;

  // Calculate center point between pickup and destination
  const center = {
    lat: (pickupPos.lat + destPos.lat) / 2,
    lng: (pickupPos.lng + destPos.lng) / 2,
  };

  return (
    <div>
      <h2>Parcel #{parcel.id}</h2>
      <p>Pickup: {parcel.pickup_location}</p>
      <p>Destination: {parcel.destination}</p>
      <p>Status: {parcel.status}</p>

      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={6}
          center={center}
        >
          {/* Pickup Marker */}
          <Marker position={pickupPos} label="P" />
          {/* Destination Marker */}
          <Marker position={destPos} label="D" />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}