import {Component} from "react"
import { v4 as uuidv4 } from 'uuid';
import ProjectItem from "../ProjectItem"
import TaskStatus from "../TaskStatus"



const todoStatusItems = [
    {id: uuidv4(),name : "To Do", color: "text-blue-600"},
    {id: uuidv4(),name : "In Progress", color: "text-pink-400"},
    {id: uuidv4(),name : "In Review", color: "text-blue-400"},
    {id: uuidv4(),name : "Completed", color: "text-green-400"}
];

const projectItems = [
    {id: uuidv4(),name: "Freelance Project"},
    {id: uuidv4(),name: "SBI Outsource"},
    {id: uuidv4(),name: "HPCL Project 1"}
]

class TaskBoard extends Component {

   
    

    render(){
       
        return(
            <div className="grid  h-screen w-screen grid-cols-6 grid-flow-row gap-0.5 bg-slate-200  ">
                <div className="bg-gray-100  s col-span-1  flex justify-start items-center gap-x-2 pl-4">
                    <img src="./../../../public/logo.png" alt="logo" className="h-6"/>
                    <h2 className="font-sans font-medium">Task boards</h2>
                </div>
                <div className="bg-gray-100 col-span-5 pl-8 flex items-center font-sans font-medium">My Projects</div>
                    <div className="bg-gray-100 col-span-1 row-span-12  ">
                        <ul className="grid gap-y-3 w-100 p-2 pl-4 pt-6 pb-6">
                            {projectItems.map(each=>(<ProjectItem key={each.id} details={each}/>))}
                        </ul>
                        <hr/>
                        <div>
                            <button type="button" className="text-blue-400 p-2 pl-4 text-xs" >+ Add new Project</button>
                        </div>
                    </div>
                <ul className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 bg-gray-200 col-span-5 row-span-12 gap-x-0.5">
                    {todoStatusItems.map(each=>(<TaskStatus key={each.id} details={each}/>))}
                </ul>
            </div>
        )
    }

}

export default TaskBoard