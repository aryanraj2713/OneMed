from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from pydantic import BaseModel
from starlette import status
from database import SessionLocal
from utils.chat import process_input_and_extract
import requests
import random
import os

# Chatbot API

# Path: server/utils/chat.py
# Compare this snippet from server/auth.py:

router = APIRouter(prefix="/chat", tags=["chat"])

class MedicalSummaryRequest(BaseModel):
    user_input: str

class MedicalSummaryResponse(BaseModel):
    medical_summary: str

class VoiceInput(BaseModel):
    audio_file: UploadFile = File(...)  
    

@router.post("/medicalsummary", response_model=MedicalSummaryResponse, status_code=status.HTTP_200_OK)
async def get_current_user(medical_summary_request: MedicalSummaryRequest):
    user_input = medical_summary_request.user_input
    medical_summary = process_input_and_extract(user_input)
    return {"medical_summary": medical_summary}

@router.post("/medicalvoicesummary", response_model=MedicalSummaryResponse, status_code=status.HTTP_200_OK)
async def get_medical_voice_summary(voice_input: UploadFile = File(...)):
    # Create a random name for file
    file_name = f"temp_audio_{random.randint(1, 100000)}.wav"
    with open(file_name, "wb") as buffer:
        buffer.write(voice_input.file.read())

    DEEPGRAM_API_KEY = os.getenv('DEEPGRAM_API_KEY') 
    with open(file_name, 'rb') as audio:
        headers = {'Authorization': f'Token {DEEPGRAM_API_KEY}'}
        response = requests.post('https://api.deepgram.com/v1/listen?punctuate=true',
                                 data=audio,
                                 headers=headers)
    os.remove(file_name)
    if response.status_code == 200:
        transcript = response.json()["results"]["channels"][0]["alternatives"][0]["transcript"]

        medical_summary = process_input_and_extract(transcript)
        return {"medical_summary": medical_summary}
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Deepgram transcription failed")


# I have been experiencing chest pain and shortness of breath lately. It started last week and has been getting worse. I also feel tired all the time and have a persistent cough. I'm concerned that it might be something serious.