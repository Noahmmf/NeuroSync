import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getGoalsSaga() {
  try {
    const response = yield axios.get("api/goals");
    yield put({ type: "SET_GOALS", payload: response.data });
  } catch (error) {
    console.error("ERROR in store GET:", error);
  }
}

function* removeGoal(action) {
  try {yield axios.delete(`/api/goals/${action.payload}`);
  yield put({ type: "FETCH_GOALS" })}catch(error) {
    console.error("ERROR in store removing:", error);
  }
}

function* editGoal(action){
  try {yield axios.put(`/api/goals/${action.payload}`);
  yield put({type: "FETCH_GOALS"})}catch(error) {
    console.error("ERROR in store editing:", error);
  }
}

function* createGoal(action){
  yield axios.post(`/api/goals/`, action.payload);
  yield put({type: "FETCH_GOALS"}) catch(error) {
    console.error("ERROR in store POST:", error);
  }
} 

function* goalsSaga() {
  yield takeEvery("FETCH_GOALS", getGoalsSaga);
  yield takeEvery("DELETE_GOAL", removeGoal);
}

export default goalsSaga;
