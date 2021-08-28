from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import IntegerField
from wtforms.validators import DataRequired

dr = [DataRequired()]

class EditForm(FlaskForm):
    caption = StringField('caption')

    def updateCaption(self, newCaption):
        self.caption = newCaption
