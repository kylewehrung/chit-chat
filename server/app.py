from flask import Flask
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)  

class HelloWorld(Resource):
    def get(self):
        return 'hello world!'
    
api.add_resource(HelloWorld, "/hello_world")

if __name__ == '__main__':
    app.run(port=5555, debug=False)
