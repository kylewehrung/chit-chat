from flask import send_from_directory
from server import app  # Assuming your Flask app is named 'app'

@app.route('/')
def index():
    return send_from_directory('client/build', 'index.html')

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('client/build/static', path)
