const TaskStatus = (props) => {

    const {details} = props

    const {name,color} = details
console.log(color)
    const status = color + " font-medium text-xs bg-gray-200 w-4/12 rounded-md p-1 "
    const addBtn = color + " bg-gray-200 mt-4 rounded-lg text-medium text-sm p-1"
   console.log(addBtn)
    return(

    <li className="flex flex-col bg-gray-100 p-5">
        <h1 className={status} >&bull; {name}</h1>
        <button type="button" className={addBtn}>+ Add New</button>
    </li>

    )
}

export default TaskStatus