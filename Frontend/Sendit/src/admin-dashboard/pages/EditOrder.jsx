import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import "./edit-order.css";
import { toast } from "react-toastify";
export default function EditOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await api.changeDestination(id, destination);

    if (res.message || res.success) {
      toast.success("Destination updated successfully ");
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 1500);
    } else {
      toast.error("Failed to update destination ");
    }

  } catch (error) {
    toast.error("Server error occurred ");
  }
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