import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/api";
import "./summary.css";

export default function Summary() {
  const [parcels, setParcels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadParcels();
  }, []);

  const loadParcels = async () => {
    const data = await api.getParcels();
    setParcels(data);
  };

  const handleCancel = async (id) => {
    await api.cancelParcel(id);
    loadParcels();
  };

  return (
    <div className="summary-container">
      <h2>My Parcels</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Pickup</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {parcels.map(parcel => (
            <tr key={parcel.id}>
              <td>#{parcel.id}</td>
              <td>{parcel.pickup_location}</td>
              <td>{parcel.destination}</td>
              <td>{parcel.status}</td>
              <td>
                {parcel.current_location
                  ? `${parcel.current_location.latitude}, ${parcel.current_location.longitude}`
                  : "Unknown"}
              </td>

              <td className="actions">
                <button
                  className="view"
                  onClick={() =>
                    navigate(`/admin-dashboard/orders/${parcel.id}`)
                  }
                >
                  View
                </button>

                <button
                  className="edit"
                  onClick={() =>
                    navigate(`/admin-dashboard/orders/${parcel.id}/edit`)
                  }
                >
                  Edit
                </button>

                <button className="delete" onClick={() => handleCancel(parcel.id)}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}