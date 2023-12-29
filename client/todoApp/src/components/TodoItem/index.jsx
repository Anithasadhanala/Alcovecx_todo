import Popup from 'reactjs-popup'
import { RxCross1 } from "react-icons/rx";
import { useState } from "react"

const TodoItem = (props) => {



    
    const taskNameChanged = (event) => setterTaskName(event.target.value);
    

    const startTimeChanged =(event)=> setterStartTime(event.target.value);
    

    const endTimeChanged = (event)=> setterEndTime(event.target.value)
    

    const selectChanged = (event) => setterStatusName(event.target.value)
    

    const {details}= props 
    const {task_name,start_time,end_time,task_status} = details

    
    const [taskName,setterTaskName] = useState(task_name)
    const [startTime,setterStartTime] = useState(start_time)
    const [endTime,setterEndTime]= useState(end_time)
    const [statusName,setterStatusName] = useState(task_status)


    const startDate = start_time.slice(0,10)
    const endDate = end_time.slice(0,10)

    let dateStyling = "rounded-md p-1 pl-2 pr-2 mr-3 font-medium text-xs"


 
    if(task_status==="inprogress") dateStyling = "rounded-md p-1 pl-2 pr-2 mr-3 font-medium text-xs bg-pink-100 text-pink-400"
    else if(task_status==="inreview") dateStyling = "rounded-md p-1 pl-2 pr-2 mr-3 font-medium text-xs bg-blue-100 text-blue-400"
    else dateStyling = "rounded-md p-1 pl-2 pr-2 mr-3 font-medium text-xs bg-green-100 text-green-400"


    EditBtnClicked =async () =>{


    }

    const reactPopUpNewTodoTask = () => {
        
        return(
          <Popup
            modal
            trigger={
                <button type="button" className="text-white bg-blue-400 rounded-lg  pr-3 pl-3  text-normal">Edit</button>
            }
          >
            {close=>(
                <div className="bg-white h-66  grid grid-rows-2 pt-6 pb-6 w-96 rounded-lg shadow-2xl">
                   <div className="flex justify-between pl-4 pr-4 mb-4">
                        <h1 className="">Edit the Task</h1>
                        <RxCross1  onClick={() => close()} className="cursor-pointer" />
                    </div>

                    <hr className="bg-gray-400"/>
                
                    <div className="pb-10 pl-4 pr-4">
                        <form >
                            <div>
                                <label htmlFor="taskId" className="pb-4 font-large text-xs text-gray-600">Name of the Task</label>
                                <input type="text" id="taskId" onChange={taskNameChanged} value={task_name} placeholder="Project" className="w-full p-2 mt-3 font-normal text-gray-500 text-xs border-2  border-gray-200 rounded-lg"/>
                            </div>
                            <div className="flex mt-3">
                                <div className="mr-3">
                                    <label htmlFor="startDateId" className="pb-2 font-large text-xs text-gray-600">Start date</label>
                                    <input type="Date" id="startDateId" onChange={startTimeChanged} placeholder="Date" value={start_time} className="w-full p-2 mt-3 font-normal text-gray-500 text-xs border-2  border-gray-200 rounded-lg"/>
                                </div>
                                <div>
                                    <label htmlFor="endDateId" className="pb-2 font-large text-xs text-gray-600">End Date</label>
                                    <input type="Date" id="endDateId" placeholder="Date" onChange={endTimeChanged} value={end_time} className="w-full p-2 mt-3 font-normal text-gray-500 text-xs border-2  border-gray-200 rounded-lg"/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="statusId" className="pb-2 font-large text-xs text-gray-600">Status</label>
                                <br/>
                                <select name="status" id="statusId" onChange={selectChanged} placeholder="To DO" value={task_status} className="w-80 p-2 pr-2 border-2  border-gray-200 rounded-lg">
                                    <option value="inprogress" className="text-pink-400 font-medium text-xs" >&bull; In Progress</option>
                                    <option value="inreview"  className="text-blue-400 font-medium text-xs">&bull; In Review</option>
                                    <option value="completed"  className="text-green-400 font-medium text-xs">&bull; Completed</option>
                                </select>
                         
                            </div>
                            <div className="flex justify-end mt-3">
                                <button type="button" className="text-blue-400 bg-blue-100 rounded-md p-2 pl-4 pr-4 mr-3 font-medium text-xs" onClick={() => close()}>Cancel </button>
                                <button type="button" onClick={EditBtnClicked} className="text-white bg-blue-400 rounded-md p-2 pl-4 pr-4 font-medium text-xs" >Edit</button>
                            </div>
                        </form>
                    </div>  
                </div>
            )}
          </Popup>
       )
       
    }




    return(
        <li className="mt-5 bg-white shadow-md rounded-lg p-3">
            <h1 className="text-xs font-medium mb-3" >{task_name}</h1>
            <div className="flex ">
                <div className="flex flex-col">
                    <p className="font-large text-xs text-gray-600 mb-2">StartDate</p>
                    <p className={dateStyling}>{startDate}</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-large text-xs text-gray-600 mb-2">Deadline</p>
                    <p className={dateStyling}>{endDate}</p>
                </div>
            </div>
                <div className="flex justify-start mt-4">
                    {reactPopUpNewTodoTask()}
                </div>
        </li>
    )
}

export default TodoItem