import Popup from 'reactjs-popup'
import { RxCross1 } from "react-icons/rx";
import TodoItem from "../TodoItem"

const TaskStatus = (props) => {

    const {details,todoTasks} = props
    const {name,color,bgColor,namedb} = details
    
    let todoListFiltered = [];
    if(todoTasks.length!==0){
        for(let each=0;each<todoTasks.length;each++){
            if(todoTasks[each].task_status===namedb) todoListFiltered.push(todoTasks[each]);
        }
    }


    const status = color +  " " +bgColor+" font-medium text-xs  w-4/12 rounded-lg p-1 "
    const addBtn = color+" "+ bgColor + " mt-4 rounded-lg text-medium text-xs p-1"


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
                                <input type="text" id="taskId" placeholder="Project" className="w-full p-2 mt-3 font-normal text-gray-500 text-xs border-2  border-gray-200 rounded-lg"/>
                            </div>
                            <div className="flex mt-3">
                                <div className="mr-3">
                                    <label htmlFor="startDateId" className="pb-2 font-large text-xs text-gray-600">Start date</label>
                                    <input type="Date" id="startDateId" placeholder="Date" className="w-full p-2 mt-3 font-normal text-gray-500 text-xs border-2  border-gray-200 rounded-lg"/>
                                </div>
                                <div>
                                    <label htmlFor="endDateId" className="pb-2 font-large text-xs text-gray-600">End Date</label>
                                    <input type="Date" id="endDateId" placeholder="Date" className="w-full p-2 mt-3 font-normal text-gray-500 text-xs border-2  border-gray-200 rounded-lg"/>
                                </div>
                            </div>
                            <div>
                                    <label htmlFor="statusId" className="pb-2 font-large text-xs text-gray-600">Status</label>
                                    <br/>
                                    <select name="cars" id="statusId" placeholder="To DO" className="w-80 p-2 pr-2 border-2  border-gray-200 rounded-lg">

                                        <option value="volvo" className="text-pink-400 font-medium text-xs ">&bull; In Progress</option>
                                        <option value="saab"  className="text-blue-400 font-medium text-xs">&bull; In Review</option>
                                        <option value="mercedes"  className="text-green-400 font-medium text-xs">&bull; Completed</option>
                                      
                                        </select>
                                     </div>
                            <div className="flex justify-end mt-3">
                                <button type="button" className="text-blue-400 bg-blue-100 rounded-md p-2 pl-4 pr-4 mr-3 font-medium text-xs" onClick={() => close()}>Cancel </button>
                                <button type="button" className="text-white bg-blue-400 rounded-md p-2 pl-4 pr-4 font-medium text-xs">Add</button>
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
                {todoListFiltered.length!==0 ? (todoListFiltered.map(each=>(<TodoItem details={each} key={each.todo_id}/>))) : ""}
                </ul>
                {reactPopUpNewTodoTask()}
            </li>

    )
}

export default TaskStatus