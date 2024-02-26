//FullCalendar Imports
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridDay from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction';
import EditEvent from './EditEvent';
import { useState } from 'react';


//React imports
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import AddEvent from './Modal'
import { useEffect } from 'react'

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';



export default function Calendar(){
  //React variables
const dispatch= useDispatch();
const history = useHistory();

  
  //Store for calendar events
  const event = useSelector(store => store.event);

  console.log(`This is the event`, event[0].calendar[0]);

// Handles put request for editing events
  const handleEdit=(clickInfo)=>{
    const eventId= clickInfo.event.id

    console.log("Clicking this thing", eventId);
    history.push( `/editevent/${eventId}`);
  }

  //Delete request for deleting an event.
  const deleteEvent = (clickInfo)=>{
    const eventId = clickInfo.event.id;

    if(confirm("Do you want to delete this event?") == true){
      dispatch({ type: "DELETE_EVENT", payload: eventId });
    }else{
      return;
    }

  }

  useEffect(() => {
    dispatch({type: 'GET_EVENTS'});
  }, []);
  


  return (
    <div>
      <AddEvent />
       <EditEvent  />
      <FullCalendar
        customButtons={( {text: "+",})}
        plugins={[dayGridPlugin, timeGridDay, listPlugin, interactionPlugin, bootstrap5Plugin]}
        initialView='timeGridDay'
        weekends={true}
        editable={true}
        selectable={true}
        nowIndicator={true}
        handleWindowResize={true}
        eventTextColor='black'
        themeSystem={'bootstrap5'}
        height={450}
        // selectMirror={true}
        events={event[0].calendar}
        eventContent={renderEventContent}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'list,timeGridWeek,timeGridDay'
        }}
        eventClick={deleteEvent}
       
        
      />

      
    </div>
  )
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}