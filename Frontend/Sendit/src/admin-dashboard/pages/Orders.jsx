import React, { useEffect, useState } from "react";
import { api } from "../../api/api"; // your api.js

function Orders() {
  const [parcels, setParcels] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadParcels = async () => {
      try {
        const data = await api.getParcels();
        // Fix here: handle array or { parcels: [...] }
        setParcels(Array.isArray(data) ? data : data.parcels || []);
      } catch (error) {
        console.error("Failed to fetch parcels:", error);
      }
    };
    loadParcels();
  }, []);

  // Filter parcels by search
  const filteredParcels = parcels.filter(p =>
    p.destination?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="summary-container">
      {/* HEADER */}
      <div className="summary-header">
        <h2>Parcel Orders</h2>
        <div className="summary-actions">
          <input
            type="text"
            placeholder="Search parcel..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="primary-btn">Search parcel</button>
        </div>
      </div>

      {/* TABLE */}
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
            {filteredParcels.length > 0 ? (
              filteredParcels.map(p => (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td>{p.pickup}</td>
                  <td>{p.destination}</td>
                  <td>
                    <span className={`status ${p.status.toLowerCase().replace(" ", "-")}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>{p.current_location}</td>
                  <td>KES {p.price}</td>
                  <td className="actions">
                    <button className="view">View</button>
                    <button className="edit">Edit</button>
                    <button className="delete">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No parcels found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;