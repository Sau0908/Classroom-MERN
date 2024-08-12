import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const CreateEditStudent = ({
  open,
  onClose,
  isEditing,
  student,
  onSave,
  onChange,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEditing ? "Edit Student" : "Create Student"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={student.name}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Grade"
          name="grade"
          value={student.grade}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Email"
          name="email"
          value={student.email}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          disabled={isEditing}
        />
        {!isEditing && (
          <TextField
            label="Password"
            name="password"
            type="password"
            value={student.password}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          {isEditing ? "Save Changes" : "Create Student"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEditStudent;
