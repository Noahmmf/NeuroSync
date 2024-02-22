import React from "react";

export default function GoalsItems(props) {



  return (
    <>
    
      <li><input type="checkbox" />{props.goal.description} <button>Delete</button></li>
      
    </>
  );
}
