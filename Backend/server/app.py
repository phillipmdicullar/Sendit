# server/app.py
from flask import Flask
from flask_migrate import Migrate
from server.config import Config
from server.models import db
from server.routes import api
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for frontend development
    CORS(
        app,
        resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        expose_headers=["Content-Type", "Authorization"]
    )

    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)

    # Register API routes
    app.register_blueprint(api)

    # Health check route
    @app.route("/")
    def health_check():
        return {"status": "SendIT API running"}

    return app


# Only run if this script is executed directly
if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        # Create tables if they don't exist (helpful for testing without migrations)
        db.create_all()
    app.run(host="0.0.0.0", port=5000, debug=True)