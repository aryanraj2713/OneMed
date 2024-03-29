import os
import numpy as np
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import PyPDF2
from transformers import pipeline
from typing import Optional
import json
from fastapi.middleware.cors import CORSMiddleware


import speech_recognition as sr
# from .auth_router import router 

from typing import Optional





app = FastAPI()

# app.include_router(router) 
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods="*",
    allow_headers=["*"],
)

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


@app.post("/extract-text/")
async def get_text_from_pdf(pdf_file: UploadFile = File(...)):
    text = extract_text_from_pdf(pdf_file)
    return JSONResponse(content={"text": text})


@app.post("/extract-ner/")
async def get_ner_from_text(text: str | None = None, pdf_file: UploadFile = None):
    print(text)
    if text is None and pdf_file is None:
        raise HTTPException(status_code=400, detail="Please provide text or a PDF file")
    if pdf_file:
        text = extract_text_from_pdf(pdf_file)
    result = extract_ner(text)
    return JSONResponse(content=result)

@app.post("/medical-summary/")
async def get_medical_summary(text: str):
    result = med_summary_pipe(text)
    return JSONResponse(content=result)

