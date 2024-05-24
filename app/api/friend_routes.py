from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, db, friends
from sqlalchemy import and_

friend_routes = Blueprint('friends', __name__)

@friend_routes.route('')
@login_required
def available_friends():
  """
  Query to get all users the current user is not already friends with
  """
  users = User.query.all()

  users = {
    user.id: user.to_dict() for user in users 
    if user not in current_user.user_friend_list 
    and user.id != current_user.id
  }
         
  return users

@friend_routes.route('/<int:id>/add', methods=["POST"])
@login_required
def add_friend(id):
  users = User.query.all()
  new_friend = [user for user in users if user.id == id][0]
  current_user.user_friend_list.append(new_friend)
  db.session.commit()
  return [user.to_dict() for user in users if user not in current_user.user_friend_list and user.id != current_user.id]

@friend_routes.route('/<int:id>/accept')
@login_required
def accept_friend_request(id):
  print(id)
  users = User.query.all()

  new_friend = [user for user in users if user.id == id][0]
  db.session.query(friends).filter(and_(current_user.id == friends.c.friend_id, id == friends.c.user_id)).update({ "approved": 1})
  current_user.user_friend_list.append(new_friend)
  db.session.commit()
  db.session.query(friends).filter(and_(current_user.id == friends.c.user_id, id == friends.c.friend_id)).update({ "approved": 1})
  db.session.commit()
  return current_user.to_dict()


@friend_routes.route("/<int:id>/remove")
@login_required
def remove_friend(id):
  friend_to_remove = User.query.get(id)
  print(id)
  current_user.user_friend_list.remove(friend_to_remove)
  friend_to_remove.user_friend_list.remove(current_user)
  db.session.commit()
  return current_user.to_dict()