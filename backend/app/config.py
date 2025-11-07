"""
Configuration settings for Café Fausse Flask application
"""
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Config:
    """Base configuration"""
    
    # Flask
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    
    # Database
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql://localhost/cafe_fausse'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False  # Set to True to see SQL queries in console
    
    # CORS
    CORS_HEADERS = 'Content-Type'
    
    # Reservation settings
    RESERVATION_DURATION_HOURS = 2  # Default reservation duration
    MIN_ADVANCE_BOOKING_HOURS = 1   # Minimum hours in advance for booking
    MAX_GUESTS_PER_RESERVATION = 8  # Maximum guests per reservation
    
    # Restaurant hours (24-hour format)
    RESTAURANT_HOURS = {
        'monday': {'open': '17:00', 'close': '23:00'},
        'tuesday': {'open': '17:00', 'close': '23:00'},
        'wednesday': {'open': '17:00', 'close': '23:00'},
        'thursday': {'open': '17:00', 'close': '23:00'},
        'friday': {'open': '17:00', 'close': '23:00'},
        'saturday': {'open': '17:00', 'close': '23:00'},
        'sunday': {'open': '17:00', 'close': '21:00'},
    }


class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    SQLALCHEMY_ECHO = True  # Show SQL queries in development


class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    SQLALCHEMY_ECHO = False


class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://localhost/cafe_fausse_test'


# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
