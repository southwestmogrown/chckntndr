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
  friend_requests = db.session.query(friends).filter(current_user.id == friends.c.friend_id).all()
  pending_invites = []
  invite_requests = {}

  for req in friend_requests:
    if req[3] == 0:
      res = User.query.get(req[0])
      pending_invites.append(res)
      invite_requests[res.id] = res.to_dict()


  users = {
    user.id: user.to_dict() for user in users 
    if user not in current_user.user_friend_list 
    and user.id != current_user.id
    and user not in pending_invites
  }
         
  return { "users": users, "pendingInvites": invite_requests }

@friend_routes.route('/<int:id>/add', methods=["POST"])
@login_required
def add_friend(id):
  users = User.query.all()
  new_friend = [user for user in users if user.id == id][0]
  current_user.user_friend_list.append(new_friend)
  db.session.commit()
  
  friend_requests = db.session.query(friends).filter(current_user.id == friends.c.friend_id).all()
  pending_invites = []
  invite_requests = {}

  for req in friend_requests:
    if req[3] == 0:
      res = User.query.get(req[0])
      pending_invites.append(res)
      invite_requests[res.id] = res.to_dict()


  users = {
    user.id: user.to_dict() for user in users 
    if user not in current_user.user_friend_list 
    and user.id != current_user.id
    and user not in pending_invites
  }

  return {
    "user": current_user.to_dict(),
    "users": users,
    "pendingInvites": invite_requests
  }


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

  friend_requests = db.session.query(friends).filter(current_user.id == friends.c.friend_id).all()
  pending_invites = []
  invite_requests = {}

  for req in friend_requests:
    if req[3] == 0:
      res = User.query.get(req[0])
      pending_invites.append(res)
      invite_requests[res.id] = res.to_dict()


  users = {
    user.id: user.to_dict() for user in users 
    if user not in current_user.user_friend_list 
    and user.id != current_user.id
    and user not in pending_invites
  }

  return {
    "user": current_user.to_dict(),
    "users": users,
    "pendingInvites": invite_requests
  }


@friend_routes.route("/<int:id>/remove")
@login_required
def remove_friend(id):
  friend_to_remove = User.query.get(id)
  users = User.query.all()

  if friend_to_remove in current_user.user_friend_list:
    current_user.user_friend_list.remove(friend_to_remove)

  if current_user in friend_to_remove.user_friend_list:
    friend_to_remove.user_friend_list.remove(current_user)

  db.session.commit()

  friend_requests = db.session.query(friends).filter(current_user.id == friends.c.friend_id).all()
  pending_invites = []
  invite_requests = {}

  for req in friend_requests:
    if req[3] == 0:
      res = User.query.get(req[0])
      pending_invites.append(res)
      invite_requests[res.id] = res.to_dict()


  users = {
    user.id: user.to_dict() for user in users 
    if user not in current_user.user_friend_list 
    and user.id != current_user.id
    and user not in pending_invites
  }
  
  return {
    "user": current_user.to_dict(),
    "users": users,
    "pendingInvites": invite_requests
  }