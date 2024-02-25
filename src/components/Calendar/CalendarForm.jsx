import { useState } from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Form(){
    const dispatch= useDispatch();

    const household = useSelector(store => store.householdReducer[0]);
    const calendar = useSelector(store => store)

    // console.log("THIS IS THE HOUSEHOLD STORE", household);

    

const [title, setTitle] = useState('');
const [start, setStart] = useState('');
const [end, setEnd]= useState('');
const [color, setColor]=useState('red');
const [date, setDate]=useState('');

console.log(`start: ${JSON.stringify(start)} and end: ${end[0]}`)

console.log(`This is what I'm doing: `  )

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

const handleSubmit = (event) => {
    event.preventDefault();

    if(cal_household_id === undifined){
      let newEvent = {
      title: title,
      date: date,
      start: date + 'T' + start,
      end: date + 'T' + end,
      color: color
    };
    }else{
    const newEvent = {
      cal_household_id: household.id,
      title: title,
      date: date,
      start: date + 'T' + start,
      end: date + 'T' + end,
      color: color
    };
  };
   console.log(`this is THE EVENT !!!!!!!!!!what im sending`, newEvent);

    const action = {
      type: "CREATE_EVENT",
      payload: newEvent
    };
    dispatch(action);

    setTitle("");
    setStart("");
  };




    return(
        <>
        <form>
          <label>Event title: </label>
            <input type="text" placeholder="title" onChange={handleTitleChange} /><br/>
            <label>Day: </label>
            <input type="date" placeholder="time"  onChange={handleDateChange} /><br/>
            <label>Start Time: </label>
            <input type="time" placeholder="time"  onChange={handleStartChange} />
            <label>End Time: </label>
            <input type="time" placeholder="time"  onChange={handleEndChange} />
            <label>Select Color:</label>
            <select onChange={handleColorChange}  name="color" id="color">
              <option value="red">red</option>
              <option value="blue">blue</option>
              <option value="pink">pink</option>
            </select>
            <button onClick={handleSubmit}>Submit</button>
        </form>
        </>
    )
}