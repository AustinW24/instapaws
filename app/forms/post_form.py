from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

dr = [DataRequired()]

class PostForm(FlaskForm):
    caption = StringField('caption', dr)
    picture_url = StringField("picture_url", dr)
