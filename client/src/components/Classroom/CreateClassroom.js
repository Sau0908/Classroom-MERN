import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { formatTime } from "../utils/constant";
import { useDispatch } from "react-redux";
import { createClassroom } from "../features/classroomSlice";
import Swal from "sweetalert2";

const CreateClassroom = () => {
  const [classroomName, setClassroomName] = useState("");
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const [days, setDays] = useState([]);
  const dispatch = useDispatch();

  const dayOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const classroomData = {
      classroomName,
      startTime: formatTime(startTime),
      endTime: formatTime(endTime),
      days,
    };

    dispatch(createClassroom(classroomData))
      .then(() => {
        Swal.fire("Success", "Classroom Created", "success");
      })
      .catch(() => {
        Swal.fire("Error", " Failed to Create Classroom", "error");
      });
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Create a Classroom</h2>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <TextField
          label="Classroom Name"
          variant="outlined"
          fullWidth
          value={classroomName}
          onChange={(e) => setClassroomName(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </div>

        <FormControl fullWidth variant="outlined">
          <InputLabel>Days</InputLabel>
          <Select
            label="Days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            multiple
          >
            {dayOptions.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="success">
          Create Classroom
        </Button>
      </form>
    </div>
  );
};

export default CreateClassroom;
