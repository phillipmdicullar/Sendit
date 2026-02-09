from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash
from server.models import db, User, Parcel, ParcelStatus, Location, Notification

api = Blueprint("api", __name__, url_prefix="/api")


# ---------- AUTH ----------
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

    token = create_access_token(identity={"id": user.id, "role": user.role})

    return jsonify(access_token=token)


# ---------- USER ----------
@api.route("/users/me", methods=["GET"])
@jwt_required()
def get_profile():
    identity = get_jwt_identity()
    user = User.query.get(identity["id"])

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role
    })


# ---------- PARCELS ----------
@api.route("/parcels", methods=["POST"])
@jwt_required()
def create_parcel():
    identity = get_jwt_identity()
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
    db.session.commit()

    return jsonify({"message": "Parcel created", "parcel_id": parcel.id}), 201


@api.route("/parcels", methods=["GET"])
@jwt_required()
def get_user_parcels():
    identity = get_jwt_identity()
    parcels = Parcel.query.filter_by(user_id=identity["id"]).all()

    return jsonify([
        {
            "id": p.id,
            "destination": p.destination,
            "status": p.statuses[-1].status if p.statuses else "unknown"
        } for p in parcels
    ])


@api.route("/parcels/<int:parcel_id>/destination", methods=["PATCH"])
@jwt_required()
def change_destination(parcel_id):
    data = request.get_json()
    parcel = Parcel.query.get_or_404(parcel_id)

    parcel.destination = data["destination"]
    db.session.commit()

    return jsonify({"message": "Destination updated"})


@api.route("/parcels/<int:parcel_id>/cancel", methods=["PATCH"])
@jwt_required()
def cancel_parcel(parcel_id):
    parcel = Parcel.query.get_or_404(parcel_id)
    parcel.is_cancelled = True

    status = ParcelStatus(parcel_id=parcel.id, status="cancelled")
    db.session.add(status)
    db.session.commit()

    return jsonify({"message": "Parcel cancelled"})


# ---------- ADMIN ----------
@api.route("/admin/parcels/<int:parcel_id>/status", methods=["PATCH"])
@jwt_required()
def update_status(parcel_id):
    identity = get_jwt_identity()
    if identity["role"] != "admin":
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    parcel = Parcel.query.get_or_404(parcel_id)

    status = ParcelStatus(parcel_id=parcel.id, status=data["status"])
    location = Location(
        parcel_id=parcel.id,
        latitude=data["latitude"],
        longitude=data["longitude"]
    )

    db.session.add_all([status, location])
    db.session.commit()

    return jsonify({"message": "Status updated"})
