import Form from "next/form"
export default function Home() {
  return (
  <div className="m-4 flex flex-col gap-4 h-screen">
    <header className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
            <img src="logo.png" alt="logo" className="bg-green-500 p-2 rounded-md"/>
            <h1 className="text-2xl">FitSignal</h1>
        </div>
        <p className="text-zinc-400 text-xs">Upload your resume and provide company details to get an AI-powered analysis that optimizes your resume for the specific role and company.</p>
    </header>
    <hr className="text-zinc-800"/>
    <main className="flex flex-col gap-18">
        <div>
            <section className="h-1/2">
                <Form action="/" className="flex flex-col gap-4">
                    <section className="flex flex-col text-white">
                        <label htmlFor="upload-resume">Upload Resume
                            <div className="bg-zinc-900 rounded-md flex flex-col items-center p-4 gap-2 cursor-pointer">
                                <img src="upload-icon.png" alt="upload icon" className="w-8"/>
                                <span className="text-zinc-100">Drop your resume here</span>
                                <span className="text-zinc-400 text-xs">or click to browse files</span>
                                <span className="text-zinc-400 text-xs">Supports PDF</span>
                            </div>
                        </label>
                        <input type="file" id="upload-resume" className="hidden"/>
                        
                    </section>

                    <section className="flex flex-col text-white">
                        <label htmlFor="company-url">Company URL*</label>
                        <input type="text" id="company-url" className="bg-zinc-900  rounded-md p-2" placeholder="https://company.com"/>
                    </section>

                    <section className="flex flex-col text-white">
                        <label htmlFor="job-posting-url">Job Posting URL*</label>
                        <input type="text" id="job-posting-url" className="bg-zinc-900 rounded-md p-2" placeholder="https://company.com/jobs/123"/>
                    </section>
                    <button type="submit" className="bg-green-700 w-full rounded-xs p-2">Analyze Resume</button>
                </Form>
            </section>
        </div>
        <div>
            <section className="h-1/2">
                <div className="flex justify-between items-center">
                    <h2>Analysis Results</h2>
                    <div className="flex gap-2">
                        <button className="bg-zinc-900 px-4 py-2 rounded-md cursor-pointer">Export PDF</button>
                        <button className="bg-green-700 px-4 py-2 rounded-md cursor-pointer">Copy Text</button>
                    </div>
                </div>
                <hr className="text-zinc-800 mt-10 mb-6"/>
                <div className="bg-zinc-900 h-98 flex items-center justify-center">
                    <span className="text-zinc-400 text-center">Upload your resume and provide company details to see AI analysis results here</span>
                </div>
            </section>
        </div>
    </main>
  
  </div>)
}
