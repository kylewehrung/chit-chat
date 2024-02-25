#!/bin/bash

# Check if the argument is provided
if [ $# -ne  1 ]; then
    echo "Usage: $0 <environment>"
    exit  1
fi

# Load environment variables from the specified .env file
if [ "$1" = "development" ]; then
    FILE=".env.development"
elif [ "$1" = "production" ]; then
    FILE=".env.production"
else
    echo "Invalid environment specified. Please specify either 'development' or 'production'."
    exit  1
fi

# Check if the .env file exists
if [ ! -f "$FILE" ]; then
    echo "$FILE does not exist."
    exit  1
fi

# Export variables from the .env file
export $(grep -v '^#' $FILE | xargs)

# Set the Heroku app name
HEROKU_APP_NAME="chit-chat-backend"

# Loop through each line in the .env file and set the corresponding Heroku config var
while IFS= read -r line; do
    # Skip empty lines and comments
    if [[ ! $line =~ ^# && ! -z $line ]]; then
        # Extract the variable name and value
        var_name=$(echo $line | cut -d '=' -f  1)
        var_value=$(echo $line | cut -d '=' -f  2-)

        # Set the Heroku config var
        heroku config:set $var_name="$var_value" --app $HEROKU_APP_NAME
    fi
done < "$FILE"

# Restart the Heroku app to apply the changes
heroku restart --app $HEROKU_APP_NAME
