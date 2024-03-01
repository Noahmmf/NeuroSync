import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

import {Container, Row, Col} from "react-bootstrap";

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

   useEffect(() => {
    
    dispatch({type: 'FETCH_HOUSEHOLD'});
   
  }, []);

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
        <Container>
            <Row > 
        <h1>Household Details: </h1>
        <h2>Household: {household.name} Household key:{household.household_key}</h2>
        
            </Row>

        <p>When you log in, you will be placed into a household with your username. To update your household, please click "Update Household".
          
        </p>
        </Container>
        <Container>
            <Row xs={2} className="mb-3" style={{padding:'10px', margin:'10px'}}>
        {newHousehold.length === 0 ? '' : <Button onClick={()=>history.push( `/createhousehold`)} >Create Household</Button>}
        <Button onClick={()=>history.push( `/joinhousehold`)}>Join Household</Button>
        <Button data-householdid={household.id} onClick={()=>history.push(`/update-household/${household.id}`)}>Update Household</Button>
        <Button variant="danger" data-householdid={household.id} onClick={handleDelete}>Leave Household</Button>
        </Row>
        
        <p></p>
        <p></p>
        </Container>
        </>
    )
}