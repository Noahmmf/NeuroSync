// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { FloatingLabel } from 'react-bootstrap';

// function EditEvent() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const dispatch= useDispatch();

//   // used for the household ID to render only users who are in current household
//   const household = useSelector(store => store.householdReducer[0]);

  
// //States of form for setting new event
// const [title, setTitle] = useState('');
// const [start, setStart] = useState('');
// const [end, setEnd]= useState('');
// const [color, setColor]=useState('red');
// const [date, setDate]=useState('');
// const [allday, setAllday]=useState(false);

// //handles change when inputs are being entered
// const handleTitleChange = (e) => {
//   setTitle(e.target.value);
// }
// const handleStartChange = (e) => {
//   setStart(e.target.value);
// }
// const handleEndChange= (e) =>{
//  setEnd(e.target.value);
// }
// const handleColorChange = (e) => {
//   setColor(e.target.value);
// }
// const handleDateChange = (e) => {
//   setDate( e.target.value);
// }

// const handleAllDayChange= (e) => {
//   setAllday(true);
// }

// const handleSubmit = (event) => {
//   event.preventDefault();

//   let newEvent; // Declare newEvent here


// if( allday === true){
//    newEvent = {
//     allDay: allday,
//     cal_household_id: household.id,
//     title: title,
//     date: date,
//     start: date,
//     end: date,
//     color: color
// };
// }else if(allday === false){
//    newEvent = {
//     allDay: allday,
//     cal_household_id: household.id,
//     title: title,
//     date: date,
//     start: date + 'T' + start,
//     end: date + 'T' + end,
//     color: color
// };
// }
  
// //  console.log(`this is THE EVENT !!!!!!!!!!what im sending`, newEvent);

//   const action = {
//     type: "EDIT_EVENT",
//     payload: newEvent
//   };
//   dispatch(action);

//   setShow(false);
  
// };

// useEffect(() => {
//   dispatch({type: 'GET_EVENTS'});
// }, []);


//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Edit Event
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Event Details:</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <FloatingLabel controlId="floatingInput" onChange={handleTitleChange} label="Title" className="mb-4">
//             <Form.Control required type="text" placeholder='Please Enter Title' />
//             </FloatingLabel>
//             <FloatingLabel  controlId="floatingInput" onChange={handleDateChange} label="Day" className='mb-3'>
//                 <Form.Control required type='date' />
//             </FloatingLabel>
           
//             <Form.Check
//             onChange={handleAllDayChange}
//             inline
//             label="All Day"
//             name="group1"
//             type={'switch'}
//             id={`AllDay`}
//           />
            
//             <FloatingLabel  controlId="floatingInput" onChange={handleStartChange} label="Start Time" className='mb-3'>
//                 <Form.Control type='time' />
//             </FloatingLabel>
//             <FloatingLabel  controlId="floatingInput" onChange={handleEndChange} label="End Time" className='mb-3'>
//                 <Form.Control type='time' />
//             </FloatingLabel>

//             <Form.Select onChange={handleColorChange} aria-label="Default select example">
//                <option>Select a Color</option>
//                <option value="red">Red</option>
//                  <option value="blue">Blue</option>
//                   <option value="pink">Pink</option>
//                   <option value="#ffebcd">Blanched Almond</option>
//                   <option value="purple">Purple</option>
//                   <option value="green">Green</option>
                  
//              </Form.Select>
            
           
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={(handleSubmit)}>
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }


// export default EditEvent;