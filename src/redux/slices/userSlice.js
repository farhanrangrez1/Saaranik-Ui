import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import { apiUrl } from '../../redux/utils/config';
import { decryptToken } from '../../Protecuted/decode';

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


export const SingleUser = createAsyncThunk(
  'ProjectJob/fetchMyJobs',
  async (Status, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('encode');

      if (!token) {
        return rejectWithValue("Token or IV is missing in localStorage");
      }
      const decryptedToken = decryptToken(token);  
      //  console.log("Decrypted Token:", decryptedToken);

      const tokenParts = decryptedToken.split('.');
      if (tokenParts.length !== 3) {
        return rejectWithValue("Invalid token format");
      }
      const decodedPayload = JSON.parse(atob(tokenParts[1]));
       const userId = decodedPayload.id;
      // console.log("Decoded Payload:", decodedPayload);
    
      // Construct the URL with the user ID and Status
      const response = await axiosInstance.get(
        `${apiUrl}/user/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error occurred while fetching jobs:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const ResetPasswordThunk = createAsyncThunk(
  'user/ResetPassword',
  async ({ token, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${apiUrl}/user/resetPassword`,
        {
          token,
          newPassword,
          confirmPassword
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error occurred while resetting password:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Thunk
export const forgotPasswordThunk = createAsyncThunk(
  'user/ForgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${apiUrl}/user/forgotPassword`,
        { email }
      );
      return response.data;
    } catch (error) {
      console.error("Error occurred while resetting password:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userAll: [],
    UserSingle:[],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

         .addCase(SingleUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SingleUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.UserSingle = action.payload;
      })
      .addCase(SingleUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      
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
