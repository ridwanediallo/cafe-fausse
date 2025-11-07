"""
Flask Application Factory for Café Fausse
"""
from flask import Flask
from flask_cors import CORS
from app.config import config
from app.models import db


def create_app(config_name='default'):
    """
    Application factory pattern
    Creates and configures the Flask application
    """
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)  # Enable CORS for all routes
    
    # Register blueprints
    from app.routes.menu_routes import menu_bp
    from app.routes.reservation_routes import reservation_bp
    from app.routes.customer_routes import customer_bp
    
    app.register_blueprint(menu_bp, url_prefix='/api/menu')
    app.register_blueprint(reservation_bp, url_prefix='/api/reservations')
    app.register_blueprint(customer_bp, url_prefix='/api/customers')
    
    # Health check route
    @app.route('/api/health')
    def health_check():
        return {'status': 'healthy', 'message': 'Café Fausse API is running'}, 200
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return {'error': 'Resource not found'}, 404
    
    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return {'error': 'Internal server error'}, 500
    
    return app
