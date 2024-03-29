from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from starlette import status
from database import SessionLocal
from utils.chat import process_input_and_extract
from transformers import pipeline
from models import Users, DocumentSummary, VoiceSummary
from pydantic import BaseModel
from starlette import status
import PyPDF2
import requests
import random
import os


router = APIRouter(prefix="/ml", tags=["ml"])

ner_pipe = pipeline(
    "token-classification",
    model="Clinical-AI-Apollo/Medical-NER",
    aggregation_strategy="simple",
)


med_summary_pipe = pipeline(
    "summarization",
    model="Falconsai/medical_summarization",
    tokenizer="Falconsai/medical_summarization"
)


class PDFText(BaseModel):
    text: str


class NER(BaseModel):
    text: str | None = None

def extract_text_from_pdf(pdf_file: UploadFile = File(...)):
    text = ""
    filename = f"data/{pdf_file.filename}"

    os.makedirs("data", exist_ok=True)

    with open(filename, "wb") as file_object:
        file_object.write(pdf_file.file.read())
    with open(filename, "rb") as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page in pdf_reader.pages:
            text += page.extract_text() or ""
    return text.strip()


def extract_ner(text: str):
    output = ner_pipe(text)
    print(output)
    for item in output:
        for key, value in item.items():
            item[key] = str(value)
    # for item in output:
    #     for key, value in item.items():
    #         if isinstance(value, np.float32):
    #             item[key] = float(value.item())
    # print(output)
    return output

@router.post("/extract-text/")
async def get_text_from_pdf(pdf_file: UploadFile = File(...)):
    text = extract_text_from_pdf(pdf_file)
    return JSONResponse(content={"text": text})


@router.post("/extract-ner/")
async def get_ner_from_text(text: str | None = None, pdf_file: UploadFile = None):
    print(text)
    if text is None and pdf_file is None:
        raise HTTPException(status_code=400, detail="Please provide text or a PDF file")
    if pdf_file:
        text = extract_text_from_pdf(pdf_file)
    result = extract_ner(text)
    return JSONResponse(content=result)

@router.post("/medical-summary/")
async def get_medical_summary(text: str):
    result = med_summary_pipe(text)
    return JSONResponse(content=result)