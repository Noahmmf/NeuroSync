import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getHousehold(){
    try{
        const response = yield axios.get('api/household');
        // console.log("response.data", response.data)
        yield put({ type: "SET_HOUSEHOLD", payload: response.data})
    }catch (error) {
        console.error("ERROR in store GET:", error);
      }
}

function* getHouseholdName(){
  try{
      const response = yield axios.get('api/household/names');
      console.log("response.data FOR HOUSEHOLD", response.data)
      yield put({ type: "SET_HOUSEHOLD_NAMES", payload: response.data})
  }catch (error) {
      console.error("ERROR in store  FOR HOUSEHOLD NAMES GET:", error);
    }
}

function* createHousehold(action){
    // console.log("this sis the ACTION PAYLOAD", action.payload);
      try { yield axios.post(`/api/household`, action.payload);
      yield put({type: "FETCH_HOUSEHOLD"})} catch(error) {
        console.error("ERROR in store POST:", error);
      }
    } 


    //For user joining a pre-existing household with household pass key
    function* joinHousehold(action){
      // console.log("this sis the ACTION PAYLOAD", action.payload);
        try { yield axios.post(`/api/household/code`, action.payload);
        yield put({type: "FETCH_HOUSEHOLD"})} catch(error) {
          console.error("ERROR in store POST:", error);
        }
      } 

      function* removeHousehold(action) {
        try {yield axios.delete(`/api/household/${action.payload}`);
        // console.log("this is the payload",action.payload);
        yield put({ type: "FETCH_HOUSEHOLD" })}catch(error) {
          console.error("ERROR in store removing:", error);
        }
      }

      function* updateHousehold(action) {
        console.log("this is the payload for updating household", action.payload.id);
        try {yield axios.put(`/api/household/update-household/${action.payload.id}`,  action.payload);
        yield put({ type: "FETCH_HOUSEHOLD" })}catch(error) {
          console.error("ERROR in store Updating:", error);
        }
      }

function* householdSaga() {
    yield takeEvery("FETCH_HOUSEHOLD", getHousehold);
    yield takeEvery("CREATE_HOUSEHOLD", createHousehold);
    yield takeEvery("JOIN_HOUSEHOLD", joinHousehold);
    yield takeEvery("DELETE_HOUSEHOLD", removeHousehold);
    yield takeEvery("GET_ALL_NAMES", getHouseholdName);
    yield takeEvery("UPDATE_HOUSEHOLD", updateHousehold);
  }

  export default householdSaga;