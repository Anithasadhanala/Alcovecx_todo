import {Component} from "react"
import { v4 as uuidv4 } from 'uuid';
import Popup from 'reactjs-popup'
import { RxCross1 } from "react-icons/rx";
import ProjectItem from "../ProjectItem"
import TaskStatus from "../TaskStatus"


const todoStatusItems = [
    {id: uuidv4(),name : "To Do",namedb:"todo", color: "text-blue-600",bgColor : "bg-blue-100"},
    {id: uuidv4(),name : "In Progress",namedb:"inprogress", color: "text-pink-400",bgColor : "bg-pink-100"},
    {id: uuidv4(),name : "In Review",namedb:"inreview", color: "text-blue-400",bgColor : "bg-blue-100"},
    {id: uuidv4(),name : "Completed",namedb:"completed", color: "text-green-400",bgColor : "bg-green-100"},
];


class TaskBoard extends Component {

    state = {projectsItems: [],projectSelected:'',todoTasksList:[],newProject: '',errProjectPara: false}

    componentDidMount = () => {
        this.projectItemsFunctionAPI()
    }

    onSuccessProjectSelectedTodos = (data,projectId)=>{
        if(data.length!==0){
            this.setState({todoTasksList: data,projectSelected: data[0].project_id});
        }
        else{
            this.setState({todoTasksList: data,projectSelected: projectId});
        }
    }

    projectSelectedItemsAPI = async(projectId) =>{
       
        if(projectId!=='' && projectId!==undefined){
            const url = `http://localhost:3000/todo/${projectId}`
            const options = {
            method: 'GET'
            }
            const response = await fetch(url, options)
            const data = await response.json()
        
            if (response.ok) {

            this.onSuccessProjectSelectedTodos(data,projectId)
            } else {
            this.onFailureHomeApi()
            }
        }
    }

    onSuccessGetProjectsItemsApi = (data) => {
        if(data!==undefined && data.length !== 0  ) {
            this.projectSelectedItemsAPI(data[0].project_id)
            this.setState({projectsItems: data,projectSelected: data[0].project_id})    
        }
  }

    projectItemsFunctionAPI =async () =>{
        const url = "http://localhost:3000/projects"
        const options = {
          method: 'GET'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        
        if (response.ok)  this.onSuccessGetProjectsItemsApi(data)
         else this.onFailureGetProjectsItemsApi()
        
    }

    newProjectChanged = (event)=> this.setState({newProject: event.target.value})
    

    projectClicked = (projectId) => this.projectSelectedItemsAPI(projectId)
    

    reactPopUpNewProject = () => {
        const {errProjectPara,newProject} =this.state
        return(
          <Popup
            modal
            trigger={
              <button type="button" className="text-blue-400 p-2 pl-4 text-xs">
                + Add new Project
              </button>
            }
          >
            {close=>(
                <div className="bg-white h-66  grid grid-rows-2 pt-6 pb-6 w-96 rounded-lg shadow-2xl">
                   <div className="flex justify-between pl-4 pr-4 mb-4">
                        <h1>Add new Project</h1>
                        <RxCross1  onClick={() => close()} className="cursor-pointer" />
                    </div>
                    <hr className="bg-gray-400"/>
                    <div className="pb-10 pl-4 pr-4">
                        <form >
                            <div>
                                <label htmlFor="projectId" className="pb-4 font-large text-xs text-gray-600">Name of the Project</label>
                                <input type="text" id="projectId"  placeholder="Project" onChange={this.newProjectChanged} className="w-full p-2 mt-3 font-normal text-gray-500 text-xs border-2  border-gray-200 rounded-lg" required/>
                                {errProjectPara ? <p className="text-red-400 text-xs font-sans text-normal">Please Enter the Project!!</p>: ""}
                            </div>
                            <div className="flex justify-end mt-3">
                                <button type="button" className="text-blue-400 bg-blue-100 rounded-md p-1 pl-2 pr-2 mr-3 font-medium text-xs" onClick={() => close()}>Cancel </button>
                                <button type="button" className="text-white bg-blue-400 rounded-md p-1 pl-2 pr-2 font-medium text-xs" 
                                onClick={
                                    () =>{
                                        this.newProjectAddBtnClicked()
                                        if(newProject!=="") close()
                                    }
                                   
                                }
                                    >Add</button>
                            </div>
                        </form>
                    </div>  
                </div>
            )}
          </Popup>
       )
    }

    onSubmitSuccessNewProject = ()=> this.projectItemsFunctionAPI()
    



    newProjectAddBtnClicked =async () =>{

        const {newProject} = this.state

        if(newProject!==''){
            const url = "http://localhost:3000/project-add"

            const options = {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },

                body: `{
                    "projectName" : "${newProject}"
                }`,
            }
            const response = await fetch(url, options)
            const data = await response.json()

            if (response.ok === true) {
                this.onSubmitSuccessNewProject(data)
            } else {
                this.onSubmitFailure(data.error_msg)
            }
        } 
        else{
            this.setState({errProjectPara: true})
        }
    }
    

    newtodoAddedRerender = (projectId)=> this.projectSelectedItemsAPI(projectId)
    

    render(){
        const {projectsItems,todoTasksList,projectSelected} = this.state
     
        return(
            <div className="grid  h-screen w-screen grid-cols-6 grid-flow-row gap-0.5 bg-slate-200  ">
                <div className="bg-gray-100  s col-span-1  flex justify-start items-center gap-x-2 pl-4 p-6">
                    <img src="./../../../public/logo.png" alt="logo" className="h-6"/>
                    <h2 className="font-sans font-medium">Task boards</h2>
                </div>
                <div className="bg-gray-100 col-span-5 pl-8 flex items-center font-sans font-medium">My Projects</div>
                    <div className="bg-gray-100 col-span-1 row-span-12  ">
                        <ul className="grid gap-y-3 w-100 p-2 pl-4 pt-6 pb-6">
                            
                            {projectsItems.lenth===0 ? '' : projectsItems.map(each=>(
                             <ProjectItem key={each.project_id} details={each} projectClicked={this.projectClicked} applyStylingProject={projectSelected}/>))}
                        </ul>
                        <hr/>
                    <div>
                        {this.reactPopUpNewProject()}
                </div>
                </div>
                <ul className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 bg-gray-200 col-span-5 row-span-12 gap-x-0.5 overflow-x-auto">
                    {todoStatusItems.map(each=>(<TaskStatus key={each.id} details={each} todoTasks={todoTasksList} projectSelected={projectSelected} newtodoAddedRerender={this.newtodoAddedRerender} />))}
                </ul>
            </div>
        )
    }

}

export default TaskBoard