import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { toast } from "react-toastify";

export default function EditOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [parcel, setParcel] = useState(null);
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Load parcel details when component mounts
  useEffect(() => {
    const loadParcel = async () => {
      try {
        const data = await api.getParcels();
        const found = data.find(p => p.id === Number(id));
        if (!found) return toast.error("Parcel not found");

        setParcel(found);

        // Pre-fill form with existing data
        setDestination(found.destination || "");
        setStatus(found.status || "");
        setLatitude(found.current_location?.latitude ?? "");
        setLongitude(found.current_location?.longitude ?? "");
      } catch (err) {
        toast.error("Failed to load parcel");
      }
    };
    loadParcel();
  }, [id]);

  if (!parcel) return <p>Loading parcel...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only send fields that were modified
    const payload = {};
    if (destination !== parcel.destination) payload.destination = destination;
    if (status !== parcel.status) payload.status = status;
    if (latitude !== (parcel.current_location?.latitude ?? "")) payload.latitude = latitude;
    if (longitude !== (parcel.current_location?.longitude ?? "")) payload.longitude = longitude;

    if (Object.keys(payload).length === 0) {
      toast.info("No changes made");
      return;
    }

    try {
      const res = await api.updateParcelAdmin(id, payload);

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

  return (
    <div>
      <h2>Edit Parcel (Admin)</h2>

      <form onSubmit={handleSubmit}>
        {/* Destination */}
        <input
          placeholder="New destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        {/* Status */}
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="in_transit">In Transit</option>
          <option value="arrived">Arrived</option>
          <option value="delivered">Delivered</option>
        </select>

        {/* Location */}
        <input
          type="number"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="number"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />

        <button type="submit">Update Parcel</button>
      </form>
    </div>
  );
}