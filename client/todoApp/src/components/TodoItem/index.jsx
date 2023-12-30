import Popup from 'reactjs-popup'
import { RxCross1 } from "react-icons/rx";
import { useState } from "react"



const TodoItem = (props) => {


    //while chaging the task, the data is updated here
    const taskNameChanged = (event) => setterTaskName(event.target.value);
    

    //while chaging the startTime, the data is updated here
    const startTimeChanged =(event)=> setterStartTime(event.target.value.slice(0,10));
    

    //while chaging the endTime, the data is updated here
    const endTimeChanged = (event)=> setterEndTime(event.target.value.slice(0,10))
    

    //while chaging the status, the data is updated here
    const selectChanged = (event) => setterStatusName(event.target.value)
    

    //destructing the props here
    const {details,editedTodoRerender,deletedTodoRerender}= props
    const {todo_name,start_time,end_time,task_status,todo_id} = details


    //react-hooks for preserving the state changing and re-rendering
    const [taskName,setterTaskName] = useState(todo_name)
    const [startTime,setterStartTime] = useState(start_time)
    const [endTime,setterEndTime]= useState(end_time)
    const [statusName,setterStatusName] = useState(task_status)

    
    //making the dates into single format
    const startDate = start_time.slice(0,10)
    const endDate = end_time.slice(0,10)


    //changing styling according to the props received
    let dateStyling = "rounded-md p-1 pl-2 pr-2 mr-3 font-medium text-xs"
    if(task_status==="inprogress") dateStyling = "rounded-md p-1 pl-2 pr-2 mr-3 font-medium text-xs bg-pink-100 text-pink-400"
    else if(task_status==="inreview") dateStyling = "rounded-md p-1 pl-2 pr-2 mr-3 font-medium text-xs bg-blue-100 text-blue-400"
    else dateStyling = "rounded-md p-1 pl-2 pr-2 mr-3 font-medium text-xs bg-green-100 text-green-400"


    //function that calls todo re-render after successfull edition
    const onSubmitSuccessEditTodoTask = ()=> editedTodoRerender()
    

    //function that calls todo re-render after successfull deletion
    const onSuccessTodoDeleted = ()=> deletedTodoRerender()
    

    //function that updated the todo
     const EditBtnClicked =async () =>{

        const url = "https://alcovex-todotask-anitha.onrender.com/todo-edit"
            const options = {
                method: 'PUT',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: `{
                    "taskName" : "${taskName}",
                    "startDate" : "${startTime}",
                    "endDate" : "${endTime}",
                    "taskStatus" : "${statusName}",
                    "todoId" : "${todo_id}"
                }`,
            }
            const response = await fetch(url, options)
            
            if (response.ok) onSubmitSuccessEditTodoTask()
            else onSubmitFailure() 
    }


    //function that deleted the todo
    const deleteTodoBtnClicked = async()=>{

        const url = `https://alcovex-todotask-anitha.onrender.com/todo-delete/${todo_id}`
        const options = {
            method: 'DELETE',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        }
        const response = await fetch(url, options)
    
        if (response.ok) onSuccessTodoDeleted()
        else onFailureHomeApi()
    }


    //function that popsup an editing form
    const reactPopUpNewTodoTask = () => {
        
        return(
          <Popup
            modal
            trigger={
                <button type="button" className="text-white bg-blue-400 rounded-lg  pr-3 pl-3  text-xs pt-1 pb-1 font-sans">Edit</button>
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
                                <input type="text" id="taskId" onChange={taskNameChanged} value={taskName} placeholder="Project" className="w-full p-2 mt-3 font-normal text-gray-500 text-xs border-2  border-gray-200 rounded-lg"/>
                            </div>
                            <div className="flex mt-3">
                                <div className="mr-3">
                                    <label htmlFor="startDateId" className="pb-2 font-large text-xs text-gray-600">Start date</label>
                                    <input type="Date" id="startDateId" onChange={startTimeChanged} placeholder="Date" value={startTime} className="w-full p-2 mt-3 font-normal text-gray-500 text-xs border-2  border-gray-200 rounded-lg"/>
                                </div>
                                <div>
                                    <label htmlFor="endDateId" className="pb-2 font-large text-xs text-gray-600">End Date</label>
                                    <input type="Date" id="endDateId" placeholder="Date" onChange={endTimeChanged} value={endTime} className="w-full p-2 mt-3 font-normal text-gray-500 text-xs border-2  border-gray-200 rounded-lg"/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="statusId" className="pb-2 font-large text-xs text-gray-600">Status</label>
                                <br/>
                                <select name="status" id="statusId" onChange={selectChanged} placeholder="To DO" value={statusName} className="w-80 p-2 pr-2 border-2  border-gray-200 rounded-lg">
                                    <option value="inprogress" className="text-pink-400 font-medium text-xs" >&bull; In Progress</option>
                                    <option value="inreview"  className="text-blue-400 font-medium text-xs">&bull; In Review</option>
                                    <option value="completed"  className="text-green-400 font-medium text-xs">&bull; Completed</option>
                                </select>
                         
                            </div>
                            <div className="flex justify-end mt-3">
                                <button type="button" className="text-blue-400 bg-blue-100 rounded-md p-2 pl-4 pr-4 mr-3 font-medium text-xs" onClick={() => close()}>Cancel </button>
                                <button type="button" onClick={
                                    ()=>{
                                        EditBtnClicked()
                                        close()

                                    }
                                    } className="text-white bg-blue-400 rounded-md p-2 pl-4 pr-4 font-medium text-xs" >Edit</button>
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
            <div className="flex justify-between">
            <h1 className="text-xs font-medium mb-3" >{taskName}</h1>
            <button type="button" onClick={deleteTodoBtnClicked} ><RxCross1 className="text-xs mr-3 text-gray-500 "/> </button>
            
            </div>
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