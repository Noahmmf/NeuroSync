import GoalsItems from "./GoalsItems"
import { useSelector } from "react-redux";
import './Goals.css'

export default function Goals(){

    const goals = useSelector(store => store.goalsReducer);

    if (goals.length === 0) {
        return(
        <p>Please enter a goal!</p>
        )
    }
    return (
        <>
            <ul>
            {goals.map((goal)=> <GoalsItems key={goal.id} goal={goal} />)}
            </ul>
        </>
    )
}