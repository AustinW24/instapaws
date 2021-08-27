from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    user1 = User(
        username='hamilton_this_hipster_cat', email='hamilton@aa.io', password='password', biography="Mustache Cat. Yes, it's real. San Francisco, CA. #AdoptDontShop", profile_picture='https://i.insider.com/5654a4c0c2814477008b51d8?width=750&format=jpeg&auto=webp')
    user2 = User(
        username='DogtorLoki', email='dogtorloki@aa.io', password='password', biography="A Baltimore Pup+MedStudent Mom, AMC Top Dog Honoree", profile_picture='https://photos.bringfido.com/posted/2020/08/04/849663/loki-1.jpg')
    user3 = User(
        username='SawneeBella', email='sawneebella@aa.io', password='password', biography="My names' Bella, I'm a Newfoundland who looks like a junkyard dog but I'm an absolute lady", profile_picture='https://img3.foodbevg.com/373/341/3797085453733415.jpg')
    user4 = User(
        username='demo', email='demo@aa.io', password='password', biography='I enjoy longer walks on the beach than my owner!', profile_picture='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/famous-dogs-aspen-1565290090.png')

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
