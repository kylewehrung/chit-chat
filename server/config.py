from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file

class Config:
    # Secret key for session management and security
    SECRET_KEY = os.getenv('SECRET_KEY') 
    
    # Database configuration
    SQLALCHEMY_DATABASE_URI = f"postgresql://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}@localhost/chit-chat-db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable Flask-SQLAlchemy event system
        
    # Debug mode setting
    DEBUG = True


# Create Flask app and SQLAlchemy instance
app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)

# Initialize API
api = Api(app)
