
const ProjectItem = (props) => {
    const {details} = props;
    const {name} = details
    return(

    <li className="w-100 bg-slate-200  rounded-lg">
        <button type="button" className="p-2 flex justify-start text-start w-100 font-sans font-normal">F{name}</button>
    </li>
)
    }

export default ProjectItem