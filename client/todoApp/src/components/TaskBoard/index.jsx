import {Component} from "react"
import { v4 as uuidv4 } from 'uuid';
import Popup from 'reactjs-popup'
import { RxCross1 } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import ProjectItem from "../ProjectItem"
import TaskStatus from "../TaskStatus"


// todo status details, add more if necessary!!
const todoStatusItems = [
    {id: uuidv4(),name : "To Do",namedb:"todo", color: "text-blue-600",bgColor : "bg-blue-100"},
    {id: uuidv4(),name : "In Progress",namedb:"inprogress", color: "text-pink-400",bgColor : "bg-pink-100"},
    {id: uuidv4(),name : "In Review",namedb:"inreview", color: "text-blue-400",bgColor : "bg-blue-100"},
    {id: uuidv4(),name : "Completed",namedb:"completed", color: "text-green-400",bgColor : "bg-green-100"},
];


class TaskBoard extends Component {

    // state object that holds the initial values
    state = {projectsItems: [],projectSelected:'',todoTasksList:[],newProject: '',errProjectPara: false,currentProject:"",search:''}


    //Build in function that calls the below function as the page loads
    componentDidMount = () =>  this.projectItemsFunctionAPI()
    


    //function that triggers when a project is opted from the list
    onSuccessProjectSelectedTodos = (data,projectId)=>{
        if(data.length!==0) this.setState({todoTasksList: data,projectSelected: data[0].project_id});
        else this.setState({todoTasksList: data,projectSelected: projectId});
    }


    //function that get all todo tasks details from TODO table with a given projectId
    projectSelectedItemsAPI = async(projectId) =>{
       
        if(projectId!=='' && projectId!==undefined){
            const url = `https://alcovex-todotask-anitha.onrender.com/todo/${projectId}`
            const options = {
            method: 'GET'
            }
            const response = await fetch(url, options)
            const data = await response.json()
    
            if (response.ok) {

            this.onSuccessProjectSelectedTodos(data,projectId)
            } else {
            this.onFailureProjectSelectedTodos()
            }
        }
    }

    //function triggers when fetching projects details from table is successfull
    onSuccessGetProjectsItemsApi = (data) => {

        if(data!==undefined && data.length !== 0  ) {
            let projectNameforIndex0 =data[0].project_name
            this.projectSelectedItemsAPI(data[0].project_id)
            this.setState({projectsItems: data,projectSelected: data[0].project_id,currentProject: projectNameforIndex0})    
        }
        else this.setState({projectsItems:[],currentProject:''})
    }


    //function that gets all the project details from the PROJECTS table
    projectItemsFunctionAPI =async () =>{
        
        const url = "https://alcovex-todotask-anitha.onrender.com/projects"
        const options = {
          method: 'GET'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        
        if (response.ok)  this.onSuccessGetProjectsItemsApi(data)
        else this.onFailureGetProjectsItemsApi()
    }

    //function triggers when a new project opted
    newProjectChanged = (event)=> this.setState({newProject: event.target.value})
    

    //function that gives the opted project name
    projectClicked = (projectId) =>{

        const {projectsItems} = this.state
        let clickedProjectName=""

        projectsItems.map(each=>{
            if(each.project_id===projectId) clickedProjectName = each.project_name
        })
        this.setState({currentProject: clickedProjectName})
        this.projectSelectedItemsAPI(projectId)
    } 
    

    //function that give popup for adding new project
    reactPopUpNewProject = () => {
        const {errProjectPara,newProject} =this.state
        return(
          <Popup
            modal
            trigger={
              <button type="button" className="text-blue-400 p-2 pl-4 text-xs">
                + Add new Project
              </button>
            }>
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
                                }>Add</button>
                            </div>
                        </form>
                    </div>  
                </div>
            )}
          </Popup>
       )
    }

    //called when a project is added successfully and calls below function for immediate re-rendering
    onSubmitSuccessNewProject = ()=> this.projectItemsFunctionAPI()
    

    //function to add a new project into the table PROJECTS
    newProjectAddBtnClicked =async () =>{

        const {newProject} = this.state

        if(newProject!==''){
            const url = "https://alcovex-todotask-anitha.onrender.com/project-add"
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
            
            if (response.ok === true) this.onSubmitSuccessNewProject(data)
            else  this.onSubmitFailure(data.error_msg)
        } 
        else this.setState({errProjectPara: true})
    }

    searchBtnClicked = () =>{
        //to be implemented
    }

    
    searchChanged = (event) =>{
        this.setState({search : event.target.value})
    }

    //after deleting a project, below func re-renders
    projectDeletedRerender = ()=> this.projectItemsFunctionAPI()
    

    //after deleting a todo task, below func re-renders 
    deletedTodoTaskRerender=(projectId)=> this.projectSelectedItemsAPI(projectId)
    
  
    //after adding a new todo, below function re-renders
    newtodoAddedRerender = (projectId)=> this.projectSelectedItemsAPI(projectId)
    

    render(){
        const {projectsItems,todoTasksList,projectSelected,currentProject,search} = this.state
       
        return(
            <div className="grid  h-screen w-screen grid-cols-6 grid-flow-row gap-0.5 bg-slate-200  ">
                <div className="bg-gray-100  s col-span-1  flex justify-start items-center gap-x-2 pl-4 p-6">
                    <img src="./logo.png" alt="logo" className="h-6"/>
                    <h2 className="font-sans font-medium">Task boards</h2>
                </div>
                <div className="bg-gray-100 col-span-5 pl-8 flex items-center font-sans font-medium justify-around">
                    <h1>My Projects / {currentProject}</h1>
                <div className="flex bg-gray-300 rounded-md pr-3">
                    <input type="search" className=" border-2  text-sm p-2 rounded-md rounded-r-none" placeholder="Search" onChange={this.searchChanged} />
                    <button type="button" onClick={this.searchBtnClicked} className="p-0"><IoIosSearch className=" size-5 ml-1 mt-0 pt-0 " /></button>
                </div>
                </div>
                    <div className="bg-gray-100 col-span-1 row-span-12  ">
                        <ul className="grid gap-y-3 w-100 p-2 pl-4 pt-6 pb-6">
                            
                            {projectsItems.lenth===0 ? '' : projectsItems.map(each=>(
                             <ProjectItem key={each.project_id} details={each} projectClicked={this.projectClicked} 
                             applyStylingProject={projectSelected} projectDeletedRerender={this.projectDeletedRerender}
                             />))}
                        </ul>
                        <hr/>
                    <div>
                        {this.reactPopUpNewProject()}
                </div>
                </div>
                <ul className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 bg-gray-200 col-span-5 row-span-12 gap-x-0.5 overflow-x-auto">
                    {todoStatusItems.map(each=>(<TaskStatus key={each.id} details={each} todoTasks={todoTasksList} 
                    projectSelected={projectSelected} newtodoAddedRerender={this.newtodoAddedRerender} 
                    deletedTodoTaskRerender={this.deletedTodoTaskRerender} searchTodo={search}/>))}
                </ul>
            </div>
        )
    }

}

export default TaskBoard