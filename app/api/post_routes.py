from flask import Blueprint, request, jsonify
from ..models.post import Post
from ..forms.post_form import PostForm
from ..forms.edit_form import EditForm
from ..models.db import db
from datetime import datetime
from flask_login import login_required, current_user

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def get_all_posts():
    posts = Post.query.all()

    return {"posts": [post.to_dict() for post in posts]}


@post_routes.route('/<id>')
@login_required
def postOne(id):
    post = Post.query.get(id)
    print("@@@@@@@@@@@@@@@@@")

    print(post)
    return {post.id: post.to_dict()}


@post_routes.route('/', methods=['POST'])
@login_required
def createPost():
    # print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    form = PostForm()
    user = current_user
    form['csrf_token'].data = request.cookies['csrf_token']

    print('before validate', form.data)
    if form.validate_on_submit():
        new_post = Post(
            user_id=user.id,
            caption=form.data['caption'],
            picture_url=form.data['picture_url'],
            timestamp=datetime.now()
        )
    else:
        return {'errors': [form.errors]}

    db.session.add(new_post)
    db.session.commit()
    print('inside validation p', new_post.to_dict())
    return {'posts': [new_post.to_dict()]}


@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def editPost(id):
    form = EditForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print('before validate', form.data)
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
    print("DELETE ROUTE ENTERED", id)
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return jsonify("DELETE SUCESSFUL")


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
