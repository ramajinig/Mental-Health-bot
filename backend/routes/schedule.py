from fastapi import APIRouter
from models import Appointment
from db import create_appointment  # Import the function to handle DB insert

schedule_router = APIRouter()

@schedule_router.post("/schedule_appointment/")
async def schedule_appointment_route(appointment: Appointment):
    return await create_appointment(appointment)
