import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import {Container, Row, Col} from "react-bootstrap";

export default function Household(){
    const history= useHistory();
    const dispatch= useDispatch();

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    

    const household = useSelector(store => store.householdReducer[0]);
    const newHousehold = useSelector(store => store.householdReducer);

    

   const handleDelete =(e)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You MUST create a new household to be able to use some features.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
            dispatch({ type: "DELETE_HOUSEHOLD", payload: e.target.dataset.householdid });
        }
      });
     
   
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
            <Row className="mb-3" > 
        <Button variant="warning" onClick={handleShow}>
        Show Household
      </Button>
            </Row>

        <p >When you log in, you will be placed into a household with your username. To update your household, please click "Update Household".
          
        </p>
        </Container>
        <Container>
            <Row xs={2} className="mb-3" style={{padding:'10px', margin:'10px'}}>
        {newHousehold.length === 0 ? '' : <Button onClick={()=>history.push( `/createhousehold`)} >Create Household</Button>}
        <Button onClick={()=>history.push( `/joinhousehold`)}>Join Household</Button>
        <Button data-householdid={household.id} onClick={()=>history.push(`/update-household/${household.id}`)}>Update Household</Button>
        <Button variant="danger" data-householdid={household.id} onClick={handleDelete}>Leave Household</Button>
        </Row>
        
        </Container>

        <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Household Details:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <h2> Household Name: {household.name}</h2>
       <h2> Household key:{household.household_key}</h2>
       
       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
        </>
    )
}