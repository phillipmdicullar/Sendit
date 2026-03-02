from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


# ------------------ USER ------------------
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default="user")

    parcels = db.relationship(
        "Parcel",
        backref="user",
        lazy=True,
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<User {self.name} ({self.email})>"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role,
            "parcels": [p.to_dict() for p in self.parcels]
        }


# ------------------ PARCEL ------------------
class Parcel(db.Model):
    __tablename__ = "parcels"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    pickup_location = db.Column(db.String(255))
    destination = db.Column(db.String(255))
    weight_category = db.Column(db.String(50))
    is_cancelled = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    statuses = db.relationship(
        "ParcelStatus",
        backref="parcel",
        lazy=True,
        cascade="all, delete-orphan",
        order_by="ParcelStatus.timestamp"
    )
    locations = db.relationship(
        "Location",
        backref="parcel",
        lazy=True,
        cascade="all, delete-orphan",
        order_by="Location.created_at"
    )
    notifications = db.relationship(
        "Notification",
        backref="parcel",
        lazy=True,
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Parcel {self.id} from {self.pickup_location} to {self.destination}>"

    def to_dict(self):
        latest_status = self.statuses[-1].status if self.statuses else "Pending"

        latest_location = (
            {
                "latitude": self.locations[-1].latitude,
                "longitude": self.locations[-1].longitude,
            }
            if self.locations else None
        )

        return {
            "id": self.id,
            "user_id": self.user_id,
            "pickup_location": self.pickup_location,
            "destination": self.destination,
            "weight_category": self.weight_category,
            "is_cancelled": self.is_cancelled,
            "status": latest_status,
            "current_location": latest_location,
            "created_at": self.created_at.isoformat(),
            "notifications": [n.to_dict() for n in self.notifications]
        }


# ------------------ PARCEL STATUS ------------------
class ParcelStatus(db.Model):
    __tablename__ = "parcel_statuses"

    id = db.Column(db.Integer, primary_key=True)
    parcel_id = db.Column(
        db.Integer,
        db.ForeignKey("parcels.id"),
        nullable=False,
        index=True
    )
    status = db.Column(db.String(50))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<ParcelStatus {self.status} at {self.timestamp}>"

    def to_dict(self):
        return {
            "id": self.id,
            "parcel_id": self.parcel_id,
            "status": self.status,
            "timestamp": self.timestamp.isoformat()
        }


# ------------------ LOCATION ------------------
class Location(db.Model):
    __tablename__ = "locations"

    id = db.Column(db.Integer, primary_key=True)
    parcel_id = db.Column(
        db.Integer,
        db.ForeignKey("parcels.id"),
        nullable=False,
        index=True
    )
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Location {self.latitude}, {self.longitude} at {self.created_at}>"

    def to_dict(self):
        return {
            "id": self.id,
            "parcel_id": self.parcel_id,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "created_at": self.created_at.isoformat()
        }


# ------------------ NOTIFICATION ------------------
class Notification(db.Model):
    __tablename__ = "notifications"

    id = db.Column(db.Integer, primary_key=True)
    parcel_id = db.Column(
        db.Integer,
        db.ForeignKey("parcels.id"),
        nullable=False,
        index=True
    )
    email = db.Column(db.String(120))
    message = db.Column(db.Text)
    is_read = db.Column(db.Boolean, default=False)
    sent_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Notification to {self.email} at {self.sent_at}>"

    def to_dict(self):
        return {
            "id": self.id,
            "parcel_id": self.parcel_id,
            "email": self.email,
            "message": self.message,
            "is_read": self.is_read,
            "sent_at": self.sent_at.isoformat()
        }