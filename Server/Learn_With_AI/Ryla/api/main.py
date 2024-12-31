from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn

from ..src.ryla import RylaAssistant

app = FastAPI(title="Ryla API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your React Native app's domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Ryla
ryla = RylaAssistant()

class ChatRequest(BaseModel):
    message: str
    proficiency_level: Optional[str] = "intermediate"

class ChatResponse(BaseModel):
    grammar_correction: str
    response: str
    audio_url: Optional[str] = None  # For future TTS implementation

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        # Set proficiency level if different from current
        if request.proficiency_level != ryla.current_proficiency:
            ryla.set_proficiency(request.proficiency_level)
        
        # Get grammar correction
        grammar_result = ryla.gram_model_correction(request.message)
        
        # Get conversation response
        conversation_response = ryla.convo_model_response(
            grammar_result if grammar_result != "Grammar correct" 
            else request.message
        )
        
        return ChatResponse(
            grammar_correction=grammar_result,
            response=conversation_response
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/proficiency-levels")
async def get_proficiency_levels():
    return list(ryla.model_configs.keys())

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 