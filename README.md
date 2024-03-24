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

To kill all PID's in client directory run:

```bash
sudo lsof -ti:4000 | xargs sudo kill -9
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



Set up/create environment variables, largely for endpoints:

Set environment variables to development:

```bash
source set_env_vars.sh development
```

Set environment variables to production:

```bash
source set_env_vars.sh production
```



Set environment variables directly:

```bash
export DB_USERNAME=username
export DB_PASSWORD=password
export SQLALCHEMY_URL=postgresql://db-username:db-password@localhost/-db-name
```







### Database Connection

Check PostgreSQL database connection:

Change into the 'server directory' then

```bash
python test_db_connection.py
```

Test password hashing:

```bash
 python test_password_hashing.py
 ```


Generate Alembic.ini file to run migrations
Navigate to 'server' directory:

For local database migrations:
```bash
 python localdb_generate_alembic_ini.py
 ```

 For heroku database migrations:
```bash
 python heroku_generate_alembic_ini.py
 ```


 Run migrations:

 Locally:
```bash
alembic revision --autogenerate -m "Your migration message here"
```

```bash
alembic upgrade head
```

With Heroku:
```bash
heroku run alembic upgrade head --app chit-chat-backend
```

Check Heroku database:
```bash
heroku pg:psql --app chit-chat-backend
```

Note for Database Connection segment above: 
Make sure to remove/add generated alembic.ini file from .gitignore.
May also need to adjust imports to not be relative imports, removing '.' in front of
the imports from other files like models, config etc..







### Checking database list and roles:

Enter postgres shell:

    ```bash
    sudo -u postgres psql
    ```

Check database and roles:

    ```bash
    \du
    \l
    ```

Check users table:

    ```bash
    SELECT table_name FROM information_schema.tables WHERE table_name = 'users';
    ```

List tables:

    ```bash
    psql -U db-username -d db-name -h localhost -W
    ```

Enter password for db-username, then:

        ```bash
        \dt
        ```





### Running the Backend Server

Spin up the backend server in the 'chit-chat' directory with:

```bash
gunicorn -w 4 -b 0.0.0.0:5555 server.app:app
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
pkill -9 gunicorn
```

Then re-run the gunicorn command:

```bash
gunicorn -w 4 -b 0.0.0.0:5555 server.app:app
```







### Heroku commands:

Check heroku logs:

```bash
 heroku logs --tail --app chit-chat-backend
 ```

 Scale/run dyno:

 ```bash
 heroku ps:scale web=1 --app chit-chat-backend
 ```

Stop dyno

```bash
heroku ps:scale web=0 --app chit-chat-backend
```

Restart dyno:

```bash
heroku ps:restart --app chit-chat-backend
```






### Setting up awscli version 2 to be used over version 1:

```bash
export PATH="/usr/local/bin:$HOME/Development/code/bag-talk/chit-chat:$PATH"
```