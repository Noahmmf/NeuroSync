import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



export default function CreateHousehold(){
    const dispatch= useDispatch();
    const history = useHistory();

    const household = useSelector(store => store.householdReducer[0]);
    const newHousehold = useSelector(store => store.householdReducer);
    // const checkHousehold= useSelector(store => store.setHouseholdNamesReducer);

    // console.log(`These are households`, checkHousehold);

    const [createNewHousehold, setCreateNewHousehold] = useState({
        name:'',
        household_key:''
    });
    

    const handleNameChange = (e) => {
        setCreateNewHousehold({...createNewHousehold, name: e.target.value});
    }

    const handlePasswordChange = (e) => {
        setCreateNewHousehold({...createNewHousehold, household_key: e.target.value});
    }

   
    const handleSubmit= event =>{
        event.preventDefault();
    
            dispatch({ type: "CREATE_HOUSEHOLD", payload: createNewHousehold});
            console.log("creating new household", createNewHousehold);
        

        setCreateNewHousehold({
            name:'',
            password:''
        })

        history.push('/info')
    }
   
   
   
    return(
        <>
           <h2>Please make a Household</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="householdName">Household Name:</label>
                    <input required value={createNewHousehold.name} onChange={handleNameChange} placeholder="Create Name" type="text" /><br/>
                    <label htmlFor="householdPassword">Create passcode:</label>
                    <input required value={createNewHousehold.household_key} onChange={handlePasswordChange} placeholder="Create Passcode" type="text" />
                    <button type="submit">Create Houshold</button>
                </form>
        </>
    )
}