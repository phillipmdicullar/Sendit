from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from server.models import db, User, Parcel, ParcelStatus, Location, Notification

api = Blueprint("api", __name__, url_prefix="/api")


# ---------------- TEMP AUTH BYPASS ----------------
def fake_identity():
    # pretend user 1 is logged in
    return {"id": 1, "role": "admin"}
# --------------------------------------------------


# ================= AUTH =================
@api.route("/auth/register", methods=["POST"])
def register():
    data = request.get_json()

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already exists"}), 400

    user = User(
        name=data["name"],
        email=data["email"],
        password=generate_password_hash(data["password"])
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


@api.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()

    if not user or not check_password_hash(user.password, data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({"message": "Login successful", "user_id": user.id})


# ================= USER =================
@api.route("/users/me", methods=["GET"])
def get_profile():
    identity = fake_identity()
    user = User.query.get_or_404(identity["id"])

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role
    })


@api.route("/users/me/notifications", methods=["GET"])
def get_notifications():
    identity = fake_identity()
    user = User.query.get_or_404(identity["id"])

    notifications = (
        Notification.query
        .join(Parcel)
        .filter(Parcel.user_id == user.id)
        .order_by(Notification.sent_at.desc())
        .all()
    )

    return jsonify([
        {
            "id": n.id,
            "message": n.message,
            "is_read": n.is_read,
            "sent_at": n.sent_at.isoformat()
        }
        for n in notifications
    ])


@api.route("/notifications/<int:notification_id>/read", methods=["PATCH"])
def mark_notification_read(notification_id):
    identity = fake_identity()

    notification = Notification.query.get_or_404(notification_id)

    # 🔐 Ensure user owns this notification
    if notification.parcel.user_id != identity["id"]:
        return jsonify({"error": "Unauthorized"}), 403

    notification.is_read = True
    db.session.commit()

    return jsonify({"message": "Notification marked as read"})


# ================= ADMIN NOTIFICATIONS =================
@api.route("/admin/notifications", methods=["GET"])
def admin_notifications():
    identity = fake_identity()

    if identity["role"] != "admin":
        return jsonify({"error": "Unauthorized"}), 403

    notifications = (
        Notification.query
        .order_by(Notification.sent_at.desc())
        .limit(20)
        .all()
    )

    return jsonify([
        {
            "id": n.id,
            "message": n.message,
            "is_read": n.is_read,
            "sent_at": n.sent_at.isoformat()
        }
        for n in notifications
    ])


# ================= PARCELS =================
@api.route("/parcels", methods=["POST"])
def create_parcel():
    identity = fake_identity()
    data = request.get_json()

    parcel = Parcel(
        user_id=identity["id"],
        pickup_location=data["pickup_location"],
        destination=data["destination"],
        weight_category=data["weight_category"]
    )

    db.session.add(parcel)
    db.session.commit()

    status = ParcelStatus(parcel_id=parcel.id, status="created")
    db.session.add(status)

    # 🔔 Notification
    notification = Notification(
        parcel_id=parcel.id,
        email=parcel.user.email,
        message="Your parcel has been created."
    )
    db.session.add(notification)

    db.session.commit()

    return jsonify({"message": "Parcel created", "parcel_id": parcel.id}), 201


@api.route("/parcels", methods=["GET"])
def get_user_parcels():
    parcels = Parcel.query.all()

    return jsonify([p.to_dict() for p in parcels])


@api.route("/admin/parcels/<int:parcel_id>", methods=["PATCH"])
def admin_update_parcel(parcel_id):
    identity = fake_identity()

    if identity["role"] != "admin":
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    parcel = Parcel.query.get_or_404(parcel_id)

    # ---- Destination update ----
    if "destination" in data and data["destination"]:
        parcel.destination = data["destination"]

        notification = Notification(
            parcel_id=parcel.id,
            email=parcel.user.email,
            message=f"Destination updated to {data['destination']}."
        )
        db.session.add(notification)

    # ---- Status update ----
    if "status" in data and data["status"]:
        status = ParcelStatus(
            parcel_id=parcel.id,
            status=data["status"]
        )
        db.session.add(status)

        notification = Notification(
            parcel_id=parcel.id,
            email=parcel.user.email,
            message=f"Your parcel is now '{data['status']}'."
        )
        db.session.add(notification)

    # ---- Location update ----
    if "latitude" in data and "longitude" in data:
        location = Location(
            parcel_id=parcel.id,
            latitude=data["latitude"],
            longitude=data["longitude"]
        )
        db.session.add(location)

    db.session.commit()

    return jsonify({"message": "Parcel updated successfully"})


@api.route("/parcels/<int:parcel_id>/cancel", methods=["PATCH"])
def cancel_parcel(parcel_id):
    identity = fake_identity()
    parcel = Parcel.query.get_or_404(parcel_id)

    parcel.is_cancelled = True

    status = ParcelStatus(parcel_id=parcel.id, status="cancelled")
    db.session.add(status)

    notification = Notification(
        parcel_id=parcel.id,
        email=parcel.user.email,
        message="Your parcel has been cancelled."
    )
    db.session.add(notification)

    db.session.commit()

    return jsonify({"message": "Parcel cancelled"})