import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function GoalsItems(props) {
    const dispatch = useDispatch();

    //targets the click to delete button using datafrom button.
  const deleteGoal = (e) => {
    dispatch({ type: "DELETE_GOAL", payload: e.target.dataset.goalid });
  };

  //targets the click to edit button using datafrom button.
  const editGoal = (e) => {
    dispatch({type: "EDIT_GOAL", payload: e.target.dataset.goalid })
  }



  return (
    <>
        <li>{props.goal.description}
        
        <button data-goalid={props.goal.id} onClick={deleteGoal}> 🔴
  </button></li>
    </>
  );
  
}

