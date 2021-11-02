from flask import Blueprint, request, jsonify
from ..models.post import Post
from ..forms.post_form import PostForm
from ..forms.edit_form import EditForm
from ..models.db import db
from datetime import datetime
from flask_login import login_required, current_user
from .aws_s3 import  (
    upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint("images", __name__)

@image_routes.route("/", methods=["POST"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 402

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)
    if "url" not in upload:

        return upload, 401

    url = upload["url"]

    return {"url": url}
