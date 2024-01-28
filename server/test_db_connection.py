from sqlalchemy import create_engine
import os

# Construct the database URI
db_uri = f"postgresql://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}@localhost/chit-chat-db"

try:
    # Create an engine
    engine = create_engine(db_uri)
    
    # Connect to the database
    with engine.connect() as connection:
        print("Connection successful.")
except Exception as e:
    print("Error connecting to the database:", e)
