from sqlalchemy import create_engine
import os

# Construct the database URI
db_uri = f"postgresql://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}@localhost/chit-chat-db"

try:
    # Create an engine
    engine = create_engine(db_uri)
    
    # Connect to the database
    with engine.connect() as connection:
        # Perform a simple query
        result = connection.execute("SELECT 1")
        print("Connection successful. Result:", result.fetchone()[0])  # Fetch the result of the query
except Exception as e:
    print("Error connecting to the database:", e)
