# # # from pymongo import MongoClient
# # # import os

# # # # Database connection
# # # client = MongoClient(os.getenv("MONGO_URI"))
# # # db = client['MentalHealthBot']
# # # users_collection = db['users']
# # from pymongo import MongoClient
# # import os
# # from models import Appointment, User

# # # Database connection
# # client = MongoClient(os.getenv("MONGO_URI"))
# # db = client['MentalHealthBot']

# # # Collections
# # users_collection = db['users']           # Users collection
# # appointments_collection = db['appointments']  # Appointments collection

# # # Function to create a user (if needed)
# # async def create_user(user: User):
# #     # Insert the user into the users collection
# #     result = await users_collection.insert_one(user.dict())
# #     if result.inserted_id:
# #         return {"message": "User created successfully!"}
# #     else:
# #         raise Exception("Could not create user")

# # # Function to create an appointment
# # async def create_appointment(appointment: Appointment):
# #     result = await appointments_collection.insert_one(appointment.dict())
# #     if result.inserted_id:
# #         return {"message": "Appointment scheduled successfully!"}
# #     else:
# #         raise Exception("Could not schedule appointment")
# import motor.motor_asyncio
# import os
# from models import Appointment, User

# # Database connection
# client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGO_URI"))
# db = client['MentalHealthBot']

# # Collections
# users_collection = db['users']
# appointments_collection = db['appointments']

# # Function to create a user (if needed)
# async def create_user(user: User):
#     # Insert the user into the users collection
#     result = await users_collection.insert_one(user.dict())
#     if result.inserted_id:
#         return {"message": "User created successfully!"}
#     else:
#         raise Exception("Could not create user")

# # Function to create an appointment
# async def create_appointment(appointment: Appointment):
#     # Insert the appointment into the appointments collection
#     result = await appointments_collection.insert_one(appointment.dict())
#     if result.inserted_id:
#         return {"message": "Appointment scheduled successfully!"}
#     else:
#         raise Exception("Could not schedule appointment")

import motor.motor_asyncio
import os
from models import Appointment

# Database connection
client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGO_URI"))
db = client['MentalHealthBot']
appointments_collection = db['appointments']

# Function to create an appointment
async def create_appointment(appointment: Appointment):
    # Print out the appointment data before inserting it
    print("Creating appointment with data:", appointment.dict())
    
    # Try to insert the appointment into the appointments collection
    try:
        result = await appointments_collection.insert_one(appointment.dict())
        print("Appointment inserted with ID:", result.inserted_id)
        
        if result.inserted_id:
            return {"message": "Appointment scheduled successfully!", "appointment_id": result.inserted_id}
        else:
            raise Exception("Could not schedule appointment")
    
    except Exception as e:
        print("Error during appointment creation:", str(e))
        raise Exception(f"Error: {str(e)}")
