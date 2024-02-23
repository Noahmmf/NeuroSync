import { useState } from "react"
import { useDispatch } from "react-redux";

export default function Form(){
    const dispatch= useDispatch();

const [title, setTitle] = useState('');
const [start, setStart] = useState('');
const [end, setEnd]= useState('');
const [color, setColor]=useState('red');
const [date, setDate]=useState('');

const handleTitleChange = (e) => {
    setTitle({...title, title: e.target.value});
}
const handleStartChange = (e) => {
    setStart({...start, start: e.target.value});
}
const handleEndChange= (e) =>{
   setEnd({...end, end: e.target.value});
}
const handleColorChange = (e) => {
    setColor({...color, color: e.target.value});
}
const handleDateChange = (e) => {
    setDate({...date, date: e.target.value});
}

const handleClick = () => {
    event.preventDefault();

    const newEvent = {
      title: title,
      date: date,
      start: date + 'T' + start,
      end: date + 'T' + end,
      color: color
    };
//    console.log(`this is what im sending`, newEvent);

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
            <input type="date" placeholder="time" onChange={handleDateChange} /><br/>
            <label>Start Time: </label>
            <input type="time" placeholder="time" onChange={handleStartChange} />
            <label>End Time: </label>
            <input type="time" placeholder="time" onChange={handleEndChange} />
            <label>Select Color:</label>
            <select onChange={handleColorChange} name="color" id="color">
              <option value="red">red</option>
              <option value="blue">blue</option>
              <option value="pink">pink</option>
            </select>
            <button onClick={handleClick}>Submit</button>
        </form>
        </>
    )
}