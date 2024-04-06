from app import db, app

class User(db.Model):
    __tablename__ = 'user'
    extend_existing=True

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.Text)
    email = db.Column(db.Text)
    password = db.Column(db.Text)
    phonenumber = db.Column(db.Integer, nullable=True)
    # age = db.Column(db.Integer,  nullable=True )

    # avatar = db.Column(db.Text,  nullable=True ) #TODO
    # gender = db.Column(db.Text,  nullable=True ) #Male, Female TODO
    # profession = db.Column(db.Text,  nullable=True )
    # bio = db.Column(db.Text,  nullable=True )

    def __init__(self, username, email, password, phonenumber):
        self.username = username
        self.email = email 
        self.password = password
        self.phonenumber = phonenumber

    def __repr__(self):
        return f'User with {self.username} - {self.email}.'




# class Person(db.Model):
#     __tablename__ = 'people'

#     pid = db.Column(db.Integer, primary_key = True)
#     name = db.Column(db.Text)
#     email = db.Column(db.Text)
#     password = db.Column(db.Text) #TODO

#     def __init__(self, name, email, password):
#         self.name = name
#         self.email = email 
#         self.password = password

#     def __repr__(self):
#         return f'Person with {self.name} - {self.email} has age {self.age}.'
    



with app.app_context():
    db.drop_all()
    db.create_all()
