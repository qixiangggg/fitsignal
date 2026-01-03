from fastapi import FastAPI, File, UploadFile, Form
from PyPDF2 import PdfReader
from firecrawl import Firecrawl
from dotenv import load_dotenv
from openai import OpenAI
import os

from pyexpat.errors import messages

app = FastAPI()

load_dotenv()
FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)

firecrawl = Firecrawl(api_key=FIRECRAWL_API_KEY)
@app.get("/")
async def home():
    return {"message": "Fit Signal is alive!"}

@app.post("/analyze/")
async def analyze(file: UploadFile = File(...), company_blog_url: str = Form(...), job_description_url: str = Form(...)):
    pdfReader = PdfReader(file.file)
    resume = ""
    company_blog = firecrawl.scrape(company_blog_url, formats=["markdown"])
    job_description = firecrawl.scrape(job_description_url, formats=["markdown"])

    for page in pdfReader.pages:
        resume += page.extract_text()
    system_prompt = "Act as a senior tech recruiter for a company. I will give you the job description you post and the blogs your company post that delimited by triple hashtag, Your goal is to rewrite the resume delimited by triple backtick to match the company desire candidates."
    resume = f"```{resume}```"
    company_info = f"###{company_blog.markdown + job_description.markdown}###"

    response = client.chat.completions.create(
        model="gpt-5-nano",
        messages=[{
            "role": "system",
            "content": system_prompt,
        }, {
            "role": "user",
            "content": resume + company_info,
        }],
    )
    return {"file": response.choices[0].message.content}