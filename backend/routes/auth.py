from fastapi import APIRouter
from models import User, UserSignIn
from auth import signup, signin  # Import the signup and signin functions from auth.py

auth_router = APIRouter()

@auth_router.post("/signup")
async def signup_route(user: User):
    return await signup(user)

@auth_router.post("/signin")
async def signin_route(user: UserSignIn):
    return await signin(user)
