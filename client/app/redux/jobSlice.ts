import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import {schemas} from "@/app/typings/schemas";
import {SeekingAPI} from "@/app/utilities/seeking-api";

export interface CounterState {
  items: Array<schemas.Job>,
  isLoading: boolean,
  item_total_count: number,
  limit: number,
  offset: number,
}

const initialState: CounterState = {
  items: [],
  isLoading: false,
  item_total_count: 0,
  limit: 10,
  offset: 0,
}

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearCache: (state) => {
      state.items = []
      state.isLoading = false
      state.offset = 0
    },
    loading:  (state, action: PayloadAction<{ isLoading: boolean}>) => {
      state.isLoading = action.payload.isLoading
    },
    addPage: (state, action: PayloadAction<schemas.JobPage>) => {
      const page = action.payload
      state.items = page.item
    }
  }
})

export const { addPage, clearCache, loading } = jobSlice.actions
export const job = (state: RootState) => state.job
export default jobSlice.reducer