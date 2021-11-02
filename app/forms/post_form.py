from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

dr = [DataRequired()]

class PostForm(FlaskForm):
    caption = StringField('caption', dr)
    image_url = StringField("image_url", dr)
