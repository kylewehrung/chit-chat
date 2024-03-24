from logging.config import fileConfig
from sqlalchemy import engine_from_config
from sqlalchemy import pool
from alembic import context
import os
import sys

# Add the directory containing models.py to the Python path
models_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(models_directory)

import models as models

config = context.config

# Function to correct the database URL scheme
def correct_database_url(url):
    return url.replace('postgres://', 'postgresql://')

# Use the corrected DATABASE_URL for production
if os.getenv('FLASK_ENV') == 'production':
    database_url = correct_database_url(os.getenv("DATABASE_URL"))
    config.set_main_option("sqlalchemy.url", database_url)
else:
    # For development, use the local database URL
    config.set_main_option(
        "sqlalchemy.url",
        f"postgresql://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}@localhost/chit-chat-db"
    )

# Interpret the config file for Python logging.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = models.Base.metadata

def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
