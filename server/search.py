from fastapi import APIRouter, Depends, HTTPException, Query  # Add Query for GET parameters
from pydantic import BaseModel
from starlette import status
from database import SessionLocal
from models import Users, Doctor, Hospitals
import requests
import random
import os


router = APIRouter(prefix="/search", tags=["search"])

class SearchRequest(BaseModel):
    medical_number: str

class UserResponse(BaseModel):
    id: int
    name: str
    age: int
    email: str
    blood_group: str = None  # Fields with default = None are optional
    allergies: str = None
    family_doctor: str = None
    current_medications: str = None
    medical_history: str = None
    health_insurance: str = None
    medical_number: str = None
    emergency_contact: str = None


def get_user(medical_number):
    db = SessionLocal()
    user = db.query(Users).filter(Users.medical_number == medical_number).first()
    db.close()
    return user
    
@router.get("/search", response_model=UserResponse, status_code=status.HTTP_200_OK)
async def search(medical_number: str = Query(...)):  # Query for GET parameter
    user = get_user(medical_number)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="User not found")
    return {
        "id": user.id,
        "name": user.name,
        "age": user.age,
        "email": user.email,
        "blood_group": user.blood_group,
        "allergies": user.allergies,
        "family_doctor": user.family_doctor,
        "current_medications": user.current_medications,
        "medical_history": user.medical_history,
        "health_insurance": user.health_insurance,
        "medical_number": user.medical_number,
        "emergency_contact": user.emergency_contact
    }
