from .db import db
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(255), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id") )
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    timestamp = db.Column(db.DateTime, default=datetime.now)

    users = db.relationship('User')
    post = db.relationship('Post')


def to_dict(self):
      return {
            "id": self.id,
            "comment": self.comment,
            "postId": self.postId,
            "userId": self.userId,
            "timestamp": self.timestamp
        }
