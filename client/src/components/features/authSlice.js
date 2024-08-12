import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await axios.post(
    "https://classroom-mern-rdnf.vercel.app/api/users/login",
    credentials
  );

  return response.data;
});

export const createTeacher = createAsyncThunk(
  "auth/createTeacher",
  async (teacherData, { getState }) => {
    const token = getState().auth.token;

    const response = await axios.post(
      "https://classroom-mern-rdnf.vercel.app/api/users/createTeacher",
      teacherData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);

export const createStudent = createAsyncThunk(
  "auth/createStudent",
  async (studentData, { getState }) => {
    const token = getState().auth.token;

    const response = await axios.post(
      "https://classroom-mern-rdnf.vercel.app/api/users/createStudent",
      studentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: null,
    email: null,
    role: null,
    token: null,
    isAuthenticated: false,
    status: "idle",
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      const { email, token, role, id } = action.payload;

      state.id = id;
      state.email = email;
      state.role = role;
      state.token = token;
      state.isAuthenticated = true;
      state.status = "succeeded";
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.id = user._id;
        state.email = user.email;
        state.role = user.role;
        state.token = token;
        state.isAuthenticated = true;
        const userData = {
          email: user.email,
          token: token,
          role: user.role,
          id: user._id,
        };
        localStorage.setItem("Profile", JSON.stringify(userData));
        state.status = "succeeded";
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(createTeacher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createTeacher.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(createStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      });
  },
});

export const { logout, addUser } = authSlice.actions;
export default authSlice.reducer;
