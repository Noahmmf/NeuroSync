import { useSelector } from "react-redux"
import { useState } from "react";

export default function Household(){

    const household = useSelector(store => store.householdReducer[0]);
    const newHousehold = useSelector(store => store.householdReducer);

    const [householdName, setHouseholdName] = useState('');
    const [householdPassword, setHouseholdPassword] = useState('');

    const handleNameChange = (e) => {
        setHouseholdName({...householdName, householdName: e.target.value});
    }

    const handlePasswordChange = (e) => {
        setHouseholdPassword({...householdPassword, householdPassword: e.target.value});
    }

    const handleSubmit= event =>{
        event.preventDefault();
        dispatch({ type: "CREATE_HOUSEHOLD", payload: [householdName, householdPassword]});
        console.log("creating new task", payload);

        setHouseholdName('');
        setHouseholdPassword('');
    }

    if (newHousehold.length === 0) {
        return(
            <>
                <h2>Please make a Household</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="householdName">Household Name:</label>
                    <input required value={householdName} onChange={handleNameChange} placeholder="Create Name" type="text" /><br/>
                    <label htmlFor="householdPassword">Create passcode:</label>
                    <input required value={householdPassword} onChange={handlePasswordChange} placeholder="Create Passcode" type="text" />
                    <button type="submit">Create Houshold</button>
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