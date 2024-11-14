from fastapi import APIRouter
from models import ChatRequest
from bot import process_chat
from sensitive_word_handler import check_for_sensitive_words

chat_router = APIRouter()

@chat_router.post("/chat/")
async def chat_route(request: ChatRequest, user_id: str):
    sensitive_check = check_for_sensitive_words(request, user_id)
    if "Doctor scheduled" in sensitive_check["message"]:
        return sensitive_check
    return process_chat(request)
