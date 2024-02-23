import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function GoalsItems(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    //targets the click to delete button using datafrom button.
  const deleteGoal = (e) => {
    dispatch({ type: "DELETE_GOAL", payload: e.target.dataset.goalid });
  };




  return (
    <>
        <li>{props.goal.description}
        <button data-goalid={props.goal.id} onClick={()=>history.push( `/edit/${props.goal.id}`)}>edit</button>
        <button data-goalid={props.goal.id} onClick={deleteGoal}> 🔴
  </button></li>
    </>
  );
  
}

