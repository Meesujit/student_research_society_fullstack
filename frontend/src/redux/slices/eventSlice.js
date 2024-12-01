import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// const API_URL = 'http://localhost:5000/api/events';

import API from '../../api/api'
import { thunk } from 'redux-thunk';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, thunkAPI) => {
  try {
    const response = await API.get('/api/events');
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message || 'An error occurred');
  }
});

export const createEvent = createAsyncThunk('events/createEvent', async (data, thunkAPI) => {
  try {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage (or wherever you store it)
    
    const response = await API.post('/api/events/create', data, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      },
    });

    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message || 'An error occurred');
  }
});

export const participateInEvent = createAsyncThunk('events/participateInEvent', async (eventId, thunkAPI) => {
  try {
    const response = await API.post(`/api/events/participate/${eventId}`);
    // console.log(response.data);
    thunkAPI.dispatch(fetchEvents());
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message || 'An error occurred');
  }
});

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(participateInEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(participateInEvent.fulfilled, (state, action) => {
        state.loading = false;
        const eventIndex = state.list.findIndex((event) => event._id === action.payload._id);
        if (eventIndex !== -1) {
          state.list[eventIndex] = action.payload;
        }
        
      })
      .addCase(participateInEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
