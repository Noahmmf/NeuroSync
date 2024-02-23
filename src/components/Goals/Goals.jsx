import { useState } from "react";
import GoalsItems from "./GoalsItems"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


export default function Goals(){
    const dispatch = useDispatch();

    const goals = useSelector(store => store.goalsReducer);

    
    const [goal, setGoal]=useState({
        
        type: "daily",
        description: ''
    }); 

    // console.log("this is what I am sending", goal);

    const addNewGoal = event =>{
        event.preventDefault();
        dispatch({ type: "CREATE_GOAL", payload: goal});
        console.log("creating new goal", goal);

    }

      //targets the click to edit button using datafrom button.
//   const editGoal = (e) => {
//     dispatch({type: "EDIT_GOAL", payload: goal})
//     console.log("this is what I want to send:", goal);
//   }

    const handleTypeChange = (e) => {
        setGoal({...goal, type: e.target.value});
    }

    const handleDescriptionChange = (e) => {
        setGoal({...goal, description: e.target.value});
    }


    if (goals.length === 0) {
        return(
            <>
            <form onSubmit={addNewGoal}> 
            <label htmlFor="Type">Type:</label>
            <select onChange={handleTypeChange} name="Type" id="Type">
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="5 Year">5 Year</option>
            </select>

            <label htmlFor="description">Description:</label>
            <input onChange={handleDescriptionChange} placeholder="Goal Description" type="text" />
            <button type="submit">Submit</button>
        </form>
            <p>Please enter a goal!</p>
            </>
        )
    }
    return (
        <>
        <form onSubmit={addNewGoal}> 
            <label htmlFor="Type">Type:</label>
            <select onChange={handleTypeChange} name="Type" id="Type">
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="5 Year">5 Year</option>
            </select>

            <label htmlFor="description">Description:</label>
            <input onChange={handleDescriptionChange} placeholder="Goal Description" type="text" />
            <button type="submit">Submit</button>
        </form>
            <ul>
            {goals.map((goal)=> <GoalsItems key={goal.id} goal={goal} />)}
            </ul>
        </>
    )
}