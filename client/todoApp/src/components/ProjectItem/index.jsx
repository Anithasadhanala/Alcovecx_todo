
const ProjectItem = (props) => {
   
    const {details,projectClicked} = props;
    const {project_name,project_id} = details

    const projectClickedFunctionCalled = () =>{
        projectClicked(project_id)
    }

    return(

        <li className="w-100 bg-slate-200  rounded-lg">
            <button type="button" className="p-2 flex justify-start text-start w-100 font-sans font-normal" onClick={projectClickedFunctionCalled}>{project_name}</button>
        </li>
    )
}

export default ProjectItem