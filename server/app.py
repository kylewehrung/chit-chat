from flask import Flask, request
from flask_restful import Api, Resource
from werkzeug.datastructures import ImmutableDict
from flask.globals import _request_ctx_stack

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
   def get(self):
       return 'hello world!'

api.add_resource(HelloWorld, "/hello_world")

@app.before_request
def before_request():
   ctx = _request_ctx_stack.top
   ctx.aws_context = ImmutableDict(request.environ['aws.context'])

def lambda_handler(event, context):
   return app(event, context)
