"""starting over with migrations, removed all of models.py

Revision ID: 2176ae00ceb1
Revises: db61c7af5f21
Create Date: 2024-02-11 18:24:58.468669

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2176ae00ceb1'
down_revision: Union[str, None] = 'db61c7af5f21'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
