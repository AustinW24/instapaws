from datetime import datetime
from .db import db
from .user import User
from .like import likes
from .comment import Comment



class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.String, nullable=False)
    picture_url = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    timestamp = db.Column(db.DateTime, default=datetime.now)


    users = db.relationship("User", back_populates="posts", lazy="joined")
    comments = db.relationship("Comment", back_populates="posts", lazy="joined")
    postLikes = db.relationship("User", secondary=likes, back_populates="userLikes", lazy="joined")

    def to_dict(self):
        user = User.query.filter(User.id == self.user_id).first()

        return {
            "id": self.id,
            "caption": self.caption,
            'picture_url': self.picture_url,
            "user_id": self.user_id,
            "timestamp": self.timestamp,
            "user": user.to_dict(),
            "post_comments": [comment.to_dict() for comment in self.comments],
            "postLikes": [user.id for user in self.postLikes],
            "likes_count": len(self.postLikes),
            "comments_count": len(self.comments)
        }

    def to_dict_post_stats(self):
        return {
            "postLikes": self.postLikes,
            "likes_count": len(self.postLikes),
            "comments": self.comments,
            "comments_count": len(self.comments)
        }
