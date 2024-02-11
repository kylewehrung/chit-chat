from flask import Flask
from config import db, app
from models import User

# Create application context
with app.app_context():
    # Create a user
    username = "example_user"
    email = "user@example.com"
    password = "example_password"

    # Create a User object with the provided details
    user = User(username=username, email=email, password=password)

    # Add the user object to the database session
    db.session.add(user)

    # Commit the changes to the database
    db.session.commit()

    # Retrieve the user object from the database
    retrieved_user = User.query.filter_by(username=username).first()

    # Verify the password
    if retrieved_user:
        is_valid_password = retrieved_user.check_password(password)
        if is_valid_password:
            print("Password verification successful!")
        else:
            print("Incorrect password.")
    else:
        print("User not found.")

# Close the database session
db.session.close()
