from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Annotated
import models
from database import SessionLocal, engine
from sqlalchemy.orm import Session
import auth
import gemini
import ml
import search
from starlette import status
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(auth.router)
app.include_router(gemini.router)
app.include_router(ml.router)
app.include_router(search.router)
models.Base.metadata.create_all(bind=engine)


origins = ['http://localhost:5173' , 'http://127.0.0.1:5173']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserBase(BaseModel):
    name: str
    age: int
    email: str
    password: str
    
    
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(auth.get_current_user)]

@app.get('/user', status_code=status.HTTP_200_OK)
async def user(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    return user


