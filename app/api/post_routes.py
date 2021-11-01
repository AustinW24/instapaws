from flask import Blueprint, request, jsonify
from ..models.post import Post
from ..forms.post_form import PostForm
from ..forms.edit_form import EditForm
from app.config import Config
from ..models.db import db

from flask_login import login_required, current_user
# from .aws_s3 import public_file_upload, upload_file_to_s3
from .utils import validation_errors_to_error_messages
# from werkzeug.utils import secure_filename
import os


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
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_post = Post(
                picture_url = form.data['picture_url'],
                caption = form.data['caption']
            )

        # if "img_file" in request.files:

        #     img_file = request.files["img_file"]

        # if img_file:
        #     try:
        #         temp_file_name = "app/api/tmp" + \
        #             secure_filename(img_file.filename)
        #         img_file.save(temp_file_name)
        #         picture_url = public_file_upload(
        #             temp_file_name, "instapaw")
        #         os.remove(temp_file_name)
        #     except KeyError:
        #         pass

        #   return {'errors': [form.errors], '4444444444444444': '666666666666666'}
        db.session.add(new_post)
        db.session.commit(new_post)

        return {'posts': [new_post.to_dict()]}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



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
