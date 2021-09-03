"""empty message

Revision ID: a09837523ba8
Revises: a113c54f976b
Create Date: 2021-09-02 07:02:18.079283

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'a09837523ba8'
down_revision = 'a113c54f976b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comments', sa.Column('createdAt', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True))
    op.add_column('comments', sa.Column('updatedAt', sa.DateTime(timezone=True), nullable=True))
    op.drop_column('comments', 'timestamp')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comments', sa.Column('timestamp', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    op.drop_column('comments', 'updatedAt')
    op.drop_column('comments', 'createdAt')
    # ### end Alembic commands ###
