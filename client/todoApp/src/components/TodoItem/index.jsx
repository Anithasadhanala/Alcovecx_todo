

const TodoItem = (props) => {

    const {details}= props 
    const {task_name,start_time,end_time} = details

    const startDate = start_time.slice(0,10)
    const endDate = end_time.slice(0,10)

    return(
        <li className="mt-5 bg-white shadow-md rounded-lg p-3">
            <h1 className="text-xs font-medium mb-3" >{task_name}</h1>
            <div className="flex ">
                <div className="flex flex-col">
                    <p className="font-large text-xs text-gray-600 mb-2">StartDate</p>
                    <p className="text-blue-400 bg-blue-100 rounded-md p-1 pl-2 pr-2 mr-3 font-medium text-xs">{startDate}</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-large text-xs text-gray-600 mb-2">Deadline</p>
                    <p className="text-blue-400 bg-blue-100 rounded-md p-1 pl-2 pr-2 mr-3 font-medium text-xs">{endDate}</p>
                </div>
            </div>
                <div className="flex justify-start mt-4">
                    <button type="button" className="text-white bg-blue-400 rounded-lg p-1 pl-4 pr-4 font-medium text-xs">Edit</button>
                </div>
        </li>
    )
}

export default TodoItem