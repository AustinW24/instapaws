from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

dr = [DataRequired()]

class CommentForm(FlaskForm):
    comments = StringField('comments', dr)
    post_id = IntegerField('post_id', dr)
    user_id = IntegerField('user_id', dr)
