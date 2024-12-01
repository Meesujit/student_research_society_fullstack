import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/auth';

import API from '../../api/api'
// Login
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await API.post('/api/auth/login', credentials); // Use API instance
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Login failed');
  }
});

// Signup
export const signup = createAsyncThunk('auth/signup', async (userData, thunkAPI) => {
  try {
    const response = await API.post('/api/auth/signup', userData); // Use API instance
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Signup failed');
  }
});

// Fetch User Profile
export const userProfile = createAsyncThunk('auth/getProfile', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.token; // Retrieve token from state

    // Ensure token exists
    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }

    // The interceptor automatically adds the token; no need to pass it manually
    const response = await API.get('/api/auth/profile');
    return response.data.profile; // Assuming 'profile' is the key in response
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Fetching profile failed');
  }
});
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    profile: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.profile = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder

      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;  // Save the token from the login response
        localStorage.setItem('token', action.payload.token);  // Optionally save to localStorage
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get profile
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
