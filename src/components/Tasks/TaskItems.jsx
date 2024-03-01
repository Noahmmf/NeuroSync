import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "react-bootstrap";

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
  const [complete, setComplete]= useState(false);


//creates a new object for editing complete/incomplete
 const newtask={
  id: props.task.id,
  task_details: props.task.task_details,
  is_complete: complete
 };

 const isCompleted=()=>{
  setComplete(!complete);
  
 }

const dispatchCompletion= e =>{

  isCompleted();
  dispatch({type: "EDIT_TASK", payload: newtask});
}

  const isComplete = props.task.is_complete;


  

  return (
    <>
        <li data-taskid={props.task.id} className={isComplete === true ? 'completed' : ''} onClick={( dispatchCompletion )}>{props.task.task_details}
        <Button size="sm" variant=""  data-taskid={props.task.id} onClick={deleteTask}> 🔴
  </Button></li>
    </>
  );
  
}

