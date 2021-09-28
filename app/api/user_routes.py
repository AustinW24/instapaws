from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User
from app.models.db import db



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

@user_routes.route('/<int:id>/followers')
@login_required
def followers(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/following')
@login_required
def following(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/follow')
@login_required
def track_follows(id):
    loggedUser = current_user
    otherUser = User.query.get(id)

    allUsersId = [user.id for user in loggedUser.follows]

    if otherUser.id in allUsersId:

        loggedUser.follows.remove(otherUser)
    else:

        loggedUser.follows.append(otherUser)

    db.session.commit()

    return {'loggedUser': loggedUser.to_dict(), 'otherUser': otherUser.to_dict()}
