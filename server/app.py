from flask import Flask, request, jsonify, session
from flask_restful import Api, Resource
from config import app, api, db
from models import User
from flask_cors import CORS


CORS(app)


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
            return {'message': 'Missing parameters'}, 400

        if User.query.filter_by(username=username).first():
            return {'message': 'Username already exists'}, 409

        if User.query.filter_by(email=email).first():
            return {'message': 'Email already exists'}, 409

        new_user = User(username=username, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()

        return {'message': 'User created successfully'}, 201


class Login(Resource):
    def post(self):
        data = request.json
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return {'message': 'Missing username or password'}, 400

        user = User.query.filter_by(username=username).first()
        if not user or not user.check_password(password):
            return {'message': 'Invalid username or password'}, 401

        session['logged_in'] = True
        return {'message': 'Logged in successfully'}, 200


class CheckSession(Resource):
    def get(self):
        if session.get('logged_in'):
            return {'message': 'Session active'}, 200
        else:
            return {'message': 'Session not active'}, 401




api.add_resource(HelloWorld, "/hello_world")
api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session')




# Initialize Api with app
api.init_app(app)

if __name__ == '__main__':
    app.run(port=5555, debug=True)
