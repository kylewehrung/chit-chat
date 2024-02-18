#!/bin/bash

# Check if the argument is provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 <environment>"
    exit 1
fi

# Load environment variables from the specified .env file
if [ "$1" = "development" ]; then
    FILE=".env.development"
elif [ "$1" = "production" ]; then
    FILE=".env.production"
else
    echo "Invalid environment specified. Please specify either 'development' or 'production'."
    exit 1
fi

# Check if the .env file exists
if [ ! -f "$FILE" ]; then
    echo "$FILE does not exist."
    exit 1
fi

# Export variables from the .env file
export $(grep -v '^#' $FILE | xargs)
