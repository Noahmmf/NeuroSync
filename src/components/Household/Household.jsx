import { useSelector } from "react-redux"
import { useState } from "react";

export default function Household(){

    const household = useSelector(store => store.householdReducer[0]);
    const newHousehold = useSelector(store => store.householdReducer);

    const [householdName, setHouseholdName] = useState('');
    const [householdPassword, setHouseholdPassword] = useState('');

    if (newHousehold.length === 0) {
        return(
            <>
                <h2>Please make a Household</h2>
                <form>
                    <label htmlFor="householdName">Household Name:</label>
                    <input required placeholder="Create Name" type="text" /><br/>
                    <label htmlFor="householdPassword">Create passcode:</label>
                    <input required placeholder="Create Passcode" type="text" />
                    <button>Create Houshold</button>
                </form>
            
            </>
        )
    }
    return(
        <>
        
        <h1>Household Details</h1>
        <button>Edit Household</button>
        <p>Household ID: {household.household_id}</p>
        <p>Your household is: {household.name}</p>
        </>
    )
}