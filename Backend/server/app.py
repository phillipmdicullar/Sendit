from flask import Flask
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from server.config import Config
from server.models import db
from server.routes import api

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    JWTManager(app)
    # Enable database migrations
    Migrate(app, db)

    app.register_blueprint(api)

    @app.route("/")
    def health_check():
        return {"status": "SendIT API running"}

    return app


app = create_app()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=5000, debug=True)
