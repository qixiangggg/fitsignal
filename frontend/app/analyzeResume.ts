"use server"

export default async function analyzeResume(data: FormData) {
    console.log("analyzeResume called");
    const response = await fetch("http://127.0.0.1:8000/analyze/", {
        method: "POST",
        body: data,       
    });
    console.log(response);
    return;
}