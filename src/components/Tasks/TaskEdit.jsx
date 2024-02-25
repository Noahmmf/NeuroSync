import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function EditTask(){
    //react variables
    const dispatch = useDispatch();
    const history = useHistory();
    const taskId = useParams();

    // using state as an object that will be sent to backend
    const [task, setTask]=useState({
        id: taskId,
        task_details: '',
        is_complete: false
    }); 

        //Handles change in inputs
     const handleDescriptionChange = (e) => {
        setTask({...task, task_details: e.target.value});
    }

      //targets the click to edit button using datafrom button.
      const editTask = (e) => {
        e.preventDefault();
        dispatch({type: "EDIT_TASK", payload: task})
        console.log("this is what I want to send:", task);
        setTask('');
        history.push('/tasks')
      }

    return(
        <>
        <p>Edit form:</p>
        <form onSubmit={editTask}> 
            <label htmlFor="description">Description:</label>
            <input onChange={handleDescriptionChange} placeholder="Task Description" type="text" />
            <button type="submit">Submit</button>
        </form>
        </>
    )
}