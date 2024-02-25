import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridDay from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { useDispatch, useSelector } from 'react-redux'
import interactionPlugin from '@fullcalendar/interaction';
import Form from './CalendarForm'



export default function Calendar(){
const dispatch= useDispatch();
  const event = useSelector(store => store.event[0].calendar);

  console.log(`these are the events:`, event.calendar);


  const handleEdit=(e)=>{
    console.log("Clicking this thing", e.target.id);

  }

  

  return (
    <div>
        <Form />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridDay, listPlugin, interactionPlugin]}
        initialView='timeGridDay'
        weekends={true}
        editable={true}
        selectable={true}
        nowIndicator={true}
        handleWindowResize={true}
        
        // themeSystem={'bootstrap 5'}
        height={450}
        events={event}
        eventContent={renderEventContent}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'list,timeGridWeek,timeGridDay'
        }}
       eventClick={handleEdit}

        
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