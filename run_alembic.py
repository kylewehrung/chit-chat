import os
from alembic.config import Config
from alembic import command

# Load the Alembic configuration
alembic_config = Config("alembic.ini")

# Set the database URL from the DATABASE_URL environment variable
alembic_config.set_main_option("sqlalchemy.url", os.getenv("DATABASE_URL"))

# Run the migration
command.upgrade(alembic_config, "head")
