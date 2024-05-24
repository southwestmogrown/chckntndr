from sqlalchemy import or_
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .db import db, environment, SCHEMA, add_prefix_for_prod

friends = db.Table(
    "friends",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column("friend_id", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column("requested", db.Integer, nullable=False, default=1),
    db.Column("approved", db.Integer, nullable=False, default=0)
)

if environment == 'production':
    friends.schema = SCHEMA

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    user_friend_list = db.relationship(
        "User",
        secondary="friends",
        primaryjoin=friends.c.user_id == id,
        secondaryjoin=friends.c.friend_id == id,
        back_populates="friends_friend_list",

    )

    friends_friend_list = db.relationship(
        "User",
        secondary="friends",
        primaryjoin=friends.c.friend_id == id,
        secondaryjoin=friends.c.user_id == id,
        back_populates="user_friend_list"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self, from_self=False):
        friend_requests_query = db.session.query(friends).filter(or_(
            self.id == friends.c.user_id,
            self.id == friends.c.friend_id
        )).all()


        friend_requests = []
        
        for request in friend_requests_query:
            
            if request[0] == self.id:
                friend_requested = request[1]
                friend_inviting = self.id
                friend_requests.append({
                    "other_user": friend_requested,
                    "current_user": friend_inviting,
                    "approved": request[3]
                })

            if request[1] == self.id:
                friend_requested = self.id
                friend_inviting = request[0]

                friend_requests.append({
                    "current_user": friend_requested,
                    "inviting_user": friend_inviting,
                    "approved": request[3]
                })

        return {
            'id': self.id,
            'username': self.username,
            'requests': friend_requests,
            'friends': [friend.id if from_self else friend.to_dict(True) for friend in self.user_friend_list]
        }
    
    def add_friend(self, friend):
        if not friend in self.user_friend_list:
            self.user_friend_list.append(friend)
        return self.user_friend_list
    
    def remove_friend(self, friend):
        if friend in self.user_friend_list:
            self.user_friend_list.remove(friend)
        return self.user_friend_list
