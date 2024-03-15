from flask import Flask, request, jsonify, session, abort
from flask_restful import Api, Resource
from flask_cors import CORS
from .config import app, api, db
from .models import User
import os
from dotenv import load_dotenv
import logging


# Configure logging
logging.basicConfig(level=logging.INFO)

load_dotenv()



# Check if the application is running in development mode
FLASK_ENV = os.getenv('FLASK_ENV', 'development')

# Set the base URL for API endpoints based on the environment
if FLASK_ENV == 'production':
    BASE_URL = '/api'  
    CORS(app, supports_credentials=True, origins=['https://main.dgifr50bzat5p.amplifyapp.com']) 
else:
    BASE_URL = '/api'  
    CORS(app, supports_credentials=True, origins=['http://localhost:4000'])
    print('development')



# Set session cookie options
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # Will need to change this to partitioned?
app.config['SESSION_COOKIE_SECURE'] = True




class HelloWorld(Resource):
    def get(self):
        return 'hello world!!!'


class Register(Resource):
    def post(self):
        data = request.json
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        if not username or not email or not password:
            return {'message': 'Missing parameters'},  400

        if User.query.filter_by(username=username).first():
            return {'message': 'Username already exists'},  409

        if User.query.filter_by(email=email).first():
            return {'message': 'Email already exists'},  409

        new_user = User(username=username, email=email, password=password)
        db.session.add(new_user)
        session['logged_in'] = True
        db.session.commit()

        return {'message': 'User created successfully'},  201


class Login(Resource):
    def post(self):
        data = request.json
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return {'message': 'Missing username or password'},  400

        user = User.query.filter_by(username=username).first()
        if not user or not user.check_password(password):
            return {'message': 'Invalid username or password'},  401

        session['logged_in'] = True
        return {'message': 'Logged in successfully'},  200


class Logout(Resource):
    def delete(self):
        if session.get("logged_in"):
            # Clear the session
            session.clear()
            return {},   204  # No content response for successful logout

        return {"error": "Unauthorized", "status_code":   401},   401


class CheckSession(Resource):
    def get(self):
        logged_in = session.get('logged_in')
        if logged_in:
            return {'message': 'Session active'}, 200
        else:
            return {'message': 'Session not active'}, 401





api.add_resource(HelloWorld, f"{BASE_URL}/hello_world")
api.add_resource(Register, f"{BASE_URL}/register")
api.add_resource(Login, f"{BASE_URL}/login")
api.add_resource(Logout, f"{BASE_URL}/logout")
api.add_resource(CheckSession, f"{BASE_URL}/check_session")




# ------------For development only -------------
class ResetUsers(Resource):
    def post(self):
        # Check if the request is made from a trusted source like localhost
        if request.remote_addr != '127.0.0.1':
            abort(403)  # Forbidden

        # Clear all user info
        User.query.delete()
        db.session.commit()

        return {'message': 'All user data has been cleared.'},   200

class ShowEnv(Resource):
    def get(self):
        env_vars = {key: value for key, value in os.environ.items() if key.startswith("PORT") or key.startswith("CORS_ORIGIN") or key.startswith("SQLALCHEMY_") or key.startswith("SECRET_KEY") or key.startswith("DB_USERNAME") or key.startswith("DB_PASSWORD") or key.startswith("FLASK_ENV")}
        return env_vars,  200

api.add_resource(ShowEnv, f"{BASE_URL}/show_env")
api.add_resource(ResetUsers, f"{BASE_URL}/reset_users")
# ------------For development only -------------




# Initialize Api with app
api.init_app(app)

if __name__ == '__main__':
    port = int(os.environ.get('PORT',  5000))
    app.run(host='0.0.0.0', port=port)
