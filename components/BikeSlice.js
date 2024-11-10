import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk để lấy dữ liệu từ API
export const fetchBikes = createAsyncThunk('bikes/fetchBikes', async () => {
  const response = await axios.get('https://673017fa66e42ceaf15f533a.mockapi.io/Bikes');
  return response.data;
});

const bikeSlice = createSlice({
  name: 'bikes',
  initialState: {
    items: [],
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBikes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBikes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBikes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default bikeSlice.reducer;
