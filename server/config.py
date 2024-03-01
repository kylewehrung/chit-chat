from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from dotenv import load_dotenv
import os

load_dotenv() # Load environment variables from .env file

class Config:
    # Secret key for session management and security
    SECRET_KEY = os.getenv('SECRET_KEY') 
    
    # Check if the application is running in development mode
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')
    
    # Database configuration
    if FLASK_ENV == 'production':
        SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    else:
        SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_URL')
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False # Disable Flask-SQLAlchemy event system
        
    # Debug mode setting
    DEBUG = True if FLASK_ENV == 'development' else False


# Create Flask app and SQLAlchemy instance
app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)

# Initialize API
api = Api(app)
