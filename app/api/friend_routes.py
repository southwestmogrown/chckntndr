from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, db

friend_routes = Blueprint('friends', __name__)

@friend_routes.route('')
@login_required
def available_friends():
  """
  Query to get all users the current user is not already friends with
  """
  users = User.query.all()
  available_friends = {user.id: user.to_dict() for user in users if user not in current_user.user_friend_list and user.id != current_user.id}
  return available_friends

@friend_routes.route('/<int:id>/add', methods=["POST"])
@login_required
def add_friend(id):
  new_friend = User.query.get(id)
  users = User.query.all()
  current_user.user_friend_list.append(new_friend)
  # new_friend.user_friend_list.append(current_user)
  db.session.commit()
  return [user.to_dict() for user in users if user not in current_user.user_friend_list and user.id != current_user.id]

@friend_routes.route("/<int:id>/remove")
@login_required
def remove_friend(id):
  friend_to_remove = User.query.get(id)
  current_user.user_friend_list.remove(friend_to_remove)
  db.session.commit()
  return current_user.to_dict()