"""
Application entry point for Café Fausse Flask API
"""
import os
from app import create_app

# Get environment (default to development)
config_name = os.environ.get('FLASK_ENV', 'development')

# Create Flask app
app = create_app(config_name)

if __name__ == '__main__':
    # Run the application
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=(config_name == 'development')
    )
