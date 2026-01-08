"use client"
import { useState } from "react";
import ResumeForm from "@/app/components/resume-form/ResumeForm"
import AnalysisViewer from "@/app/components/AnalysisViewer"
export default function Home() {
    const [newResumeFile, setNewResumeFile] = useState("");
    return (
    <div className="m-4 flex flex-col gap-18 h-screen md:flex-row">
        <div className="md:w-1/2 flex flex-col gap-4">
            <header className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                    <img src="logo.png" alt="logo" className="bg-green-500 p-2 rounded-md"/>
                    <h1 className="text-2xl font-bold">FitSignal</h1>
                </div>
                <p className="text-zinc-400 text-xs">Upload your resume and provide company details to get an AI-powered analysis that optimizes your resume for the specific role and company.</p>
            </header>
            <hr className="text-zinc-800"/>
            <main>
                <div>
                    <section className="h-1/2 md:h-full">
                        <ResumeForm newResumeFile={newResumeFile} setNewResumeFile ={setNewResumeFile}/>
                    </section>
                </div>
            </main>
        </div>
        <div className="md:w-1/2">
            <section className="h-1/2 md:h-full">
                <AnalysisViewer newResumeFile={newResumeFile}/>
            </section>
        </div>
    </div>
    )
}
