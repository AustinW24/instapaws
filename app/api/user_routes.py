from flask import Blueprint
from flask_login import login_required
from app.models import User
from ..forms.profile_form import ProfileForm

user_routes = Blueprint('users', __name__)


# @login_required
@user_routes.route('/')
def users():
    users = User.query.all()
    return {"users": {user.id: user.to_dict() for user in users}}


@user_routes.route('/<int:id>')
@login_required
def user(id):

    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=['POST'])
@login_required
def createProfilePicture():
    # print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    form = ProfileForm()
    user = User.query.get(id)

    form['csrf_token'].data = request.cookies['csrf_token']

    print('before validate', form.data)
    if form.validate_on_submit():
        new_profile_pic = User(
            user_id=user.id,
            profile_picture=form.data['profile_picture'],

        )
    else:
        return {'errors': [form.errors]}

    db.session.add(new_profile_pic)
    db.session.commit()
    print('inside validation p', user.to_dict())
    return user.to_dict()
