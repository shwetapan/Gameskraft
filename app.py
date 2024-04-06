import os
import awsgi
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS, cross_origin

from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)




DB_HOST = os.getenv("DB_HOST")
DB_PORT = int(os.getenv("DB_PORT"))
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_NAME = os.getenv("DB_NAME")

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://%s:%s@%s:%s/%s?charset=utf8mb4"%(DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME)
db = SQLAlchemy(app)


migrate = Migrate(app, db)




from flask import render_template, request, jsonify, Response

from user import User, Connection

import json



@app.route('/user', methods = ['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def createUser():
    print("API to create a user!")

    payload = request.json
    status_code, message = 200, {}

    person = User.query.filter(User.email == payload["email"])

    if person.count() > 0:
        message = {"message": "Existing user!"}
        status_code = 400
    else:

        person = User(payload["username"], payload["email"], payload["password"])
        db.session.add(person)
        db.session.commit()
        message = payload
        message["message"] = "User is created!"
        status_code = 201

    response = app.response_class(response=json.dumps(message),
                                status=status_code,
                                mimetype='application/json'
                                )


    return response



@app.route('/user/<email>', methods = ['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def getPerson(email):
    print("API to get person details!", email)

    status_code, message = 200, {}
    user = User.query.filter_by(email=email).first()
    if not user:
        message["message"] = "Person detail is not found!"
        status_code = 404
    else:
        message["name"] = user.username
        message["email"] = user.email

    response = app.response_class(response=json.dumps(message),
                                status=status_code,
                                mimetype='application/json')
    response = app.response_class(response=json.dumps(message),
                                status=status_code)

    return response



###########  Create User profile: ##############


@app.route('/profile/<email>', methods = ['PUT'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def updateProfile(email):
    print("API to update user profile!")

    payload = request.json
    status_code, message = 200, {}

    user = User.query.filter_by(email=email)

    if user.count() == 0:
        message = {"message": "User is not found!"}
        status_code = 400
    else:
        user = user.first()
        if payload.get("phonenumber", None) != None:
            user.phonenumber = payload["phonenumber"]
            print("Phone number is updated.")

        if payload.get("age", None) != None:
            user.age = payload["age"]

        if payload.get("gender", None) != None:
            user.gender = payload["gender"]

        if payload.get("profession", None) != None:
            user.profession = payload["profession"]

        if payload.get("bio", None) != None:
            user.bio = payload["bio"]

        if payload.get("address", None) != None:
            user.bio = payload["address"]

        if payload.get("address", None) != None:
            user.address = payload["address"]

        if payload.get("latitude", None) != None:
            user.latitude = payload["latitude"]
        
        if payload.get("longitude", None) != None:
            user.longitude = payload["longitude"]
        
        # db.session.add(user)
        db.session.commit()
        message = payload
        message["message"] = "User is updated!"

    response = app.response_class(response=json.dumps(message),
                                status=status_code,
                                mimetype='application/json'
                                )


    return response


@app.route('/profile/<email>', methods = ['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def getProfile(email):
    print("API to get an user profile ", email)

    status_code, response = 200, {}

    user = User.query.filter_by(email=email)
    if user.count() == 0:
        response = {"message": "User is not found!"}
        status_code = 400
    else:
        user = user.first()
        print(user)
        response["username"] = user.username
        response["email"] = user.email
        response["phonenumber"] = user.phonenumber 
        response["age"] = user.age
        response["gender"] = user.gender
        response["profession"] = user.profession
        response["bio"] = user.bio
        response["address"] = user.address

    response = app.response_class(response=json.dumps(response),
                                status=status_code,
                                mimetype='application/json')

    return response



###### CONNECTION #############

@app.route('/connection', methods = ['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def connection():
    print("API to add connection!")

    payload = request.json
    status_code, message = 200, {}

    
    user1 = User.query.filter(User.email == payload["user1"])
    if user1.count() == 0:
        message = {"message": "Invalid user "+ payload["user1"]}
        status_code = 400
    user2 = User.query.filter(User.email == payload["user2"])
    if user2.count() == 0:
        message = {"message": "Invalid user "+ payload["user2"]}
        status_code = 400
    if status_code == 200:
        connection = Connection.query.filter(Connection.user1 == user1.first().id, Connection.user2 == user2.first().id)# or (Connection.user2 == user1.first().id, Connection.user1 == user2.first().id))
        if connection.count() != 0:
            message["message"] = "Invalid!"
            status_code = 400
        else:
            connection = Connection(user1.first().id, user2.first().id, 1)
            db.session.add(connection)
            db.session.commit()

            message["message"] = "Connection is created!"
            status_code = 201


    response = app.response_class(response=json.dumps(message),
                                status=status_code,
                                mimetype='application/json'
                                )
    return response


@app.route('/connection', methods = ['PUT'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def updateConnection():
    print("API to update connection!")

    payload = request.json
    status_code, message = 200, {}

    
    user1 = User.query.filter(User.email == payload["user1"])
    if user1.count() == 0:
        message = {"message": "Invalid user "+ payload["user1"]}
        status_code = 400
    user2 = User.query.filter(User.email == payload["user2"])
    if user2.count() == 0:
        message = {"message": "Invalid user "+ payload["user2"]}
        status_code = 400
    if status_code == 200:
        connection = Connection.query.filter(Connection.user1 == user1.first().id, Connection.user2 == user2.first().id)# or (Connection.user2 == user1.first().id, Connection.user1 == user2.first().id))
        if connection.count() == 0:
            message["message"] = "Invalid!"
            status_code = 400
        else:
            connection = connection.first()
            connection.status = 2
            db.session.commit()

            message["message"] = "Connection is added!"
            status_code = 200


    response = app.response_class(response=json.dumps(message),
                                status=status_code,
                                mimetype='application/json'
                                )
    return response


@app.route('/connection', methods = ['DELETE'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def removeConnection():
    print("API to remove connection!")

    payload = request.json
    status_code, message = 200, {}

    
    user1 = User.query.filter(User.email == payload["user1"])
    if user1.count() == 0:
        message = {"message": "Invalid user "+ payload["user1"]}
        status_code = 400
    user2 = User.query.filter(User.email == payload["user2"])
    if user2.count() == 0:
        message = {"message": "Invalid user "+ payload["user2"]}
        status_code = 400
    if status_code == 200:
        connection = Connection.query.filter(Connection.user1 == user1.first().id, Connection.user2 == user2.first().id)# or (Connection.user2 == user1.first().id, Connection.user1 == user2.first().id))
        if connection.count() == 0:
            message["message"] = "Invalid!"
            status_code = 400
        else:
            connection = connection.delete()
            db.session.commit()
            message["message"] = "Connection is removed!"
            status_code = 200


    response = app.response_class(response=json.dumps(message),
                                status=status_code,
                                mimetype='application/json'
                                )
    return response



####### Block User #######

@app.route('/block/<email>', methods = ['PUT'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def blockuser(email):
    print("API to block an user profile!")

    status_code, message = 200, {}

    user = User.query.filter_by(email=email)

    if user.count() == 0:
        message = {"message": "User is not found!"}
        status_code = 400
    else:
        user = user.first()
        user.isdisabled = True
        db.session.commit()

        message["message"] = "User is blocked!"
        status_code = 200


    response = app.response_class(response=json.dumps(message),
                                status=status_code,
                                mimetype='application/json'
                                )
    return response


def lambda_handler(event, context):
    return awsgi.response(app, event, context, base64_content_types={"image/png"})
