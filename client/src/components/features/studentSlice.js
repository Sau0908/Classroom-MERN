import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  students: [],
  studentGrouped: [],
  status: "idle",
  error: null,
};

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    try {
      const response = await axios.get("https://classroom-mern-rdnf.vercel.app/api/student");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchStudentGrouped = createAsyncThunk(
  "students/fetchStudentGrouped",
  async () => {
    try {
      const response = await axios.get(
        "https://classroom-mern-rdnf.vercel.app/api/student/grouped"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async (student, { getState }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.put(
        `https://classroom-mern-rdnf.vercel.app/api/student/${student.id}`,
        student,
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

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id, { getState }) => {
    const token = getState().auth.token;
    try {
      await axios.delete(`https://classroom-mern-rdnf.vercel.app/api/student/${id}`, {
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

export const assignTeacherToStudent = createAsyncThunk(
  "principal/assignTeacherToStudent",
  async ({ studentId, teacherId }, { dispatch }, { getState }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.post(
        "https://classroom-mern-rdnf.vercel.app/api/student/assignteacher",
        { studentId, teacherId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchStudentGrouped());

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const updatedStudent = action.payload;
        const existingStudent = state.students.find(
          (student) => student._id === updatedStudent._id
        );
        if (existingStudent) {
          Object.assign(existingStudent, updatedStudent);
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (student) => student._id !== action.payload
        );
      })
      .addCase(fetchStudentGrouped.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentGrouped.fulfilled, (state, action) => {
        state.studentGrouped = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchStudentGrouped.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(assignTeacherToStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(assignTeacherToStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(assignTeacherToStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default studentSlice.reducer;
