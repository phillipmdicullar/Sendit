const BASE_URL = "http://127.0.0.1:5000";

export const api = {
  getParcels: async () => {
    const res = await fetch(`${BASE_URL}/api/parcels`); // no headers
    return res.json();
  },

  createParcel: async (data) => {
    const res = await fetch(`${BASE_URL}/api/parcels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  changeDestination: async (id, destination) => {
    const res = await fetch(`${BASE_URL}/api/parcels/${id}/destination`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ destination }),
    });
    return res.json();
  },

  cancelParcel: async (id) => {
    const res = await fetch(`${BASE_URL}/api/parcels/${id}/cancel`, {
      method: "PATCH",
    });
    return res.json();
  },
  updateParcelAdmin: async (id, data) => {
  const res = await fetch(`${BASE_URL}/api/admin/parcels/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
},getNotifications: async () => {
  const res = await fetch(`${BASE_URL}/api/users/me/notifications`);
  return res.json();
},

getAdminNotifications: async () => {
  const res = await fetch(`${BASE_URL}/api/admin/notifications`);
  return res.json();
},

markNotificationRead: async (id) => {
  const res = await fetch(
    `${BASE_URL}/api/notifications/${id}/read`,
    { method: "PATCH" }
  );
  return res.json();
},
};