import { Reducer, combineReducers } from "@reduxjs/toolkit";
import TaskReducer from "./features/task/TaskSlice";

const rootReducer: Reducer = combineReducers({
  tasks: TaskReducer,
});

export default rootReducer;
