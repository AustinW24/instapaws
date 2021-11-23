from flask import Blueprint, request, jsonify
from ..models.post import Post
from ..forms.post_form import PostForm
from ..forms.edit_form import EditForm
from ..models.db import db
from datetime import datetime
from flask_login import login_required, current_user
from .aws_s3 import *

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def get_all_posts():
    posts = Post.query.all()

    return {"posts": [post.to_dict() for post in posts]}


@post_routes.route('/<id>')
@login_required
def postOne(id):
    post = Post.query.get(id)
    return {post.id: post.to_dict()}


@post_routes.route('/', methods=['POST'])
@login_required
def createPost():
    form = PostForm()
    user = current_user
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_post = Post(
            user_id=user.id,
            picture_url=form.data['image_url'],
            caption=form.data['caption'],
            timestamp=datetime.now()
        )

    else:
        return {'errors': [form.errors]}

    db.session.add(new_post)
    db.session.commit()

    return {'posts': [new_post.to_dict()]}






@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def editPost(id):
    form = EditForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post.query.filter(Post.id == id).first()
        data = form.data
        post.caption = data["caption"]
        db.session.commit()
        return post.to_dict()
    return {'errors': [form.errors]}


@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deletePost(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return jsonify("DELETE SUCCESSFUL")


@post_routes.route('/<int:id>/like', methods=['PUT'])
@login_required
def likePost(id):
    user = current_user
    post = Post.query.get(id)

    allUsersId = [user.id for user in post.postLikes]

    if user.id in allUsersId:
        post.postLikes.remove(user)
    else:
        post.postLikes.append(user)
    db.session.commit()
    return post.to_dict()
