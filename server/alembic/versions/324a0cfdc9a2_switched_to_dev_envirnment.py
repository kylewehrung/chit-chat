"""switched to dev envirnment

Revision ID: 324a0cfdc9a2
Revises: 94ec4552ab98
Create Date: 2024-03-15 16:07:47.234391

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '324a0cfdc9a2'
down_revision: Union[str, None] = '94ec4552ab98'
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