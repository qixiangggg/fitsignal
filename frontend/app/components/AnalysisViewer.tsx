import PdfViewer from "@/app/components/pdf-viewer/PdfViewerClient"
export default function AnalysisViewer(props:any){
    return(
        <>
        <div className="flex justify-between items-center gap-2 md:pb-4">
            <h2 className="text-lg font-semibold md:text-xl">Analysis Results</h2>
            <div className="flex gap-2">
                <button className="bg-zinc-900 px-2 py-2 rounded-md cursor-pointer">Export PDF</button>
                <button className="bg-green-700 px-2 py-2 rounded-md cursor-pointer">Copy Text</button>
            </div>
        </div>
        <hr className="text-zinc-800 mt-6 mb-6"/>
        {props.newResumeFile ? <PdfViewer url={props.newResumeFile}/> :
        <div className="bg-zinc-900 h-98 flex items-center justify-center">
            <span className="text-zinc-400 text-center">Upload your resume and provide company details to see AI analysis results here</span>
        </div>}
        </>
    )
}