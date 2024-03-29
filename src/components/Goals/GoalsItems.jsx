import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "react-bootstrap";

export default function GoalsItems(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  //targets the click to delete button using datafrom button.
  const deleteGoal = (e) => {
    dispatch({ type: "DELETE_GOAL", payload: e.target.dataset.goalid });
  };

  if (props.goal.type === "daily" && props.daily === true) {
    return (
      <>
        <li >
          {props.goal.description}
          <Button data-goalid={props.goal.id} style={{padding:'1px', margin:'5px'}} onClick={() => history.push(`/edit/${props.goal.id}`)}>Edit</Button>
          <Button size="sm" style={{padding:'5px', background:'transparent', border:'none', }} data-goalid={props.goal.id} onClick={deleteGoal}>
            {" "}
            🔴
          </Button>
        </li>
      </>
    );
  } else if (props.goal.type === "monthly" && props.monthly === true) {
    return (
      <>
        <li >
          {props.goal.description}
          <Button data-goalid={props.goal.id} style={{padding:'1px', margin:'5px'}} onClick={() => history.push(`/edit/${props.goal.id}`)}>Edit</Button>
          <Button size="sm" style={{padding:'5px', background:'transparent', border:'none', }} data-goalid={props.goal.id} onClick={deleteGoal}>
            {" "}
            🔴
          </Button>
        </li>
      </>
    );
  } else if (props.goal.type === "Yearly" && props.yearly === true) {
    return (
      <>
        <li >
          {props.goal.description}
          <Button data-goalid={props.goal.id} style={{padding:'1px', margin:'5px'}} onClick={() => history.push(`/edit/${props.goal.id}`)}>Edit</Button>
          <Button size="sm" style={{padding:'5px', background:'transparent', border:'none', }} data-goalid={props.goal.id} onClick={deleteGoal}>
            {" "}
            🔴
          </Button>
        </li>
      </>
    );
  } else if (props.goal.type === "5 Year" && props.fiveYear === true) {
    return (
      <>
        <li >
          {props.goal.description}
          <Button data-goalid={props.goal.id} style={{padding:'1px', margin:'5px'}} onClick={() => history.push(`/edit/${props.goal.id}`)}>Edit</Button>
          <Button style={{padding:'5px', background:'transparent', border:'none', }} size="sm" data-goalid={props.goal.id} onClick={deleteGoal}>
            {" "}
            🔴
          </Button>
        </li>
      </>
    );
  }
}
