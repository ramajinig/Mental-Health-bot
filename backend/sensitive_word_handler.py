# sensitive_word_handler.py
from typing import List
from datetime import datetime
from fastapi import HTTPException
from models import ChatRequest

# List of sensitive words
SENSITIVE_WORDS = ["die", "suicide", "kill", "end my life", "self-harm"]

# Dummy function to schedule a doctor
def schedule_doctor(user_id: str):
    # Placeholder for doctor scheduling logic
    # You could integrate an API for this or send an email notification to a medical team
    print(f"Doctor scheduled for user {user_id} at {datetime.now()}")
    return {"message": "Doctor scheduled", "user_id": user_id, "timestamp": datetime.now()}

# Function to detect sensitive words and take action
def check_for_sensitive_words(request: ChatRequest, user_id: str):
    if any(word in request.prompt.lower() for word in SENSITIVE_WORDS):
        # Call the doctor scheduling function
        return schedule_doctor(user_id)
    else:
        return {"message": "No sensitive content detected"}
