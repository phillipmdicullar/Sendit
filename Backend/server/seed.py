from server.app import create_app
from server.models import db, User, Parcel, ParcelStatus, Location, Notification
from werkzeug.security import generate_password_hash
import random

def seed():
    app = create_app()
    with app.app_context():
        db.create_all()

        # ---------- USERS ----------
        admin_email = "admin@example.com"
        admin = User.query.filter_by(email=admin_email).first()
        if not admin:
            admin = User(
                name="Admin",
                email=admin_email,
                password=generate_password_hash("adminpass"),
                role="admin",
            )
            db.session.add(admin)

        user_email = "user@example.com"
        user = User.query.filter_by(email=user_email).first()
        if not user:
            user = User(
                name="Test User",
                email=user_email,
                password=generate_password_hash("userpass"),
            )
            db.session.add(user)

        db.session.commit()

        # ---------- PARCELS ----------
        # Only create if user has less than 20 parcels
        existing_parcels = Parcel.query.filter_by(user_id=user.id).count()
        parcels_needed = 20 - existing_parcels
        if parcels_needed > 0:
            sample_pickups = [
                "123 Origin St", "456 Start Rd", "789 Alpha Ave",
                "101 Beta Blvd", "202 Gamma St", "303 Delta Rd"
            ]
            sample_destinations = [
                "111 End St", "222 Target Rd", "333 Finish Blvd",
                "444 Omega St", "555 Zeta Rd", "666 Theta Ave"
            ]
            weight_categories = ["small", "medium", "large"]
            statuses = ["created", "pending", "in_transit", "arrived", "delivered"]

            for i in range(parcels_needed):
                pickup = random.choice(sample_pickups)
                dest = random.choice(sample_destinations)
                weight = random.choice(weight_categories)

                parcel = Parcel(
                    user_id=user.id,
                    pickup_location=pickup,
                    destination=dest,
                    weight_category=weight
                )
                db.session.add(parcel)
                db.session.commit()  # commit so we have parcel.id

                # Status
                status = ParcelStatus(parcel_id=parcel.id, status=random.choice(statuses))
                db.session.add(status)

                # Location
                lat = round(random.uniform(-1.5, 1.5) + 37.0, 6)   # rough random near some coordinate
                lon = round(random.uniform(-1.5, 1.5) - 122.0, 6)
                location = Location(parcel_id=parcel.id, latitude=lat, longitude=lon)
                db.session.add(location)

                # Notification
                notification = Notification(
                    parcel_id=parcel.id,
                    email=user.email,
                    message=f"Parcel {parcel.id} is {status.status}"
                )
                db.session.add(notification)

            db.session.commit()

        # ---------- SUMMARY ----------
        print(f"Seed complete: users={User.query.count()}, parcels={Parcel.query.count()}, "
              f"statuses={ParcelStatus.query.count()}, locations={Location.query.count()}, "
              f"notifications={Notification.query.count()}")

if __name__ == "__main__":
    seed()