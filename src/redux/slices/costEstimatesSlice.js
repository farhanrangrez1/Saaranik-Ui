import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import { apiUrl } from '../../redux/utils/config';


export const fetchCostEstimates = createAsyncThunk(
  'costEstimates/fetchCostEstimates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/costEstimates`);
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createCostEstimate = createAsyncThunk(
  'costEstimates/createCostEstimate',
  async (submissionData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${apiUrl}/costEstimates`,
        submissionData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const deleteCostEstimate = createAsyncThunk(
  'costEstimates/deleteCostEstimate',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${apiUrl}/jobs/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const fetchCostEstimateById = createAsyncThunk('costEstimates/fetchById', async (id) => {
    const response = await fetch(`/api/jobs/${id}`);
    if (!response.ok) throw new Error("Failed to fetch job");
    return await response.json();
  });

  export const updateCostEstimate = createAsyncThunk('costEstimates/updatejob', async ({ id, data }) => {
    const response = await fetch(`/api/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update job");
    return await response.json();
  });
  

const costEstimatesSlice = createSlice({
  name: 'costEstimates',
  initialState: {
    estimates: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
     .addCase(fetchCostEstimates.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchCostEstimates.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.estimates = action.payload;
          })
          .addCase(fetchCostEstimates.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          })
    //   .addCase(fetchjobs.pending, (state) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(fetchjobs.fulfilled, (state, action) => {
    //     state.status = 'succeeded';
    //     state.estimates = action.payload;
    //   })
    //   .addCase(fetchjobs.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.payload;
    //   });
  },
});

export default costEstimatesSlice.reducer;
