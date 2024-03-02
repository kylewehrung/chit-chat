import os

# Get the directory containing models.py
models_directory = os.path.dirname(os.path.abspath(__file__))

# Get the SQLAlchemy URL from the environment variable
database_url = os.environ.get('DATABASE_URL')

# Generate alembic.ini content
alembic_ini_content = f"""\
[alembic]
script_location = alembic
DATABASE_URL = {database_url}


# other basic configurations
[loggers]
keys = root,sqlalchemy,alembic

[handlers]
keys = console

[formatters]
keys = generic

[logger_root]
level = WARN
handlers = console
qualname =

[logger_sqlalchemy]
level = WARN
handlers =
qualname = sqlalchemy.engine

[logger_alembic]
level = DEBUG
handlers =
qualname = alembic

[handler_console]
class = StreamHandler
args = (sys.stderr,)
level = NOTSET
formatter = generic

[formatter_generic]
format = %(levelname)-5.5s [%(name)s] %(message)s
datefmt = %H:%M:%S
"""

# Write the content to alembic.ini file
with open('alembic.ini', 'w') as f:
    f.write(alembic_ini_content)
