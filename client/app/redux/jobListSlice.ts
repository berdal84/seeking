import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type { RootState } from './store'
import {schemas} from "@/app/typings/schemas";
import {SeekingAPI} from "@/app/utilities/seeking-api";
import {State} from "@/app/typings/state";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";

export type JobListState = {
  items: Array<schemas.Job>;
  item_total_count: number;
  limit: number;
  selected: schemas.Job | null;
  offset: number;
  page: number;
}

const initialState: State<JobListState> = {
  items: [],
  item_total_count: 0,
  limit: 10,
  offset: 0,
  page: 0,
  selected: null,
  status: 'idle',
  error: null,
}

type FetchPageAction = {offset: number, limit: number, concat?: boolean}

export const fetchPage = createAsyncThunk<schemas.JobPage,FetchPageAction>(
  'jobList/fetchPage',
  async ({offset, limit}) => {
  return await SeekingAPI.getJobPage(offset, limit)
})

export const jobListSlice = createSlice({
  name: 'jobList',
  initialState,
  reducers: {
    selectJob: (state,  action: PayloadAction<schemas.Job | null> ) => {
      state.selected = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPage.pending, (state, action) => {
        state.status = 'pending'
        state.error = null
      })
      .addCase(fetchPage.fulfilled, (state, action) => {
        const {payload, meta: { arg }} = action;
        state.items = arg.concat ? state.items.concat(payload.item) : payload.item;
        state.offset = arg.offset;
        state.limit = arg.limit;
        state.item_total_count = payload.item_total_count;
        state.page = Math.ceil(arg.offset / arg.limit);
        state.status = 'fulfilled'
        state.error = null;
      })
      .addCase(fetchPage.rejected, (state, action) => {

        state.error = `Unable to fetch job page!`
        state.details = JSON.stringify(action)
        state.status = 'error'
      })
  }
})

export const { selectJob } = jobListSlice.actions
export const jobList = (state: RootState) => state.jobList
export default jobListSlice.reducer
