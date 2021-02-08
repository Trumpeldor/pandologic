import { combineReducers, createStore } from "redux";
import jobs from "./reducers/jobs";

export default createStore(combineReducers({
  jobs
}));
