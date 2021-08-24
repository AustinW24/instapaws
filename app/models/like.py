from .db import db
from sqlalchemy.orm import relationship


likes = db.Table(
    "likes",
    db.Column("userId", db.Integer, db.ForeignKey("users.id"), nullable=False),
    db.Column("postId", db.Integer, db.ForeignKey("posts.id"), nullable=False)
)
