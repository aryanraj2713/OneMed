from datetime import timedelta, datetime
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette import status
from database import SessionLocal
from models import Users, Doctor, Hospitals
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
import random
import os

router = APIRouter(prefix="/auth", tags=["auth"])

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM")

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="/auth/login")


class CreateUserRequest(BaseModel):
    name: str
    age: int
    email: str
    password: str
    blood_group: str = None
    allergies: str = None
    family_doctor: str = None
    current_medications: str = None
    medical_history: str = None
    health_insurance: str = None
    emergency_contact: str = None
    address: str = None
    contact: str = None
    is_hospital: bool = False


class Token(BaseModel):
    access_token: str
    token_type: str
    name: str
    email: str
    medical_number: int = None


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, create_user_request: CreateUserRequest):
    if create_user_request.is_hospital:
        user = {
            "name": create_user_request.name,
            "email": create_user_request.email,
        }
        create_user_model = Hospitals(
            name=create_user_request.name,
            address=create_user_request.address,
            contact=create_user_request.contact,
            email=create_user_request.email,
            password=bcrypt_context.hash(create_user_request.password),
        )
    else:
        user = {
            "name": create_user_request.name,
            "email": create_user_request.email,
            "medical_number": random.randint(1000000, 9999999),
        }
        create_user_model = Users(
            name=create_user_request.name,
            age=create_user_request.age,
            email=create_user_request.email,
            password=bcrypt_context.hash(create_user_request.password),
            blood_group=create_user_request.blood_group,
            allergies=create_user_request.allergies,
            family_doctor=create_user_request.family_doctor,
            current_medications=create_user_request.current_medications,
            medical_history=create_user_request.medical_history,
            health_insurance=create_user_request.health_insurance,
            emergency_contact=create_user_request.emergency_contact,
            medical_number=user["medical_number"] if "medical_number" in user else None,
        )
    db.add(create_user_model)
    db.commit()
    return {
        "access_token": create_access_token(
            create_user_model.email, create_user_model.id, timedelta(minutes=60)
        ),
        "token_type": "bearer",
        "user": user,
    }


# Example json body for the above endpoint
# {
#     "name": "John Doe",
#     "age": 30,
#     "email": "johndoe@example.com",
#     "password": "password123",
#     "blood_group": "A+",
#     "allergies": "Pollen",
#     "family_doctor": "Dr. Smith",
#     "current_medications": "paracetamol, ibuprofen",
#     "medical_history": "Have liver operation in 2015, Diabetic since 2018",
#     "health_insurance": "ABC Insurance",
#     "emergency_contact": "Jane Doe"
# }


@router.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency
):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    token = create_access_token(user.email, user.id, timedelta(minutes=60))
    return {
        "access_token": token,
        "token_type": "bearer",
        "name": user.name,
        "email": user.email,
        "medical_number": user.medical_number if hasattr(user, "medical_number") else None,
    }


def authenticate_user(email: str, password: str, db):
    user = db.query(Users).filter(Users.email == email).first()
    if user is None:
        user = db.query(Hospitals).filter(Hospitals.email == email).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.password):
        return False
    return user


def create_access_token(email: str, user_id: int, expires_delta: timedelta):
    to_encode = {"email": email, "id": user_id}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(
    token: Annotated[str, Depends(oauth2_bearer)], db: db_dependency
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("email")
        id: int = payload.get("id")
        if email is None or id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
            )
    except JWTError as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )
    user = db.query(Users).filter(Users.email == email).first()
    if user is None:
        user = db.query(Hospitals).filter(Hospitals.email == email).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )
    return user