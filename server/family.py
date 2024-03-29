from datetime import timedelta, datetime
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette import status
from database import SessionLocal
from models import FamilyGroup, FamilyMembers, Users
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt

router = APIRouter(prefix="/family", tags=["family"])

class CreateFamilyRequest(BaseModel):
    name: str
    admin: int

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
db_dependency = Annotated[Session, Depends(get_db)]
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="/auth/token")

@router.post("/createfamily", status_code=status.HTTP_201_CREATED)
async def create_family_group(token: Annotated[str, Depends(oauth2_bearer)], db: db_dependency, create_family_request: CreateFamilyRequest):
    user = db.query(Users).filter(Users.id == create_family_request.admin).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    create_family_model = FamilyGroup(
        name=create_family_request.name,
        admin=create_family_request.admin,
    )
    db.add(create_family_model)
    db.commit()
    return create_family_model