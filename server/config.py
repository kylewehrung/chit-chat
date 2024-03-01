from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from dotenv import load_dotenv
import os

load_dotenv() # Load environment variables from .env file

class Config:
    # Secret key for session management and security
    SECRET_KEY = os.getenv('SECRET_KEY') 
    
    # Function to correct the dialect in the DATABASE_URL
    def correct_database_url(url):
        return url.replace('postgres://', 'postgresql://')

    # Use the corrected DATABASE_URL for production
    if os.getenv('FLASK_ENV') == 'production':
        SQLALCHEMY_DATABASE_URI = correct_database_url(os.getenv('DATABASE_URL'))
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
