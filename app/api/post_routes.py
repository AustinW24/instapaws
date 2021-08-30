from flask import Blueprint, request
from ..models.post import Post
from ..forms.post_form import PostForm
from ..forms.edit_form import EditForm
from ..models.db import db
# from app.forms import PostForm, CommentForm
from datetime import datetime
from flask_login import login_required, current_user

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def get_all_posts():
    posts = Post.query.all()

    return {"posts": {post.id: post.to_dict() for post in posts}}


# @post_routes.route('/all')
# def get_posts():
#     posts = Post.query.all()
#     print('THE POSTS--------------', posts)
#     return {post.id: post.to_dict() for post in posts}

@post_routes.route('/', methods=['GET', 'POST'])
@login_required
def createPost():
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

        db.session.add(new_post)
        db.session.commit()
        print('inside validation p', new_post.to_dict())
        return {'posts': [new_post.to_dict()]}
    return {'errors': [form.errors]}


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
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
