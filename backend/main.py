from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
from firecrawl import Firecrawl
from dotenv import load_dotenv
from openai import OpenAI
import os
import markdown
from playwright.sync_api import sync_playwright
from fastapi.responses import FileResponse
from fastapi.concurrency import run_in_threadpool

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
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
    system_prompt = "Act as a senior tech recruiter for a company. I will give you the job description you post and the blogs your company post that delimited by triple hashtag, Your goal is to rewrite the resume delimited by triple backtick to match the company desire candidates. Please give the resume in markdown format so i can convert to html then convert to pdf."
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

    ai_response = response.choices[0].message.content
    html = markdown.markdown(ai_response)
    await run_in_threadpool(html_to_pdf,html,"result.pdf")
    return FileResponse("result.pdf", media_type="application/pdf", filename="analysis.pdf")

def html_to_pdf(html_content, output_path):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_content(html_content)
        page.pdf(path=output_path)
        browser.close()