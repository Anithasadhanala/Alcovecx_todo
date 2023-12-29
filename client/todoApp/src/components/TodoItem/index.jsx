

const TodoItem = (props) => {

    const {details}= props 
    const {task_name,start_time,end_time,task_status} = details

    const startDate = start_time.slice(0,10)
    const endDate = end_time.slice(0,10)

    let dateStyling = "rounded-md p-1 pl-2 pr-2 mr-3 font-medium text-xs"


 
    if(task_status==="inprogress") dateStyling = "rounded-md p-1 pl-2 pr-2 mr-3 font-medium text-xs bg-pink-100 text-pink-400"
    else if(task_status==="inreview") dateStyling = "rounded-md p-1 pl-2 pr-2 mr-3 font-medium text-xs bg-blue-100 text-blue-400"
    else dateStyling = "rounded-md p-1 pl-2 pr-2 mr-3 font-medium text-xs bg-green-100 text-green-400"

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
                    <button type="button" className="text-white bg-blue-400 rounded-lg  pr-3 pl-3  text-normal">Edit</button>
                </div>
        </li>
    )
}

export default TodoItem