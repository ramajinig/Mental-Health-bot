# bot.py
import openai
import os
from fastapi import HTTPException
from time import sleep
from models import ChatRequest  # Import the ChatRequest model

# Load environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")

# Restricted words for sensitive content
restricted_words = {"suicide", "die", "harm", "kill", "death", "end life"}

conversation_history = []

def process_chat(request: ChatRequest):
    if any(word in request.prompt.lower() for word in restricted_words):
        return {"response": "Please contact a doctor or a mental health professional for assistance."}

    user_message = {"role": "user", "content": request.prompt}
    conversation_history.append(user_message)

    refined_prompt = (
        "You are a mental health assistant helping users dealing with stress. "
        "When a user mentions stress, provide specific, empathetic advice based on the situation. "
        "Encourage small actions to relieve stress (like talking to someone, exercising, and managing time), "
        "and mention seeking professional help if necessary. Respond kindly, without any judgment, "
        "and avoid giving vague or generic answers. Here's the user's input: "
        "Don't say like 'I'm really sorry that you're feeling this way, but I'm unable to provide the help that you need.' Instead, ask why and suggest things."
        f"User's message: {request.prompt}"
    )

    attempts = 3
    for attempt in range(attempts):
        try:
            conversation_history.append({"role": "system", "content": refined_prompt})

            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=conversation_history,
                max_tokens=150
            )

            assistant_message = {"role": "assistant", "content": response.choices[0].message["content"].strip()}
            conversation_history.append(assistant_message)

            return {"response": assistant_message["content"]}
        except openai.error.OpenAIError as e:
            if attempt < attempts - 1:
                sleep(2)  # Wait before retrying
                continue
            else:
                raise HTTPException(status_code=500, detail=f"API error: {str(e)}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
