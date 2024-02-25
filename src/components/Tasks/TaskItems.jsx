import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function TasksItems(props) {
  // react variables 
    const dispatch = useDispatch();
    const history = useHistory();
    let taskId = useParams();

    //targets the click to delete button using datafrom button.
  const deleteTask = (e) => {
    dispatch({ type: "DELETE_TASK", payload: e.target.dataset.taskid });
  };

  //state for completion of task
  const [complete, setComplete]= useState('false');

 const newtask={
  id: props.task.id,
  task_details: props.task.task_details,
  is_complete: complete
 };
 console.log("This is the newtask:", newtask);
  

console.log(`Is task complete:`, complete);

const dispatchCompletion= e=>{
  e.preventDefault();
  setComplete(!complete);
  dispatch({type: "EDIT_TASK", payload: newtask});
}

  

  return (
    <>
        <li data-taskid={props.task.id} onClick={( dispatchCompletion )}>{props.task.task_details}
        {/* <button data-taskid={props.task.id} onClick={()=>history.push( `/edit/task/${props.task.id}`)}>edit</button> */}
        <button data-taskid={props.task.id} onClick={deleteTask}> 🔴
  </button></li>
    </>
  );
  
}

