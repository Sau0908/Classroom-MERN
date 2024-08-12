import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createClassroom = createAsyncThunk(
  "classrooms/createClassroom",
  async (classroomData, { getState }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.post(
        "https://classroom-mern-rdnf.vercel.app/api/classroom",
        classroomData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchClassrooms = createAsyncThunk(
  "classroom/fetchClassrooms",
  async ({ getState }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.get("https://classroom-mern-rdnf.vercel.app/api/classroom", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const assignTeacherToClassroom = createAsyncThunk(
  "classroom/assignTeacher",
  async ({ classroomId, teacherId }, { dispatch }, { getState }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.post(
        "https://classroom-mern-rdnf.vercel.app/api/classroom/assignteacher",
        { classroomId, teacherId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchClassrooms());
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  classrooms: [],
  isLoading: false,
  error: null,
};

const classroomSlice = createSlice({
  name: "classrooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createClassroom.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createClassroom.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createClassroom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchClassrooms.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchClassrooms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.classrooms = action.payload;
    });
    builder.addCase(fetchClassrooms.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(assignTeacherToClassroom.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(assignTeacherToClassroom.fulfilled, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(assignTeacherToClassroom.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.error.message;
    });
  },
});

export default classroomSlice.reducer;
