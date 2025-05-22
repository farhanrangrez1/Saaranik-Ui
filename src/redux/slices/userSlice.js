import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import { apiUrl } from '../../redux/utils/config';


export const fetchusers = createAsyncThunk(
  'userAll/fetchusers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/user/getAllUsers`);
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const usersLogin = createAsyncThunk(
  'users/createusers',
  async (submissionData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${apiUrl}/user/login`,);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteusers = createAsyncThunk(
  'users/deleteusers',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${apiUrl}/user/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// 
export const fetchusersById = createAsyncThunk('user/fetchById', async (id) => {
  const response = await patch(`${apiUrl}/user/${id}`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return await response.json();
});

export const updateusers = createAsyncThunk('user/updateusers', async ({ id, data }) => {
  const response = await fetch(`/user/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update users");
  return await response.json();
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userAll: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add
      //   .addCase(createusers.pending, (state) => {
      //     state.loading = true;
      //     state.error = null;
      //   })
      //   .addCase(createusers.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.users.push(action.payload);
      //   })
      //   .addCase(createusers.rejected, (state, action) => {
      //     state.loading = false;
      //     state.error = action.payload;
      //   })
      .addCase(fetchusers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchusers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userAll = action.payload;
      })
      .addCase(fetchusers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
    //   .addCase(createusers.fulfilled, (state, action) => {
    //     state.users.push(action.payload);
    //   })
    //   .addCase(createusers.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.payload;
    //   })
    //   .addCase(deleteusers.fulfilled, (state, action) => {
    //     state.users = state.users.filter(
    //       (users) => users.id !== action.payload
    //     );
    //   })
    //   .addCase(deleteusers.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.payload;
    //   })

    //   .addCase(updateusers.fulfilled, (state, action) => {
    //     const index = state.users.findIndex(
    //       (users) => users.id === action.payload.id
    //     );
    //     if (index !== -1) {
    //       state.users[index] = action.payload; 
    //     }
    //   })
    //   .addCase(updateusers.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.payload;
    //   });
  },
});

export default userSlice.reducer;
