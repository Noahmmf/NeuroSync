import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



export default function JoinHousehold(){
    const dispatch= useDispatch();
    const history = useHistory();

    const household = useSelector(store => store.householdReducer[0]);
    const newHousehold = useSelector(store => store.householdReducer);
    // const checkHousehold= useSelector(store => store.setHouseholdNamesReducer);

    // console.log('household Name:', newHousehold);

    const [joinHousehold, setJoinHousehold] = useState({
        name:'',
        household_key:''
    });
    

    const handleNameChange = (e) => {
        setJoinHousehold({...joinHousehold, name: e.target.value});
    }

    const handlePasswordChange = (e) => {
        setJoinHousehold({...joinHousehold, household_key: e.target.value});
    }

   
    const handleSubmit= event =>{
        event.preventDefault();
      
     
          dispatch({ type: "JOIN_HOUSEHOLD", payload: joinHousehold});
      
        console.log("creating new household", joinHousehold);

        
        setJoinHousehold({
            name:'',
            household_key:''
        })

    }
   
  
   
    return(
        <>
           <h2>Please enter an existing Household</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="householdName">Household Name:</label>
                    <input required value={joinHousehold.name} onChange={handleNameChange} placeholder="Create Name" type="text" /><br/>
                    <label htmlFor="householdPassword">Create passcode:</label>
                    <input required value={joinHousehold.household_key} onChange={handlePasswordChange} placeholder="Create Passcode" type="text" />
                    <button type="submit">Join Houshold</button>
                </form>
        </>
    )
}