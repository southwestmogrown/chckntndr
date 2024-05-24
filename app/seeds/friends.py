from app.models import db, User, friends, environment, SCHEMA
from sqlalchemy.sql import text
from flask import jsonify


def seed_friends():
  demo = User.query.get(1)
  marnie = User.query.get(2)
  bobbie = User.query.get(3)

  # demo.user_friend_list.append(marnie)
  # demo.user_friend_list.append(bobbie)
  # marnie.user_friend_list.append(demo)
  # bobbie.user_friend_list.append(demo)
  db.session.commit()


def undo_friends():
  if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM friends"))
      
  db.session.commit()