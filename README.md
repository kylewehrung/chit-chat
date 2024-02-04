# Project Setup Guide

## Introduction

In case anyone reads this, this guide is mainly for my reference during development.

## Frontend

### Starting the Frontend

In the root project directory, you can run:

```bash
npm install --prefix client
```

Next, you can change to the 'client' directory and run:

```bash
npm start
```

## Backend

### Installing Dependencies

From the chit-chat project directory run:

```bash
pip install -r requirements.txt
```

### Managing Dependencies

Check if dependencies are outdated:

```bash
pip list --outdated
```

Upgrade dependencies with:

```bash
pip install --upgrade package-name
```

Uninstall dependencies with:

```bash
pip uninstall package-name
```

### PostgreSQL Setup
Change to the server directory:
Check if the PostgreSQL server is online by running:

```bash
sudo service postgresql status
```

If it's offline, start the server with:

```bash
sudo service postgresql start
```

### Environment Variables

Set up/create environment variables:

```bash
export DB_USERNAME=username
export DB_PASSWORD=password
```

### Database Connection

Check PostgreSQL database connection:

```bash
python test_db_connection.py
```

### Running the Backend Server

Spin up the backend server in the 'server' directory with:

```bash
gunicorn -w 4 -b 0.0.0.0:5555 app:app
```

If it won't spin up, see if it's already running with:

```bash
pgrep gunicorn
```
or 
```bash
lsof -i :5555
```

Kill these PIDs with:

```bash
kill -9 PID PID PID
```

Then re-run the gunicorn command:

```bash
gunicorn -w 4 -b 0.0.0.0:5555 app:app
```


### Check heroku logs:

```
 heroku logs --tail --app chit-chat-backend
 ```



### Setting up awscli version 2 to be used over version 1:
```export PATH="/usr/local/bin:$HOME/Development/code/bag-talk/chit-chat:$PATH"
```