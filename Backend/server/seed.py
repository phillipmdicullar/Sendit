from server.app import create_app
from server.models import db, User, Parcel, ParcelStatus, Location, Notification
from werkzeug.security import generate_password_hash


def seed():
    app = create_app()
    with app.app_context():
        db.create_all()

        # Admin
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

        # Regular user
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

        # Sample parcels for regular user
        if not Parcel.query.filter_by(user_id=user.id).first():
            p1 = Parcel(
                user_id=user.id,
                pickup_location="123 Origin St",
                destination="456 Destination Ave",
                weight_category="small",
            )
            p2 = Parcel(
                user_id=user.id,
                pickup_location="789 Start Rd",
                destination="101 End Blvd",
                weight_category="large",
            )
            db.session.add_all([p1, p2])
            db.session.commit()

            # initial statuses
            s1 = ParcelStatus(parcel_id=p1.id, status="created")
            s2 = ParcelStatus(parcel_id=p2.id, status="created")
            db.session.add_all([s1, s2])

            # sample locations
            l1 = Location(parcel_id=p1.id, latitude=37.7749, longitude=-122.4194)
            l2 = Location(parcel_id=p2.id, latitude=40.7128, longitude=-74.0060)
            db.session.add_all([l1, l2])

            # notifications
            n1 = Notification(parcel_id=p1.id, email=user.email, message="Your parcel was created")
            n2 = Notification(parcel_id=p2.id, email=user.email, message="Your parcel was created")
            db.session.add_all([n1, n2])

            db.session.commit()

        # Summary
        user_count = User.query.count()
        parcel_count = Parcel.query.count()
        status_count = ParcelStatus.query.count()
        location_count = Location.query.count()
        notification_count = Notification.query.count()

        print(f"Seed complete: users={user_count}, parcels={parcel_count}, statuses={status_count}, locations={location_count}, notifications={notification_count}")


if __name__ == "__main__":
    seed()
