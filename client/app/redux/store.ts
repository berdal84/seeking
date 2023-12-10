import { configureStore } from '@reduxjs/toolkit'
import {jobListSlice} from "./jobListSlice";

export const store = configureStore({
  reducer: {
    jobList: jobListSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch