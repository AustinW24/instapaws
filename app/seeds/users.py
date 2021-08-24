from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    user1 = User(
        username='hellojulio', email='hellojulio@aa.io', password='password')
    user2 = User(
        username='DogtorLoki', email='dogtorloki@aa.io', password='password')
    user3 = User(
        username='SawneeBella', email='sawneebella@aa.io', password='password')

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
