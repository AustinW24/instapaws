from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import IntegerField
from wtforms.validators import DataRequired

dr = [DataRequired()]

class PostForm(FlaskForm):
    caption = StringField('caption', dr)
    user_id = IntegerField('User Id', dr)
    picture_url = StringField("Picture Url", dr)
