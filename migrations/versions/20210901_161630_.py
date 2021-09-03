"""empty message

Revision ID: 33993853f4e9
Revises: 812e56118cb2
Create Date: 2021-09-01 16:16:30.363112

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '33993853f4e9'
down_revision = '812e56118cb2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('likes',
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('postId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['postId'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], )
    )
    op.add_column('comments', sa.Column('post_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'comments', 'posts', ['post_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'comments', type_='foreignkey')
    op.drop_column('comments', 'post_id')
    op.drop_table('likes')
    # ### end Alembic commands ###
