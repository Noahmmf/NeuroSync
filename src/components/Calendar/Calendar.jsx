import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridDay from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { useDispatch, useSelector } from 'react-redux'
import interactionPlugin from '@fullcalendar/interaction';

import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Example from './Modal'



export default function Calendar(){
const dispatch= useDispatch();
const eventID = useParams();
const history = useHistory();

  

  const event = useSelector(store => store.event[0].calendar);

  // console.log(`these are the events:`, event);


  const handleEdit=(clickInfo)=>{
    const eventId= clickInfo.event.id

    console.log("Clicking this thing", eventId);
    history.push( `/editevent/${eventId}`);

  }

  const deleteEvent = (clickInfo)=>{
    const eventId = clickInfo.event.id;

    if(confirm("Do you want to delete this event?") == true){
      dispatch({ type: "DELETE_EVENT", payload: eventId });
    }else{
      return;
    }

  }

  
  

  console.log("this is what is changing", )


  return (
    <div>
      <Example />
       
      <FullCalendar
        plugins={[dayGridPlugin, timeGridDay, listPlugin, interactionPlugin]}
        initialView='timeGridDay'
        weekends={true}
        editable={true}
        selectable={true}
        nowIndicator={true}
        handleWindowResize={true}
        eventTextColor='black'
        // themeSystem={'bootstrap 5'}
        height={450}
        // selectMirror={true}
        events={event}
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