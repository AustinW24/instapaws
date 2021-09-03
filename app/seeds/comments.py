from app.models import db, Comment

# Adds a demo user, you can add other users here if you want
def seed_comments():
    one = Comment(
      comment = 'comment example',
      post_id = 1,
      user_id = 1,
    )

    two = Comment(
      comment = 'comment on first post again',
      post_id = 1,
      user_id = 2,
    )

    three = Comment(
      comment = 'comment on second post',
      post_id = 2,
      user_id = 1,
    )

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
