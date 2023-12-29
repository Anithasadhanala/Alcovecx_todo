import { RxCross1 } from "react-icons/rx";
const  ProjectItem = (props) => {
   
    const {details,projectClicked,applyStylingProject,projectDeletedRerender} = props;
    const {project_name,project_id} = details

    let styling = "w-100 rounded-lg flex justify-between"

    if(applyStylingProject===project_id) styling = "w-100 bg-slate-200 rounded-lg flex justify-between"

    const onSuccessProjectDeleted = () =>{
        console.log("TTTTTTTTTTTTTTTTTTTTT")
        projectDeletedRerender()
    }


    const deleteProjectBtnClicked = async() =>{
        const url = `http://localhost:3000/project-delete/${project_id}`
          
            const options = {
                method: 'DELETE',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },

            }
            const response = await fetch(url, options)
        
            if (response.ok) {
            onSuccessProjectDeleted()
            } else {
            onFailureHomeApi()
            }

    }

    


    
    const projectSelectedCalled = () =>{
        projectClicked(project_id)
    }

    
        return(
            <li className={styling}>
                <button type="button" className="p-2 flex justify-start text-start w-100 font-sans font-normal ml-2" onClick={projectSelectedCalled}>{project_name}</button>
                
                {applyStylingProject===project_id ?  <button type="button" onClick={deleteProjectBtnClicked}> <RxCross1 className="text-xs mr-6"/></button>: ""}
                
                
               
            </li>
        )
}


export default ProjectItem