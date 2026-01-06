"use client"
import Form from "next/form"
import PdfViewer from "@/app/components/PdfViewerClient"
import { useState } from "react";
import  analyzeResume  from "@/app/analyzeResume";
export default function Home() {
    const [resumeFile, setResumeFile] = useState("");
    const [newResumeFile, setNewResumeFile] = useState("");
    function uploadFile(e:any){
        setResumeFile(e.target.files[0]);
    }
 
    async function rewriteResume(data: FormData){
        const buffer = await analyzeResume(data)
        const pdfBlob = new Blob([buffer], {type:"application/pdf"});
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setNewResumeFile(pdfUrl);
    }

    return (
    <div className="m-4 flex flex-col gap-18 h-screen md:flex-row">
        <div className="md:w-1/3 flex flex-col gap-4">
            <header className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                    <img src="logo.png" alt="logo" className="bg-green-500 p-2 rounded-md"/>
                    <h1 className="text-2xl font-bold">FitSignal</h1>
                </div>
                <p className="text-zinc-400 text-xs">Upload your resume and provide company details to get an AI-powered analysis that optimizes your resume for the specific role and company.</p>
            </header>
            <hr className="text-zinc-800"/>
            <main>
                <div className="">
                    <section className="h-1/2 md:h-full">
                        <Form action={rewriteResume} className="flex flex-col gap-4">
                            <section className="flex flex-col text-white">
                                <label htmlFor="upload-resume">Upload Resume
                                    <div className="bg-zinc-900 rounded-md flex flex-col items-center p-4 gap-2 cursor-pointer">
                                        {resumeFile ? (
                                            <>
                                                <img src="upload-completed-icon.png" alt="upload completed icon" className="w-8 bg-green-500 rounded-xs p-2"/> 
                                                <span className="text-zinc-100">{resumeFile.name}</span>
                                                <span className="text-zinc-400 text-xs">{resumeFile.size} bytes</span>
                                                <span className="text-green-500">File Uploaded Successfully</span>
                                            </>
                                            )
                                            : (
                                            <>
                                                <img src="upload-icon.png" alt="upload icon" className="w-8"/>
                                                <span className="text-zinc-100">Drop your resume here</span>
                                                <span className="text-zinc-400 text-xs">or click to browse files</span>
                                                <span className="text-zinc-400 text-xs">Supports PDF</span>
                                            </>
                                            )
                                        }
                                                    
                                    </div>
                                </label>
                                <input type="file" id="upload-resume" className="hidden" onChange={uploadFile} accept=".pdf" name="file" required/>
                            </section>
                            {newResumeFile && <PdfViewer url={URL.createObjectURL(resumeFile)}/>}
                            <section className="flex flex-col text-white">
                                <label htmlFor="company-url">Company URL*</label>
                                <input type="text" id="company-url" className="bg-zinc-900  rounded-md p-2" placeholder="https://company.com" name="company_blog_url" required/>
                            </section>

                            <section className="flex flex-col text-white">
                                <label htmlFor="job-posting-url">Job Posting URL*</label>
                                <input type="text" id="job-posting-url" className="bg-zinc-900 rounded-md p-2" placeholder="https://company.com/jobs/123" name="job_description_url" required/>
                            </section>
                            <button type="submit" className="bg-green-700 w-full rounded-xs p-2 cursor-pointer">Analyze Resume</button>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
        <div className="md:w-2/3">
            <section className="h-1/2 md:h-full">
                <div className="flex justify-between items-center gap-2 md:pb-4">
                    <h2 className="text-lg font-semibold md:text-xl">Analysis Results</h2>
                    <div className="flex gap-2">
                        <button className="bg-zinc-900 px-2 py-2 rounded-md cursor-pointer">Export PDF</button>
                        <button className="bg-green-700 px-2 py-2 rounded-md cursor-pointer">Copy Text</button>
                    </div>
                </div>
                <hr className="text-zinc-800 mt-6 mb-6"/>
                {newResumeFile ? <PdfViewer url={newResumeFile}/> :
                <div className="bg-zinc-900 h-98 flex items-center justify-center">
                    <span className="text-zinc-400 text-center">Upload your resume and provide company details to see AI analysis results here</span>
                </div>}
            </section>
        </div>
    </div>
    )
}
