from app.models import db, Post

def seed_posts():
    one = Post(
        caption = "akc german rottweiler ♥️swimming, smiling, and stealing socks, 11/30/16  AZ",
        picture_url = 'https://i.pinimg.com/originals/f9/cf/2d/f9cf2d702ff73eda61195bdd415817a3.jpg',
        user_id = 1,
    )
    two = Post(
        caption = "If dogs are good for your health, then two unicorns must be MAGICAL",
        picture_url = 'https://static.onecms.io/wp-content/uploads/sites/20/2021/01/05/dogtor-2.jpg',
        user_id = 2,
    )
    three = Post(
        caption = "Stopped by to see Big Bella today…love you Big Bella!",
        picture_url = 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.6435-9/s640x640/240419451_3936087533166539_4490642670559943048_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=a26aad&_nc_ohc=628kzlKBY04AX9NbVYt&_nc_ht=scontent-lax3-1.xx&oh=0e9383e98a38c1169a3c8d2463262337&oe=614CA5B4',
        user_id = 3,
    )

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts;')
    db.session.commit()
