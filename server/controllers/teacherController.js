import User from "../models/User.js";

export const getAllTeacher = async (req, res) => {
  try {
    const teachers = await User.find({ role: "Teacher" });

    if (!teachers.length) {
      return res.status(404).json({ message: "No teachers found" });
    }

    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTeacher = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.error("Error updating teacher:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTeacher = await User.findByIdAndDelete(id);

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    res.status(500).json({ message: "Server error" });
  }
};
