"""add statuses table

Revision ID: 18c0e8d1bc33
Revises: ffdc0a98111c
Create Date: 2024-05-18 09:03:52.618711

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '18c0e8d1bc33'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('statuses',
    sa.Column('status_id', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(length=15), nullable=False),
    sa.PrimaryKeyConstraint('status_id'),
    sa.UniqueConstraint('status')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('statuses')
    # ### end Alembic commands ###