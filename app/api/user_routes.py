from flask import Blueprint
from flask_login import login_required
from app.models import User


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
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
def update(id):

    user = User.query.get(id)
    data = request.get_json()
    user.profile_picture = data['profile_picture']
    user.biography = data['biography']
    db.session.commit()

    return user.to_dict()


# @user_routes.route('/search', methods=['POST'])
# def userSearch():
#     data = request.get_json()
#     username = data['username']
#     print("INSIDE DATA FOR SEARCHHHH")
#     users = User.query.filter(User.username.ilike(f'%{username}%'))
#     print('USERSSSS!!!', [user.to_dict()['username'] for user in users])
