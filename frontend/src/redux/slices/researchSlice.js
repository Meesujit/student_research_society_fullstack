import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


import API from '../../api/api'

export const fetchResearches = createAsyncThunk(
  'research/fetchResearches',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    try {
      const response = await API.get('/api/research', {
        headers: {
          'x-auth-token': token,
        }
      });
      localStorage.setItem('research', JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const submitResearch = createAsyncThunk(
  'research/submitResearch',
  async (formData, thunkAPI) => {
    try {
      const response = await API.post('/api/research/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Return the data from the response
    } catch (err) {
      console.error('Error submitting research:', err);
      // Ensure err.response.data exists before returning
      return thunkAPI.rejectWithValue(err.response?.data || { message: 'Unknown error occurred' });
    }
  }
);


export const approveResearch = createAsyncThunk(
  'research/approveResearch',
  async (id, thunkAPI) => {
    const token = localStorage.getItem('token');
    try {
      const response = await API.put(`/api/research/approve/${id}`, {}, {
        headers: {
          'x-auth-token': token, // Ensure the token is sent in the headers
        }
      });
      return response.data; // Return the updated research
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: 'Failed to approve research' });
    }
  }
);





export const deleteResearch = createAsyncThunk(
  'research/deleteResearch',
  async (id, thunkAPI) => {
    try {
      const response = await API.delete(`/api/research/${id}`);
      return response.data; // Return the deleted research data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);



const researchSlice = createSlice({
  name: 'research',
  initialState: {
    list: JSON.parse(localStorage.getItem('researches')) || [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResearches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResearches.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        localStorage.setItem('research', JSON.stringify(action.payload));
      })
      .addCase(fetchResearches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitResearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitResearch.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(submitResearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveResearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveResearch.fulfilled, (state, action) => {
        state.loading = false;
        // Update the status of the research paper to "approved" in the list
        const updatedResearch = action.payload;
        state.list = state.list.map((research) =>
          research._id === updatedResearch._id ? updatedResearch : research
        );
      })
      .addCase(approveResearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteResearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteResearch.fulfilled, (state, action) => {
        state.list = state.list.filter((research) => research._id !== action.payload._id);
      })
      .addCase(deleteResearch.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});


export default researchSlice.reducer;
