import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { toast } from "react-toastify";
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import "./details.css";
const containerStyle = { width: "100%", height: "400px" };

export default function EditOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [parcel, setParcel] = useState(null);
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });

  const [autocomplete, setAutocomplete] = useState(null);

  const { isLoaded } = useJsApiLoader({
  googleMapsApiKey: "AIzaSyAZCWy8JwbXSWS05QBXElvZaDsikj8VVZ4", // your key directly
  libraries: ["places"],
});

  useEffect(() => {
    const loadParcel = async () => {
      const data = await api.getParcels();
      const found = data.find((p) => p.id === Number(id));
      if (found) {
        setParcel(found);
        setDestination(found.destination);
        setStatus(found.status);
        if (found.current_location) {
          setLocation({
            lat: found.current_location.latitude,
            lng: found.current_location.longitude,
          });
        }
      }
    };
    loadParcel();
  }, [id]);

  const handleMapClick = (e) => {
    setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.lat || !location.lng) {
      toast.error("Please select a valid location on the map!");
      return;
    }

    try {
      const res = await api.updateParcelAdmin(id, {
        destination,
        status,
        latitude: location.lat,
        longitude: location.lng,
      });

      if (res.message) {
        toast.success("Parcel updated successfully 🚚");
        setTimeout(() => navigate("/admin-dashboard"), 1500);
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Server error occurred");
    }
  };

  if (!parcel || !isLoaded) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Parcel #{parcel.id}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="in_transit">In Transit</option>
          <option value="arrived">Arrived</option>
          <option value="delivered">Delivered</option>
        </select>

        <Autocomplete
          onLoad={(ref) => setAutocomplete(ref)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input type="text" placeholder="Search for location..." />
        </Autocomplete>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location.lat && location.lng ? location : { lat: -1.2921, lng: 36.8219 }}
          zoom={12}
          onClick={handleMapClick}
        >
          {location.lat && location.lng && <Marker position={location} />}
        </GoogleMap>

        <button type="submit">Update Parcel</button>
      </form>
    </div>
  );
}