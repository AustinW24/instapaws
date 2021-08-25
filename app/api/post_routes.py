from flask import Blueprint, request
from app.models import db, Post, Comment
from app.forms import PostForm, CommentForm
from flask_login import current_user, login_required
from datetime import datetime

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
@login_required
def all_posts():
    posts = Post.query.all()
    return { "posts": [post.to_dict() for post in posts] }

@post_routes.route('/', methods=['POST'])
def createPost():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print('before validate', form.data)
    if form.validate_on_submit():
        post = Post(
            comment = form.data['comment'],
            post_id = form.data['post_id'],
            user_id = form.data['user_id'],
            timestamp = datetime.now()
        )

        db.session.add(post)
        db.session.commit()
        print('inside validation p', post.to_dict())
        return {'posts': [post.to_dict()]}
    return {'errors': [form.errors]}
