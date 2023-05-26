from dotenv import load_dotenv
from pymongo import MongoClient
import os
import pandas as pd
from bson import ObjectId
from faker import Faker
from PIL import Image

folder_path = './img/' 
column_name = 'Profile_pic'
load_dotenv()
try:
    dbclient =  MongoClient(os.getenv("MONGODB_URI"), int(os.getenv("PORT")))
    db = dbclient[os.getenv("DB_NAME")]
    dbcollections = os.getenv("DB_User_Collection")
    #print("collection name:",dbcollections)
    dbcollections = db[dbcollections]
    #print("collection name:",dbcollections)
    #print list of the _id values of the inserted documents:
    dbclient.admin.command('ping')
    print('Connected to MongoDB', dbcollections)
    
except:
    print('Failed to connect to MongoDB')


def create_users():
    """
    read the users file:
    contains :
    name: str
    age: integer
    gender: str
    skills: str
    profile pic: image
    interests: str
    """ 
    user_data = pd.read_excel("users.xlsx", index_col=False)
    image_files = os.listdir(folder_path)
    image_files.sort()
    for index,data in user_data.iterrows():
        user_id = ObjectId()
        user_data.at[index,"user_id"] = str(user_id)
    
    user_data['Profile_Pic'] = [os.path.join(folder_path, img) for img in image_files]
    user_data = user_data.to_dict('records')
    insert_into_db(user_data)
    #print(user_data)

def insert_into_db(users_data):
    collection = dbcollections
    collection.insert_many(users_data)
    print(collection)

def main():

    create_users()

if __name__ == "__main__":
    main()