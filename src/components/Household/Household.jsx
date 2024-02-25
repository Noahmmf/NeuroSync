import { useSelector } from "react-redux"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Household(){
    const history= useHistory();

    const household = useSelector(store => store.householdReducer[0]);
    const newHousehold = useSelector(store => store.householdReducer);

 

    if (newHousehold.length === 0) {
        return(
            <>
            <h1>Household Details:</h1>
             <button onClick={()=>history.push( `/createhousehold`)} >Create Household</button>
             <button onClick={()=>history.push( `/joinhousehold`)}>Join Household</button>
            
            </>
        )
    }
    return(
        <>
        
        <h1>Household Details:</h1>
        <button>Edit Household</button>
        <p>Household ID: {household.household_id}</p>
        <p>Your household is: {household.name}</p>
        </>
    )
}