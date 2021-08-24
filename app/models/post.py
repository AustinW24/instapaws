from datetime import datetime
from .db import db
from .user import User
from .like import likes



class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.String, nullable=False)
    picture_url = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    timestamp = db.Column(db.DateTime, default=datetime.now)

    users = db.relationship("User")
    postlikes = db.relationship("User", secondary=likes)
    comments = db.relationship("Comment", backref="posts", cascade='delete')

    def to_dict(self):
        user = User.query.filter(User.id == self.user_id).first()

        return {
            'id': self.id,
            'caption': self.caption,
            'picture_url': self.picture_url,
            "user_id": self.user_id,
            "timestamp": self.timestamp,
            "user": user.to_dict(),
            "post_likes": [user.id for user in self.postlikes],
            "post_comments": self.comments,
            "likes_count": len(self.post_likes),
            "comments_count": len(self.comments)
        }

    def to_dict_post_stats(self):
        return {
            "post_likes": self.postlikes,
            "likes_count": len(self.postlikes),
            "comments": self.comments,
            "comments_count": len(self.comments)
        }
