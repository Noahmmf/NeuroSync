import React from "react";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function TasksItems(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    //targets the click to delete button using datafrom button.
  const deleteTask = (e) => {
    dispatch({ type: "DELETE_TASK", payload: e.target.dataset.taskid });
  };




  return (
    <>
        <li><input type="checkbox" />{props.task.task_details}
        <button data-taskid={props.task.id} onClick={()=>history.push( `/edit/task/${props.task.id}`)}>edit</button>
        <button data-taskid={props.task.id} onClick={deleteTask}> 🔴
  </button></li>
    </>
  );
  
}

