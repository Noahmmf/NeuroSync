import { useSelector } from "react-redux"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "react-bootstrap";

export default function Household(){
    const history= useHistory();
    const dispatch= useDispatch();
    

    const household = useSelector(store => store.householdReducer[0]);
    const newHousehold = useSelector(store => store.householdReducer);

   const handleDelete =(e)=>{
    if (confirm("Are you sure you want to delete your household? ") == true) {
        dispatch({ type: "DELETE_HOUSEHOLD", payload: e.target.dataset.householdid });
    }else{
        return
    }
   }

//  console.log('householdID', household.id)

    if (newHousehold.length === 0) {
        return(
            <>
            <h1>Household Details:</h1>
             <Button onClick={()=>history.push( `/createhousehold`)} >Create Household</Button>
             <Button onClick={()=>history.push( `/joinhousehold`)}>Join Household</Button>
            
            </>
        )
    }
    return(
        <>
        
        <h1>Household Details:</h1>
        <Button variant="danger" data-householdid={household.id} onClick={handleDelete}>Delete Household</Button>
        <p>Household ID: {household.household_id}</p>
        <p>Your household is: {household.name}</p>
        </>
    )
}