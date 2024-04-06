from app import db, app

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.Text)
    email = db.Column(db.Text)
    password = db.Column(db.Text)
    phonenumber = db.Column(db.Integer)
    age = db.Column(db.Integer)

    avatar = db.Column(db.Text)
    gender = db.Column(db.Text) #Male, Female
    profession = db.Column(db.Text)
    bio = db.Column(db.Text)
    latitude =  db.Column(db.Float)
    longitude =  db.Column(db.Float)
    address =  db.Column(db.Text)
    isdisabled = db.Column(db.Boolean, default=False, nullable=False)


    def __init__(self, username, email, password):
        self.username = username
        self.email = email 
        self.password = password

    def __repr__(self):
        return f'User with {self.username} - {self.email}.'




class Connection(db.Model):
    __tablename__ = 'connection'

    cid = db.Column(db.Integer, primary_key = True)
    status = db.Column(db.Integer) #TODO: 1 - Pending, 2 - Connected
    user1  = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)
    user2  = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)

    def __init__(self, user1, user2, status =""):
        self.user1 = user1
        self.user2 = user2
        self.status = status

    def __repr__(self):
        return f'Connection object is created.'
    


with app.app_context():
    db.create_all()
