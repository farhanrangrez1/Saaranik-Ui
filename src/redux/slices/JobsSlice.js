import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import { apiUrl } from '../../redux/utils/config';


export const fetchjobs = createAsyncThunk(
  'job/fetchjobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/jobs`);
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createjob = createAsyncThunk(
  'job/createjob',
  async (submissionData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${apiUrl}/jobs`,
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


export const deletejob = createAsyncThunk(
  'job/deletejob',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${apiUrl}/jobs/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const fetchjobById = createAsyncThunk('jobs/fetchById', async (id) => {
    const response = await fetch(`/api/jobs/${id}`);
    if (!response.ok) throw new Error("Failed to fetch job");
    return await response.json();
  });

  export const updatejob = createAsyncThunk('jobs/updatejob', async ({ id, data }) => {
    const response = await fetch(`/api/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update job");
    return await response.json();
  });
  

export const UpdateJobAssign = createAsyncThunk('jobs/updatejob', async ({ id, assign }) => {
  const response = await fetch(`${apiUrl}/jobs`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, assign }),  // Ensure 'ids' and 'assign' are passed here
  });

  if (!response.ok) throw new Error("Failed to update jobs");

  return await response.json();
});


const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    job: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
          // Add
        //   .addCase(createjob.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        //   })
        //   .addCase(createjob.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.job.push(action.payload);
        //   })
        //   .addCase(createjob.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        //   })
      .addCase(fetchjobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchjobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.job = action.payload;
      })
      .addCase(fetchjobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
    //   .addCase(createjob.fulfilled, (state, action) => {
    //     state.job.push(action.payload);
    //   })
    //   .addCase(createjob.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.payload;
    //   })
    //   .addCase(deletejob.fulfilled, (state, action) => {
    //     state.job = state.job.filter(
    //       (job) => job.id !== action.payload
    //     );
    //   })
    //   .addCase(deletejob.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.payload;
    //   })

    //   .addCase(updatejob.fulfilled, (state, action) => {
    //     const index = state.job.findIndex(
    //       (job) => job.id === action.payload.id
    //     );
    //     if (index !== -1) {
    //       state.job[index] = action.payload; 
    //     }
    //   })
    //   .addCase(updatejob.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.payload;
    //   });
  },
});

export default jobsSlice.reducer;
