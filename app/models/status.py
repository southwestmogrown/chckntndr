from .db import db, environment, SCHEMA

class Status(db.Model):
  __tablename__ = "statuses"

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  status = db.Column(db.String(20), nullable=False, unique=True)