import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function TasksItems(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const taskId = useParams();

    //targets the click to delete button using datafrom button.
  const deleteTask = (e) => {
    dispatch({ type: "DELETE_TASK", payload: e.target.dataset.taskid });
  };

  const [complete, setComplete]= useState('false');

  const handleTaskCompletion = (e) => {
    setComplete(true);
}

const dispatchCompletion= e=>{
  e.preventDefault();
  dispatch({type: "EDIT_TASK", payload: complete})
}

  console.log("");

  return (
    <>
        <li><input type="checkbox"  onClick={(handleTaskCompletion )}/>{props.task.task_details}
        <button data-taskid={props.task.id} onClick={()=>history.push( `/edit/task/${props.task.id}`)}>edit</button>
        <button data-taskid={props.task.id} onClick={deleteTask}> 🔴
  </button></li>
    </>
  );
  
}

