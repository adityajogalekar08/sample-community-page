
from flask import Flask,jsonify
from dotenv import load_dotenv
from pymongo import MongoClient
import os
from bson.json_util import dumps
import json
import pandas as pd
from databaseModules import create_users
app = Flask(__name__)
load_dotenv()
try:
    dbclient = MongoClient(os.getenv("MONGODB_URI"), int(os.getenv("PORT")))
    db = dbclient[os.getenv("DB_NAME")]
    dbcollections = os.getenv("DB_User_Collection")
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
    userRecords = userCollection.find({})
    #response = json.dumps(userRecords)
    #response.headers.add('Access-Control-Allow-Origin', '*')
    #for i in userRecords:
    #    print("userdata:",i)
    return{"userData":json.loads(dumps(userRecords))}



