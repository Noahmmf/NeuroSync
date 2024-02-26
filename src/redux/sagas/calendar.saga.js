import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getCalendarEvent(){
    try{
        const response = yield axios.get('api/calendar');
        console.log("this is the response.date for the calendar events", response.data);
        yield put({ type: 'ADD_EVENT', payload: response.data})
    }catch (error) {
        console.error("ERROR in store GET:", error);
      }
}

function* getOneEvent(){
  try{
    const response = yield axios.get(`api/calendar/event`);
    console.log("this is the DATE YOU SELECTED", response.data);
    yield put({ type: "GRAB_ONE_EVENT", payload: response.data})
}catch (error) {
    console.error("ERROR in store GET:", error);
  }
}

function* createCalendarEvent(action){
  // console.log("this sis the ACTION PAYLOAD", action.payload);
    try { yield axios.post(`/api/calendar`, action.payload);
    yield put({type: "GET_EVENTS"})} catch(error) {
      console.error("ERROR in store POST:", error);
    }
  } 

  function* editCalendar(action){
    try{
        yield axios.put(`/api/calendar/${action.payload.id}`, action.payload);
        yield put({type: "GET_EVENTS"})
    }catch(error) {
        console.error("ERROR in store editing:", error);
      }
  }

  function* removeCalendarEvent(action){
    try {yield axios.delete(`/api/calendar/${action.payload}`);
    // console.log("this is the payload", action.payload);
    yield put({ type: "GET_EVENTS" })}catch(error) {
    console.error("ERROR in store removing:", error);
  }
  }

  function* calendarSaga() {
    yield takeEvery("GET_EVENTS", getCalendarEvent);
    yield takeEvery("DELETE_EVENT", removeCalendarEvent);
    yield takeEvery("CREATE_EVENT", createCalendarEvent);
    yield takeEvery("EDIT_EVENT", editCalendar);
    yield takeEvery("GET_ONE_EVENT", getOneEvent);
  } 

  export default calendarSaga;