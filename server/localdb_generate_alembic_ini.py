import os

# Get the directory containing models.py
models_directory = os.path.dirname(os.path.abspath(__file__))

# Set the PYTHONPATH environment variable
os.environ['PYTHONPATH'] = models_directory

# Get the SQLAlchemy URL from the environment variable
sqlalchemy_url = os.environ.get('SQLALCHEMY_URL')

# Generate alembic.ini content
alembic_ini_content = f"""\
[alembic]
script_location = alembic
sqlalchemy.url = {sqlalchemy_url}
PYTHONPATH = {models_directory}

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
