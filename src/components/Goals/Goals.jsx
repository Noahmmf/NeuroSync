import { useState } from "react";
import GoalsItems from "./GoalsItems"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";



export default function Goals(){
    const dispatch = useDispatch();

    const goals = useSelector(store => store.goalsReducer);
    const [type, setType]= useState("daily");
    
    const [goal, setGoal]=useState({
        type: "daily",
        description: ''
    }); 

  

    const addNewGoal = event =>{
        event.preventDefault();
        dispatch({ type: "CREATE_GOAL", payload: goal});
        console.log("creating new goal", goal);
      
        setGoal({
            type: "daily",
            description: ''
        })
    }

 

    const handleTypeChange = (e) => {
        setGoal({...goal, type: e.target.value});
    }

    const handleDescriptionChange = (e) => {
        setGoal({...goal, description: e.target.value});
    }


    
    const [daily, setDaily] = useState(true);
    const [monthly, setMonthly] = useState(false);
    const [yearly, setYearly] = useState(false);
    const [fiveYear, setFiveYear]= useState(false);
    
    const renderDaily = e => {
        setDaily(true);
        setMonthly(false);
        setYearly(false);
        setFiveYear(false);
    }
    
    const renderMonthly = e => {
        setDaily(false);
        setMonthly(true);
        setYearly(false);
        setFiveYear(false);
    }
    
    const renderYearly = e => {
        setDaily(false);
        setMonthly(false);
        setYearly(true);
        setFiveYear(false);
    }
    
    const renderFiveYear = e => {
        setDaily(false);
        setMonthly(false);
        setYearly(false);
        setFiveYear(true);
    }
    
    if (goals.length === 0) {
        return(
            <>
            <form onSubmit={addNewGoal}> 
            <label htmlFor="Type">Type:</label>
            <select value={goal.type} onChange={handleTypeChange} name="Type" id="Type">
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="5 Year">5 Year</option>
            </select>

            <label htmlFor="description">Description:</label>
            <input value={goal.description} required onChange={handleDescriptionChange} placeholder="Goal Description" type="text" />
            <Button type="submit">Submit</Button>
        </form>
        <Button onClick={renderDaily}>Daily</Button> <Button onClick={renderMonthly} >Monthly</Button> <Button onClick={renderYearly}>Yearly</Button> <Button onClick={renderFiveYear}>5 Year</Button>
            <p>Please enter a goal!</p>
            </>
        )
    }
    return (
        <>
        <form onSubmit={addNewGoal}> 
            <label htmlFor="Type">Type:</label>
            <select value={goal.type} onChange={handleTypeChange} name="Type" id="Type">
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="5 Year">5 Year</option>
            </select>

            <label htmlFor="description">Description:</label>
            <input onChange={handleDescriptionChange} value={goal.description} placeholder="Goal Description" type="text" />
            <Button type="submit">Submit</Button>
        </form>
        <Button onClick={renderDaily}>Daily</Button> <Button onClick={renderMonthly} >Monthly</Button> <Button onClick={renderYearly}>Yearly</Button> <Button onClick={renderFiveYear}>5 Year</Button>

            <ul>
            {goals.map((goal)=> <GoalsItems daily={daily} monthly={monthly} yearly={yearly} fiveYear={fiveYear} key={goal.id} goal={goal} />)}
            </ul>
        </>
    )
}