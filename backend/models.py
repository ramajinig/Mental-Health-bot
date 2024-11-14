from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    email: str
    password: str
    name: str
    role: str

class UserSignIn(BaseModel):
    email: str
    password: str

class UserInDB(User):
    hashed_password: str

class ChatRequest(BaseModel):
    prompt: str

class Appointment(BaseModel):
    user_email: str
    date: str  # ISO format date string
    time: str  # Time in HH:MM format
    reason: Optional[str] = None  # Optional field for additional information
