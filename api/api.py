
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from pymongo import MongoClient
import os
from bson.json_util import dumps
from bson.objectid import ObjectId
import json
import pandas as pd
#from urllib import request
from databaseModules import create_users
app = Flask(__name__)
count = 0
load_dotenv()
try:
    dbclient = MongoClient(os.getenv("MONGODB_URI"), int(os.getenv("PORT")))
    db = dbclient[os.getenv("DB_NAME")]
    dbcollections = os.getenv("DB_User_Collection")
    db_community_collection = os.getenv("DB_Community_Collection")
    #print list of the _id values of the inserted documents:
    dbclient.admin.command('ping')
    print('Connected to MongoDB')
    """
    called create_users to create a collection with users first time only:
    """
    #create_users()
    
except:
    print('Failed to connect to MongoDB')

"""
Api-endpoint to retrieve users from DB to Front-End UI
"""

@app.route("/get-users", methods=['GET'])
def get_users():
    print("dbcollections",dbcollections)
    userCollection = db[dbcollections]
    Usercommunity = db[db_community_collection]
    userRecords = list(userCollection.find({}, {'_id': 0}))
    #print(userRecords)
    final_data = []
    #print("Usercommunity:",Usercommunity)
    for user in userRecords:
        
        user_id = user["user_id"]
        existingUser = Usercommunity.find_one({"user_id":user_id})
        
        if not existingUser:
            final_data.append(user)
    #print("final_data:",final_data)
    #response = json.dumps(userRecords)
    #response.headers.add('Access-Control-Allow-Origin', '*')
    #for i in userRecords:
    #    print("userdata:",i)
    
    return{"userData":json.loads(dumps(final_data))}



@app.route("/add-user", methods=['POST'])
def add_users():
    print("add-users")
    userCollection = db[db_community_collection]
    user_data =request.get_json()
    global count
    print("userData",user_data)
    for a in user_data:
        users_id =a["user_id"]
        print(users_id)
        if userCollection.find_one({'user_id':users_id}):
            print("user-in-community")
            
        else:
            userCollection.insert_one(a)
            count =+ 1
    if(count > 0):
        return{'message':'success'}
    else:
        return{'message':'failed'}
    


@app.route("/community-users", methods=['GET'])
def community_users():
    print("dbcollections",db_community_collection)
    userCollection = db[db_community_collection]
    userRecords = list(userCollection.find({}, {'_id': 0}))
    #response = json.dumps(userRecords)
    #response.headers.add('Access-Control-Allow-Origin', '*')
    #for i in userRecords:
    #    print("userdata:",i)
    return{"userData":json.loads(dumps(userRecords))}

@app.route("/delete-users", methods=['POST'])
def delete_users():
    userCollection = db[db_community_collection]
    user_data =request.get_json()
    print("userData",user_data)
    for a in user_data:
        users_id =a["user_id"]
        userCollection.delete_one({'user_id': users_id})

    return{'message':'success'}
        