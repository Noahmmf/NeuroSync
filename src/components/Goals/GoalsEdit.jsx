import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function EditGoals(){
    const dispatch = useDispatch();
    const history = useHistory();

    const goalId = useParams();

    console.log("goal ID:", goalId);

    const handleTypeChange = (e) => {
        setGoal({...goal, type: e.target.value});
    }

    const handleDescriptionChange = (e) => {
        setGoal({...goal, description: e.target.value});
    }

    const [goal, setGoal]=useState({
        id: goalId.id,
        type: "daily",
        description: ''
    }); 

      //targets the click to edit button using datafrom button.
      const editGoal = (e) => {
        e.preventDefault();
        dispatch({type: "EDIT_GOAL", payload: goal})
        console.log("this is what I want to send:", goal);
        setGoal('');
        history.push('/user')
      }

    return(
        <>
        <p>Edit form:</p>
        <form onSubmit={editGoal}> 
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
        </>
    )
}