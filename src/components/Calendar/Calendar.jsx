//FullCalendar Imports
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridDay from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
// import EditEvent from './EditEvent';
import { useState } from "react";
import './Calendar.css'

//React imports
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

//Bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FloatingLabel, Container } from "react-bootstrap";



//import from sweetAlert
import Swal from 'sweetalert2';




// Calendar is component function that is rendered on App.jsx
export default function Calendar() {
  //React variables
  const dispatch = useDispatch();
  const history = useHistory();

  //Store for calendar events will need to add [0].calendar to get actual events
  const event = useSelector((store) => store.event);

  //Created state for event ID
  const [grabbedEvent, setGrabbedEvent] = useState("");

  // Handles put request for editing events
  const handleEdit = (clickInfo) => {
    //Is what is grabbing and passing event id onclick.
    const eventId = clickInfo.event.id;
    setGrabbedEvent(eventId);
    console.log("Clicking this thing", Number(clickInfo.event.id));
    console.log("this is the grabbed Event", Number(grabbedEvent));

    //Sets the modal to populate when clicked on event
    setShow(true);
  };

  console.log("this is the grabbed Event", Number(grabbedEvent));

  //Delete request for deleting an event.
  const deleteEvent = (clickInfo) => {
    
     dispatch({ type: "DELETE_EVENT", payload: grabbedEvent });
   
    setShow(false);
  };

  //renders the events right away when page loads
  useEffect(() => {
    dispatch({ type: "GET_EVENTS" });
  }, []);

  //The state that sets the modal to show
  const [show, setShow] = useState(false);

  //Functions that render the modal
  const handleClose = () => {
    setGrabbedEvent(""), setAllday(false), setShow(false);
  };
  const handleShow = () => {
    setAllday(false), setShow(true);
  };

  console.log("grabbed event", grabbedEvent);

  // used for the household ID to render only users who are in current household
  const household = useSelector((store) => store.householdReducer[0]);

  //States of form for setting new event
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [color, setColor] = useState("red");
  const [date, setDate] = useState("");
  const [allday, setAllday] = useState(false);

  //handles change when inputs are being entered
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleStartChange = (e) => {
    setStart(e.target.value);
  };
  const handleEndChange = (e) => {
    setEnd(e.target.value);
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleAllDayChange = (e) => {
    setAllday(allday === false ? true : false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let newEvent; // Declare newEvent here

    //condition if is All day is set to true
    if (allday === true) {
      newEvent = {
        id: grabbedEvent,
        allDay: allday,
        cal_household_id: household.id,
        title: title,
        date: date,
        start: date,
        end: date,
        color: color,
      };
    } else if (allday === false) {
      newEvent = {
        id: grabbedEvent,
        allDay: allday,
        cal_household_id: household.id,
        title: title,
        date: date,
        start: date + "T" + start,
        end: date + "T" + end,
        color: color,
      };
    }

    //  console.log(`this is THE EVENT !!!!!!!!!!what im sending`, newEvent);

    const action = {
      type: "EDIT_EVENT",
      payload: newEvent,
    };
    dispatch(action);

    setShow(false);
  };

  const handleNewEvent = (event) => {
    event.preventDefault();

    let newEvent; // Declare newEvent here

    if (allday === true) {
      newEvent = {
        allDay: allday,
        cal_household_id: household.id,
        title: title,
        date: date,
        start: date,
        end: date,
        color: color,
      };
    } else if (allday === false) {
      newEvent = {
        allDay: allday,
        cal_household_id: household.id,
        title: title,
        date: date,
        start: date + "T" + start,
        end: date + "T" + end,
        color: color,
      };
    }

    const action = {
      type: "CREATE_EVENT",
      payload: newEvent,
    };
    dispatch(action);

    setAllday(false);
    setShow(false);
  };

  console.log("this is allday", allday);

  const deleteButtonFire=()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      
      if (result.isConfirmed) {
        dispatch({ type: "DELETE_EVENT", payload: grabbedEvent });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
          
        });
        setShow(false);
      }
    });
  }

  return (
    <div>
      <Container style={{position:'relative', display:'flex'}}>
      <FullCalendar
      
        customButtons={{
          myCustomButton: {
            text: "Add Event",
            click: handleShow,
          },
        }}
        
        plugins={[
          dayGridPlugin,
          timeGridDay,
          listPlugin,
          interactionPlugin,
          bootstrap5Plugin,
        ]}
      
        initialView="timeGridDay"
        weekends={true}
        editable={false}
        selectable={true}
        titleFormat={{ year: "numeric", month: "short", day: "numeric" }}
        nowIndicator={true}
        handleWindowResize={true}
        eventTextColor="black"
        themeSystem={"bootstrap5"}
        height={760}
        
        // selectMirror={true}
        events={event[0]?.calendar}
        eventContent={renderEventContent}
        headerToolbar={{
          left: "prev,next today myCustomButton",
          center: "title",
          right: "list,timeGridWeek,timeGridDay",
        }}
        eventClick={handleEdit}
      />
   </Container>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Event Details:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FloatingLabel
                controlId="floatingInput"
                onChange={handleTitleChange}
                label="Title"
                className="mb-4"
              >
                <Form.Control
                  required
                  type="text"
                  placeholder="Please Enter Title"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                onChange={handleDateChange}
                label="Day"
                className="mb-3"
              >
                <Form.Control required type="date" />
              </FloatingLabel>

              <Form.Check
                onChange={handleAllDayChange}
                inline
                label="All Day"
                name="group1"
                type={"switch"}
                id={`AllDay`}
              />

              <FloatingLabel
                controlId="floatingInput"
                onChange={handleStartChange}
                label="Start Time"
                className="mb-3"
              >
                <Form.Control type="time" />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                onChange={handleEndChange}
                label="End Time"
                className="mb-3"
              >
                <Form.Control type="time" />
              </FloatingLabel>

              <Form.Select
                onChange={handleColorChange}
                aria-label="Default select example"
              >
                <option>Select a Color</option>
                <option value="#2C3E50">Navy Blue</option>
                <option value="#95A5A6">Grey</option>
                <option value="#18BC9C">Teal</option>
                <option value="#ffebcd">Blanched Almond</option>
                <option value="#E74C3C">Red</option>
                <option value="#F39D12">Mustard</option>
                <option value="#3498DB">Sky</option>
              </Form.Select>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {grabbedEvent === "" ? (
              ""
            ) : (
              <Button variant="danger" onClick={deleteButtonFire}>
                Delete
              </Button>
            )}
            {grabbedEvent === "" ? (
              <Button variant="primary" onClick={handleNewEvent}>
                Submit
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSubmit}>
                Save Changes
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
// }
