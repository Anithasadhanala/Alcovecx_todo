import { useState } from "react"

const  ProjectItem = (props) => {

   
    const {details,projectClicked,applyStylingProject} = props;
    const {project_name,project_id} = details

    let styling = "w-100 rounded-lg"

    if(applyStylingProject===project_id) styling = "w-100 bg-slate-200 rounded-lg"

    
    const projectSelectedCalled = () =>{
        projectClicked(project_id)
    }

    
        return(
            <li className={styling}>
                <button type="button" className="p-2 flex justify-start text-start w-100 font-sans font-normal" onClick={projectSelectedCalled}>{project_name}</button>
            </li>
        )
}


export default ProjectItem