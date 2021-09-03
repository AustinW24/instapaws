from .db import db
from datetime import datetime
from sqlalchemy.sql import func


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(255), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    createdAt = db.Column(db.DateTime(timezone=True),
                          server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    users = db.relationship('User', back_populates='comments')
    posts = db.relationship('Post', back_populates='comments')


def to_dict(self):
    return {
        "id": self.id,
        "user": self.users.username,
        "user_pic": self.users.profile_picture,
        "comment": self.comment,
        "post_id": self.post_id,
        "createdAt": self.createdAt,
        "updatedAt": self.updatedAt
    }


# def to_dict_ex_user(self):

#     return {
#         "id": self.id,
#         "user_id": self.users.id,
#         "user": self.users.username,
#         "user_pic": self.users.profile_picture,
#         "comment": self.comment,
#         "post_id": self.post_id,
#         "createdAt": self.createdAt,
#         "updatedAt": self.updatedAt,
#     }
