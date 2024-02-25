import { useState } from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Form(){
    const dispatch= useDispatch();

    const household = useSelector(store => store.householdReducer[0]);
    const calendar = useSelector(store => store)

    

const [title, setTitle] = useState('');
const [start, setStart] = useState('');
const [end, setEnd]= useState('');
const [color, setColor]=useState('red');
const [date, setDate]=useState('');



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

 
    const newEvent = {
      cal_household_id: household.id,
      title: title,
      date: date,
      start: date + 'T' + start,
      end: date + 'T' + end,
      color: color
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