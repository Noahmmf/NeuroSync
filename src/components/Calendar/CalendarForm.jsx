import { useState } from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Form(){
    const dispatch= useDispatch();

    // used for the household ID to render only users who are in current household
    const household = useSelector(store => store.householdReducer[0]);

    
//States of form for setting new event
const [title, setTitle] = useState('');
const [start, setStart] = useState('');
const [end, setEnd]= useState('');
const [color, setColor]=useState('blue');
const [date, setDate]=useState('');
const [allday, setAllday]=useState(false);

//handles change when inputs are being entered
const handleTitleChange = (e) => {
    setTitle(e.target.value);
}
const handleStartChange = (e) => {
    setStart(e.target.value);
}
const handleEndChange= (e) =>{
   setEnd(e.target.value);
}
const handleColorChange = (e) => {
    setColor(e.target.value);
}
const handleDateChange = (e) => {
    setDate( e.target.value);
}

const handleAllDayChange= (e) => {
    setAllday(true);
}

const handleSubmit = (event) => {
    event.preventDefault();

    let newEvent; // Declare newEvent here


  if( allday === true){
     newEvent = {
      allDay: allday,
      cal_household_id: household.id,
      title: title,
      date: date,
      start: date,
      end: date,
      color: color
  };
  }else if(allday === false){
     newEvent = {
      allDay: allday,
      cal_household_id: household.id,
      title: title,
      date: date,
      start: date + 'T' + start,
      end: date + 'T' + end,
      color: color
  };
  }
    
  //  console.log(`this is THE EVENT !!!!!!!!!!what im sending`, newEvent);

    const action = {
      type: "CREATE_EVENT",
      payload: newEvent
    };
    dispatch(action);

    
  };

  useEffect(() => {
    dispatch({type: 'GET_EVENTS'});
  }, []);



    return(
        <>
        <form>
          <label>Event title: </label>
            <input type="text" placeholder="title" onChange={handleTitleChange} /><br/>
            <label>Day: </label>
            <input type="date" placeholder="time"  onChange={handleDateChange} /><br/>
            <label htmlFor="allDay">AllDay:</label>
            <input type="checkbox" onChange={handleAllDayChange}/>
            <label>Start Time: </label>
            <input type="time" placeholder="time"  onChange={handleStartChange} />
            <label>End Time: </label>
            <input type="time" placeholder="time"  onChange={handleEndChange} />
            <label>Select Color:</label>
            <select onChange={handleColorChange}  name="color" id="color">
              <option value="red">red</option>
              <option value="blue">blue</option>
              <option value="pink">pink</option>
              <option value="yellow">yellow</option>
              <option value="green">green</option>
              <option value="#ffebcd">Blanched Almond</option>
              <option value="purple">purple</option>
            </select>
            <button onClick={handleSubmit}>Submit</button>
        </form>
        </>
    )
}