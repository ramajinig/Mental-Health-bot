# auth.py
from fastapi import HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
import bcrypt
import os
from dotenv import load_dotenv
from models import User, UserInDB,UserSignIn  # Import models

load_dotenv()

# MongoDB setup
client = AsyncIOMotorClient(os.getenv('MONGODB_URI'))
db = client.mental_health_bot
users_collection = db.users

async def signup(user: User):
    # Check if email already exists
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash password before saving
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    user_in_db = UserInDB(**user.dict(), hashed_password=hashed_password.decode('utf-8'))

    # Save the user to the database
    await users_collection.insert_one(user_in_db.dict())
    return {"msg": "User created successfully!"}

async def signin(user: UserSignIn):
    # Find user by email
    existing_user = await users_collection.find_one({"email": user.email})
    if not existing_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # Verify password
    if not bcrypt.checkpw(user.password.encode('utf-8'), existing_user['hashed_password'].encode('utf-8')):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    return {"msg": "Login successful"}
