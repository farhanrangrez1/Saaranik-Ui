// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import ProjectsReducer from './slices/ProjectsSlice';
import jobsReducer from "./slices/JobsSlice"


export const store = configureStore({
  reducer: {
    projects:ProjectsReducer,
    jobs:jobsReducer
}
});
