from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from dotenv import load_dotenv
import os

load_dotenv() # Load environment variables from .env file

def create_app():
    app = Flask(__name__)

    # Check if the application is running in development mode
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')

    # Function to correct the dialect in the DATABASE_URL
    def correct_database_url(url):
        return url.replace('postgres://', 'postgresql://')

    # Use the corrected DATABASE_URL for production
    if FLASK_ENV == 'production':
        SQLALCHEMY_DATABASE_URI = correct_database_url(os.getenv('DATABASE_URL'))
    else:
        SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_URL')

    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Disable Flask-SQLAlchemy event system
    app.config['DEBUG'] = True if FLASK_ENV == 'development' else False

    db = SQLAlchemy(app)

    # Initialize API
    api = Api(app)

    return app

app = create_app()
