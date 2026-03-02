import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import "./notification.css";

export default function NotificationBell({ admin = false }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const loadNotifications = async () => {
    const data = admin
      ? await api.getAdminNotifications()
      : await api.getNotifications();

    setNotifications(data);
  };

  useEffect(() => {
  loadNotifications();

  const interval = setInterval(loadNotifications, 10000);
  return () => clearInterval(interval);
}, [admin]); // ✅ add dependency

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const markRead = async (id) => {
    await api.markNotificationRead(id);
    loadNotifications();
  };
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);
  
  return (
    <div className="notification-wrapper">
      <div className="bell" onClick={(e) => {
  e.stopPropagation();
  setOpen(!open);
}}>
        🔔
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </div>

      {open && (
        <div className="dropdown">
          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`notification ${n.is_read ? "" : "unread"}`}
                onClick={() => markRead(n.id)}
              >
                {n.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
