# # main.py
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from models import User, ChatRequest, UserSignIn  # Import models
# from auth import signup, signin  # Import functions from auth.py
# from bot import process_chat  # Import the chatbot function from bot.py
# from dotenv import load_dotenv  # Import load_dotenv
# from sensitive_word_handler import check_for_sensitive_words

# load_dotenv()

# app = FastAPI()

# origins = [
#     "http://localhost:3000",
#     "http://127.0.0.1:3000"
# ]

# # Add CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.post("/signup")
# async def signup_route(user: User):
#     return await signup(user)

# @app.post("/signin")
# async def signin_route(user: UserSignIn):
#     return await signin(user)

# @app.post("/chat/")
# async def chat(request: ChatRequest, user_id: str):
#     # Check for sensitive words
#     sensitive_check = check_for_sensitive_words(request, user_id)
#     if "Doctor scheduled" in sensitive_check["message"]:
#         return sensitive_check

#     # Proceed with normal chat processing
#     return process_chat(request)

# @app.post("/schedule_appointment/")
# async def schedule_appointment(appointment: Appointment):
#     # Insert the appointment data into MongoDB
#     result = await appointments_collection.insert_one(appointment.dict())
#     if result.inserted_id:
#         return {"message": "Appointment scheduled successfully!"}
#     else:
#         raise HTTPException(status_code=500, detail="Could not schedule appointment")
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import auth_router
from routes.chat import chat_router
from routes.schedule import schedule_router

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as per your security requirements
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all the routes
app.include_router(auth_router, tags=["Auth"])
app.include_router(chat_router, tags=["Chat"])
app.include_router(schedule_router, tags=["Schedule"])
