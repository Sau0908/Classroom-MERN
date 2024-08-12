import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  teachers: [],
  status: "idle",
  error: null,
};

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/teacher");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateTeacher = createAsyncThunk(
  "teachers/updateTeacher",
  async (teacher, { getState }) => {
    const token = getState().auth.token;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/teacher/${teacher.id}`,
        teacher,
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

export const deleteTeacher = createAsyncThunk(
  "teachers/deleteTeacher",
  async (id, { getState }) => {
    const token = getState().auth.token;
    try {
      await axios.delete(`http://localhost:5000/api/teacher/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      throw error;
    }
  }
);

const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.teachers = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        const updatedTeacher = action.payload;
        const existingTeacher = state.teachers.find(
          (teacher) => teacher._id === updatedTeacher._id
        );
        if (existingTeacher) {
          Object.assign(existingTeacher, updatedTeacher);
        }
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.teachers = state.teachers.filter(
          (teacher) => teacher._id !== action.payload
        );
      });
  },
});

export default teacherSlice.reducer;
