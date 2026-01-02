from fastapi import FastAPI, File, UploadFile
from PyPDF2 import PdfReader
from firecrawl import Firecrawl
from dotenv import load_dotenv
import os
app = FastAPI()

load_dotenv()
FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY")

firecrawl = Firecrawl(api_key=FIRECRAWL_API_KEY)
@app.get("/")
async def home():
    return {"message": "Fit Signal is alive!"}

@app.post("/analyze/")
async def analyze(file: UploadFile):
    pdfReader = PdfReader(file.file)
    for page in pdfReader.pages:
        print(page.extract_text())
    return {"file": file.filename}

@app.get("/scrape/")
async def scrape_url(url:str):
    doc = firecrawl.scrape(url, formats=["markdown","html"])
    print(doc)

    return {"url": url}