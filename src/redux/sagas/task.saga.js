import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getTasksSaga() {
  try {
    const response = yield axios.get("api/tasks");
    yield put({ type: "SET_TASKS", payload: response.data });
  } catch (error) {
    console.error("ERROR in store GET:", error);
  }
}

function* removeTask(action) {
  try {yield axios.delete(`/api/tasks/${action.payload}`);
  console.log("this is the payload",action.payload);
  yield put({ type: "FETCH_TASKS" })}catch(error) {
    console.error("ERROR in store removing:", error);
  }
}

function* editTask(action){
  console.log("action.payload is:", action.payload);
  try {yield axios.put(`/api/tasks/${action.payload.id.id}`, action.payload);
        yield put({type: "FETCH_TASKS"});
}catch(error) {
    console.error("ERROR in store editing:", error);
  }
}

function* createTask(action){
  try { yield axios.post(`/api/tasks/`, action.payload);
  yield put({type: "FETCH_TASKS"})} catch(error) {
    console.error("ERROR in store POST:", error);
  }
} 

function* tasksSaga() {
  yield takeEvery("FETCH_TASKS", getTasksSaga);
  yield takeEvery("DELETE_TASK", removeTask);
  yield takeEvery("CREATE_TASK", createTask);
  yield takeEvery("EDIT_TASK", editTask);
}

export default tasksSaga;
