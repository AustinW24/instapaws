from flask import Blueprint, request
from ..models.comment import Comment
from ..forms.comment_form import CommentForm
from ..models.db import db
# from app.forms import PostForm, CommentForm


comment_routes = Blueprint('comments', __name__)


@comment_routes.route("/<int:id>", methods=["PUT"])
def commentPost(id):
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    print("INSIDE COMMENT ")
    if form.validate_on_submit():
        comment = Comment.query.filter(Comment.id == id).first()
        form.populate_obj(comment)
        db.session.add(comment)
        db.session.commit()
        return {"comments": [comment.to_dict()]}
    return {"errors": [form.errors]}
