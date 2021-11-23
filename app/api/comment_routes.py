from flask import Blueprint, request
from ..models.comment import Comment
from ..forms.comment_form import CommentForm
from ..models.db import db
from flask_login import login_required
# from app.forms import PostForm, CommentForm


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<id>', methods=['POST'])
@login_required
def createComment(id):

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        new_comment = Comment(
            comment=form.data['comments'],
            user_id=form.data['user_id'],
            post_id=form.data['post_id']

        )
    else:
        return {'errors': [form.errors]}

    db.session.add(new_comment)
    db.session.commit()

    return {'comments': [new_comment.to_dict()]}

@comment_routes.route('/<id>', methods=['DELETE'])
@login_required
def deleteComment(id):
    comment = Comment.query.filter(Comment.id == id).first()
    db.session.delete(comment)
    db.session.commit()
    return {'comments': id}





    # @comment_routes("")
