from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .like import likes


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    biography = db.Column(db.String(255))
    profile_picture = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "biography": self.biography,
            "profile_picture": self.profile_picture
        }

    posts = db.relationship(
        'Post', back_populates="users")
    comments = db.relationship(
        'Comment', back_populates="users")
    userLikes = db.relationship(
        "Post", secondary=likes, back_populates="postLikes")
