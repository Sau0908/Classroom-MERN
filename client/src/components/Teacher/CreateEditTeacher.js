import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const CreateEditTeacher = ({
  open,
  onClose,
  isEditing,
  teacher,
  onSave,
  onChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEditing ? "Edit Teacher" : "Create Teacher"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="dense"
          value={teacher.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
        <TextField
          label="Subject"
          variant="outlined"
          fullWidth
          margin="dense"
          value={teacher.subject}
          onChange={(e) => onChange("subject", e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="dense"
          value={teacher.email}
          onChange={(e) => onChange("email", e.target.value)}
        />

        {!isEditing && (
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="dense"
            type="password"
            value={teacher.password}
            onChange={(e) => onChange("password", e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEditTeacher;
