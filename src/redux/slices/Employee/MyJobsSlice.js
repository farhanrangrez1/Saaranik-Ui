import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { apiUrl } from '../../../redux/utils/config';


export const Project_job_Id = createAsyncThunk(
 'job/Project_job_Id',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/MyJobs/${id}`);
      console.log("respos",response.data);
      
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchMyJobs = createAsyncThunk(
  'ProjectJob/fetchMyJobs',
  async (Status, { rejectWithValue }) => {
    try {
      const authResponse = JSON.parse(localStorage.getItem('authResponse'));

      const userId = authResponse?.user?._id;

      if (!userId) {
        return rejectWithValue("User ID is missing in authResponse");
      }

      // Construct the URL with the user ID and Status
      const response = await axiosInstance.get(
        `${apiUrl}/AssignmentJob/getbyid/${userId}`
      );

      return response.data;
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
        `${apiUrl}/MyJobs`,
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
      await axiosInstance.delete(`${apiUrl}/MyJobs/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Update Job
export const updatejob = createAsyncThunk('MyJobs/updatejob', async ({ id, data }, thunkAPI) => {
  try {
    const response = await fetch(`${apiUrl}/MyJobs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text(); 
      throw new Error(`Failed to update job: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

  // Assign Job
export const UpdateJobAssign = createAsyncThunk('MyJobs/updatejob', async ({ id, assign }) => {
  const response = await fetch(`${apiUrl}/MyJobs/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, assign }),  
  });

  if (!response.ok) throw new Error("Failed to update MyJobs");

  return await response.json();
});


const MyJobsSlice = createSlice({
  name: 'MyJobs',
  initialState: {
    myjobs: [],
    ProjectJob: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Project_job_Id
      .addCase(Project_job_Id.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(Project_job_Id.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ProjectJob = action.payload;
      })
      .addCase(Project_job_Id.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
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
      .addCase(fetchMyJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.myjobs = action.payload;
      })
      .addCase(fetchMyJobs.rejected, (state, action) => {
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

export default MyJobsSlice.reducer;
