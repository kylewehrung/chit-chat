import os
from alembic.config import Config
from alembic import command

# Create a new Alembic configuration
alembic_config = Config()

# Set the database URL from the DATABASE_URL environment variable
alembic_config.set_main_option("sqlalchemy.url", os.getenv("DATABASE_URL"))

# Set the script location
alembic_config.set_main_option("script_location", "alembic")

# Run the migration
command.upgrade(alembic_config, "head")
