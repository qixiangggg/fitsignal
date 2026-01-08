import { useState } from "react";

export default function ResumeUploadForm(props:any) {
    
    function uploadFile(e:any){
        props.setResumeFile(e.target.files[0]);
    }
    return (
        <>
        {
            <section className="flex flex-col text-white">
                    <label htmlFor="upload-resume">Upload Resume
                        <div className="bg-zinc-900 rounded-md flex flex-col items-center p-4 gap-2 cursor-pointer">
                            {props.resumeFile ? (
                                <>
                                    <img src="upload-completed-icon.png" alt="upload completed icon" className="w-8 bg-green-500 rounded-xs p-2"/> 
                                    <span className="text-zinc-100">{props.resumeFile.name}</span>
                                    <span className="text-zinc-400 text-xs">{props.resumeFile.size} bytes</span>
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
        }
        </>
    )
    
}