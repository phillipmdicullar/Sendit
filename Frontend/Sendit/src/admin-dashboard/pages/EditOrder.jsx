import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import "./edit-order.css";
export default function EditOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.changeDestination(id, destination);

    navigate("/admin-dashboard");
  };

  return (
    <div>
      <h2>Edit Destination</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="New destination"
          required
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}