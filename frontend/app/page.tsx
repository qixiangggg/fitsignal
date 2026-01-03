import Form from "next/form"
export default function Home() {
  return (
  <>
    <header>
        <img src="logo.png" alt="logo"/>
        <h1>FitSignal</h1>
        <p>Upload your resume and provide company details to get an AI-powered analysis that optimizes your resume for the specific role and company.</p>
    </header>
    <hr/>
    <main>
        <h2>Upload Resume</h2>
        <section>
            <Form action="/">
                <label htmlFor="upload-resume">Upload resume</label>
                <input type="file" id="upload-resume"/>

                <label htmlFor="company-url">Company URL*</label>
                <input type="text" id="company-url"/>

                <label htmlFor="job-posting-url">Job Posting URL*</label>
                <input type="text" id="job-posting-url"/>
                <button type="submit">Analyze Resume</button>
            </Form>
        </section>
        <section>
            <h2>Analysis Results</h2>
            <hr/>
        </section>
    </main>
  
  </>)
}
