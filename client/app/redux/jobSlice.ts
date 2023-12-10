import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from './store'
import {schemas} from "@/app/typings/schemas";
import {SeekingAPI} from "@/app/utilities/seeking-api";

export type CounterState = {
  items: Array<schemas.Job>;
  isLoading: boolean;
  item_total_count: number;
  limit: number;
  offset: number;
  error: string | null;
}

const initialState: CounterState = {
  items: [],
  isLoading: false,
  item_total_count: 0,
  limit: 10,
  offset: 0,
  error: null,
}

type FetchPageAction = {offset: number, limit: number, clearCache?: boolean}

export const fetchPage = createAsyncThunk<schemas.JobPage,FetchPageAction>(
  'jots/fetchPage',
  async ({offset, limit}) => {
  return await SeekingAPI.getJobPage(offset, limit)
})

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    resetState: (state) => {
      state = initialState
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPage.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchPage.fulfilled, (state, action) => {

        const { clearCache, offset, limit } = action.meta.arg;

        if ( clearCache ) {
          state.items = action.payload.item
        } else {
          state.items = state.items.concat(action.payload.item)
        }

        state.offset = offset
        state.limit = limit
        state.item_total_count = action.payload.item_total_count
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchPage.rejected, (state, action) => {
        state.error = JSON.stringify(action)
        state.isLoading = false
      })
  }
})

export const { resetState } = jobSlice.actions
export const job = (state: RootState) => state.job
export default jobSlice.reducer