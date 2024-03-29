from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from database import Base

class Users(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    age = Column(Integer)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    blood_group = Column(String, nullable=True)
    allergies = Column(String, nullable=True)
    family_doctor = Column(String, nullable=True)
    current_medications = Column(String, nullable=True)
    medical_history = Column(String, nullable=True)
    health_insurance = Column(String, nullable=True)
    medical_number = Column(String, nullable=True)
    emergency_contact = Column(String, nullable=True)

class Doctor(Base):
    __tablename__ = "doctors"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    speciality = Column(String)

class Hospitals(Base):
    __tablename__ = "hospitals"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    address = Column(String)
    contact = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    
    
class FamilyGroup(Base):
    __tablename__ = "family_group"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    admin = Column(Integer, ForeignKey("users.id"))
    
class FamilyMembers(Base):
    __tablename__ = "family_members"
    
    id = Column(Integer, primary_key=True, index=True)
    family_id = Column(Integer, ForeignKey("family_group.id"))
    member_id = Column(Integer, ForeignKey("users.id"))
    has_verified = Column(Boolean)