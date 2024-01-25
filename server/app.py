from flask import Flask
from flask_restful import Api, Resource
from config import app, api  

class HelloWorld(Resource):
   def get(self):
       return 'hello world!!!'

# Initialize Api with app
api.init_app(app)

api.add_resource(HelloWorld, "/hello_world")


if __name__ == '__main__':
    app.run(port=5555, debug=True)
