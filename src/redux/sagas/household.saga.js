import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getHousehold(){
    try{
        const response = yield axios.get('api/household');
        console.log("response.data", response.data)
        yield put({ type: "SET_HOUSEHOLD", payload: response.data})
    }catch (error) {
        console.error("ERROR in store GET:", error);
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

function* householdSaga() {
    yield takeEvery("FETCH_HOUSEHOLD", getHousehold);
    yield takeEvery("CREATE_HOUSEHOLD", createHousehold);
    yield takeEvery("JOIN_HOUSEHOLD", joinHousehold);
  }

  export default householdSaga;