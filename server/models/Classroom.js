import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    days: { type: [String], required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Classroom", classroomSchema);
