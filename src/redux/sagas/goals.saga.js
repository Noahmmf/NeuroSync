import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getGoalsSaga(){
  try{
    const response = yield axios.get("api/goals");
    yield put({type: "SET_GOALS", payload: response.data});
  }catch (error) {
    console.error("ERROR in store GET:", error);
  }
}

function* goalsSaga(){
    yield takeEvery("FETCH_GOALS", getGoalsSaga);
}

export default goalsSaga;