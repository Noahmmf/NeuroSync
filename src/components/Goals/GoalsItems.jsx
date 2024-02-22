import React from "react";
import { useDispatch } from "react-redux";

export default function GoalsItems(props) {
    const dispatch = useDispatch();

  const deleteGoal = (e) => {
    dispatch({ type: "DELETE_GOAL", payload: e.target.dataset.goalid });
  };

  return (
    <>
      <li>
        <input type="checkbox" />
        {props.goal.description}
        <button data-goalid={props.goal.id} onClick={deleteGoal}>
          Delete
        </button>
      </li>
    </>
  );
}
