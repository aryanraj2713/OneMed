from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from pydantic import BaseModel
from starlette import status
from database import SessionLocal
from utils.chat import process_input_and_extract
from models import Users, Doctor, Hospitals
import requests
import random
import os


router = APIRouter(prefix="/search", tags=["search"])

class SearchRequest(BaseModel):
    medical_number: str

# Returns a User object
class SearchResponse(BaseModel):
    user: dict
    
def get_user(medical_number):
    db = SessionLocal()
    user = db.query(Users).filter(Users.medical_number == medical_number).first()
    db.close()
    return user
    
@router.post("/search", response_model=SearchResponse, status_code=status.HTTP_200_OK)
async def search(search_request: SearchRequest):
    medical_number = search_request.medical_number
    user = get_user(medical_number)
    return {"user": user}