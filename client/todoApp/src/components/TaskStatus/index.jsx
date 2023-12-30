import Popup from 'reactjs-popup'
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import TodoItem from "../TodoItem"

const TaskStatus = (props) => {

    const [taskName,setterTaskName] = useState('')
    const [startTime,setterStartTime] = useState('')
    const [endTime,setterEndTime]= useState('')
    const [statusName,setterStatusName] = useState('inprogress')
    const [errEmptyData,setterErrorEmptyData] = useState(false)

    //destructing the props
    const {details,todoTasks,projectSelected,newtodoAddedRerender,deletedTodoTaskRerender} = props
    const {name,color,bgColor,namedb} = details

    //chaging styles according to props received
    const status = color +  " " +bgColor+" font-medium text-xs  w-4/12 rounded-lg p-1 "
    const addBtn = color+" "+ bgColor + " mt-4 rounded-lg text-medium text-xs p-1"
    
    let todoListFiltered = [];
    if(todoTasks.length!==0){
        for(let each=0;each<todoTasks.length;each++){
            if(todoTasks[each].task_status===namedb) todoListFiltered.push(todoTasks[each]);
        }
    }

    
    //after new todo addition, todo API in TaskBoard is called for re-rendering
    const onSubmitSuccessNewTaskTodo = () =>{
        alert("The new task is added")
        newtodoAddedRerender(projectSelected)
    }
    

    //after editing todo, below function re-renders
    const editedTodoRerender = ()=> newtodoAddedRerender(projectSelected)
    

    //after deleting a todo, todo API in TaskBoard is called for re-rendering
    const deletedTodoRerender = ()=> deletedTodoTaskRerender(projectSelected)
    
   
    //function that adds a new todo in TODO table
    const todoTaskAddClicked =async () =>{

        if(taskName!=='' && startTime!=='' && endTime!==''){
            const url = "https://alcovex-todotask-anitha.onrender.com/todo-add"
            const options = {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: `{
                    "taskName" : "${taskName}",
                    "startDate" : "${startTime}",
                    "endDate" : "${endTime}",
                    "taskStatus" : "${namedb}",
                    "projectId" : "${projectSelected}"
                }`,
            }
            const response = await fetch(url, options)
            const data = await response.json()
            
            if (response.ok) onSubmitSuccessNewTaskTodo()
            else onSubmitFailure(data.error_msg)
        }
        else setterErrorEmptyData(true)
    }


    //while task is changed, the data is updated here
    const taskNameChanged = (event) => setterTaskName(event.target.value);
    

    //while startTime is changed, the data is updated here
    const startTimeChanged =(event)=> setterStartTime(event.target.value);
    

    //while endTime is changed, the data is updated here
    const endTimeChanged = (event)=> setterEndTime(event.target.value)
    

    //while status is changed, the data is updated here
    const selectChanged = (event) => setterStatusName(event.target.value)
    

    //function that popsup the add new task form
    const reactPopUpNewTodoTask = () => {
        
        return(
          <Popup
            modal
            trigger={
              <button type="button" className={addBtn}>
                + Add new 
              </button>
            }
          >
            {close=>(
                <div className="bg-white h-66  grid grid-rows-2 pt-6 pb-6 w-96 rounded-lg shadow-2xl">
                   <div className="flex justify-between pl-4 pr-4 mb-4">
                        <h1 className="">Add new Task</h1>
                        <RxCross1  onClick={() => close()} className="cursor-pointer" />
                    </div>
                    <hr className="bg-gray-400"/>
                    <div className="pb-10 pl-4 pr-4">
                        <form >
                            <div>
                                <label htmlFor="taskId" className="pb-4 font-large text-xs text-gray-600">Name of the Task</label>
                                <input type="text" id="taskId" onChange={taskNameChanged} placeholder="Project" className="w-full p-2 mt-3 font-normal text-gray-500 text-xs border-2  border-gray-200 rounded-lg"/>
                            </div>
                            <div className="flex mt-3">
                                <div className="mr-3">
                                    <label htmlFor="startDateId" className="pb-2 font-large text-xs text-gray-600">Start date</label>
                                    <input type="Date" id="startDateId" onChange={startTimeChanged} placeholder="Date" className="w-full p-2 mt-3 font-normal text-gray-500 text-xs border-2  border-gray-200 rounded-lg"/>
                                </div>
                                <div>
                                    <label htmlFor="endDateId" className="pb-2 font-large text-xs text-gray-600">End Date</label>
                                    <input type="Date" id="endDateId" placeholder="Date" onChange={endTimeChanged} className="w-full p-2 mt-3 font-normal text-gray-500 text-xs border-2  border-gray-200 rounded-lg"/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="statusId" className="pb-2 font-large text-xs text-gray-600">Status</label>
                                <br/>
                                <select name="status" id="statusId" onChange={selectChanged} placeholder="To DO" className="w-80 p-2 pr-2 border-2  border-gray-200 rounded-lg">
                                    <option value={namedb} className="text-pink-400 font-medium text-xs" >&bull; {name}</option>
                             </select>
                                {errEmptyData ? <p className="text-red-400 text-xs font-sans text-normal">Please Enter all Todo Details!!</p> : "" }
                            </div>
                            <div className="flex justify-end mt-3">
                                <button type="button" className="text-blue-400 bg-blue-100 rounded-md p-2 pl-4 pr-4 mr-3 font-medium text-xs" onClick={() => close()}>Cancel </button>
                                <button type="button" onClick={()=>{
                                    todoTaskAddClicked()
                                    if(errEmptyData!==true) close()
                                   
                                }  
                                    } className="text-white bg-blue-400 rounded-md p-2 pl-4 pr-4 font-medium text-xs">Add</button>
                            </div>
                        </form>
                    </div>  
                </div>
            )}
          </Popup>
       )
    }

    return(
            <li className="flex flex-col bg-gray-100 p-5">
                <h1 className={status} >&bull; {name}</h1>
                <ul>
                {todoListFiltered.length!==0 ? (todoListFiltered.map(each=>(<TodoItem details={each} key={each.todo_id} 
                editedTodoRerender={editedTodoRerender} deletedTodoRerender={deletedTodoRerender}/>))) : ""}
                </ul>
                {reactPopUpNewTodoTask()}
                
            </li>
    )
}

export default TaskStatus