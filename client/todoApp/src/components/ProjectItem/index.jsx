import {Component} from 'react'

class ProjectItem extends Component {

     styling =" w-100 rounded-lg"
    projectSelectedCalled = () =>{
        styling = "w-100 bg-slate-200 rounded-lg"
        projectClicked(project_id)
    }

    render(){
    
   
        const {details,projectClicked} = this.props;
        const {project_name,project_id} = details
    

        return(

            <li className={styling}>
                <button type="button" className="p-2 flex justify-start text-start w-100 font-sans font-normal" onClick={this.projectSelectedCalled}>{project_name}</button>
            </li>
        )
    }
}

export default ProjectItem