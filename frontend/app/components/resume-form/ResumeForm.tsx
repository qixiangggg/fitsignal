import Form from "next/form"
import { useState } from "react";
import  analyzeResume  from "@/app/service/analyzeResume";
import PdfViewer from "@/app/components/pdf-viewer/PdfViewerClient"

import ResumeUploadForm from "@/app/components/resume-form/ResumeUploadForm"
import ResumeUrlForm from "@/app/components/resume-form/ResumeUrlForm"
export default function ResumeForm(props:any) {
    const [resumeFile, setResumeFile] = useState(null);
    
    async function rewriteResume(data: FormData){
        const buffer = await analyzeResume(data)
        const pdfBlob = new Blob([buffer], {type:"application/pdf"});
        const pdfUrl = URL.createObjectURL(pdfBlob);
        props.setNewResumeFile(pdfUrl);
    }
    return(
        <>
        {
        props.newResumeFile ? (<PdfViewer url={URL.createObjectURL(resumeFile)}/>) 
        :
        <Form action={rewriteResume} className="flex flex-col gap-4">
            <ResumeUploadForm newResumeFile={props.newResumeFile} resumeFile={resumeFile} setResumeFile={setResumeFile}/>  
            
            <ResumeUrlForm id="company-url" label="Company" placeholder="https://company.com" name="company_blog_url"/>
            <ResumeUrlForm id="job-posting-url" label="Job Posting" placeholder="https://company.com/jobs/123" name="job_description_url"/>

            <button type="submit" className="bg-green-700 w-full rounded-xs p-2 cursor-pointer">Analyze Resume</button>
        </Form>
        }
        </>
    )
}