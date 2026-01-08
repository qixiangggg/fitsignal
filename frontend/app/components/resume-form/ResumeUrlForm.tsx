export default function ResumeUrlForm(props:any) {
    return(
        <section className="flex flex-col text-white">
            <label htmlFor={props.id}>{props.label} URL*</label>
            <input type="text" id={props.id} className="bg-zinc-900  rounded-md p-2" placeholder={props.placeholder} name={props.name} required/>
        </section>
    )
}