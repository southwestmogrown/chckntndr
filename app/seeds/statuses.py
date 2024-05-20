from app.models import db, Status, environment, SCHEMA
from sqlalchemy.sql import text


def seed_statuses():
  statuses = ["requested", "accepted", "rejected", "blocked"]

  create_statuses = [Status(status=status) for status in statuses]
  add_statuses = [db.session.add(status) for status in create_statuses]
  db.session.commit()

def undo_statuses():
  if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.statuses RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM statuses"))
      
  db.session.commit()