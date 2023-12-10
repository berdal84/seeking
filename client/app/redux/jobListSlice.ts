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

type FetchPagePayload = {offset: number, limit: number, concat?: boolean}

export const fetchPage = createAsyncThunk<schemas.JobPage,FetchPagePayload>(
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
        return {
          ...state,
          status: 'pending',
          error: null
        }
      })
      .addCase(fetchPage.fulfilled, (state, action) => {
        const {payload, meta: { arg }} = action;
        return {
          ...state,
          items: arg.concat ? state.items.concat(payload.item) : payload.item,
          offset: arg.offset,
          limit: arg.limit,
          item_total_count: payload.item_total_count,
          page: Math.ceil(arg.offset / arg.limit),
          status: 'fulfilled',
          error: null,
        }
      })
      .addCase(fetchPage.rejected, (state, action) => {
        return {
          ...state,
          error: `Unable to fetch page!`,
          details: JSON.stringify(action),
          status: 'error',
        }
      })
  }
})

export const { selectJob } = jobListSlice.actions
export const jobList = (state: RootState) => state.jobList
export default jobListSlice.reducer
