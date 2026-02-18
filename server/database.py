from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
DATABASE_NAME = os.getenv("DATABASE_NAME", "portfolio_db")

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]

projects_collection = db["projects"]
certificates_collection = db["certificates"]
contacts_collection = db["contacts"]
