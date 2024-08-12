import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Principal", "Teacher", "Student"],
      required: true,
    },
    name: { type: String, required: true },

    grade: { type: String },
    parentContact: { type: String },
    assignTeacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    classroomId: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom" },

    subjectSpecialization: { type: String },
    experience: { type: Number },
    classroomIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classroom" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
