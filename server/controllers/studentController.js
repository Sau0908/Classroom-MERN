import User from "../models/User.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "Student" });

    if (!students.length) {
      return res.status(404).json({ message: "No students found" });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedStudent = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await User.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllStudentsByGrade = async (req, res) => {
  try {
    const students = await User.aggregate([
      {
        $match: { role: "Student" },
      },
      {
        $group: {
          _id: "$grade",
          students: { $push: "$$ROOT" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const assignTeacherToStudent = async (req, res) => {
  const { studentId, teacherId } = req.body;

  try {
    const student = await User.findById(studentId);

    if (!student || student.role !== "Student") {
      return res
        .status(404)
        .json({ message: "Student not found or invalid role" });
    }

    const teacher = await User.findById(teacherId);

    if (!teacher || teacher.role !== "Teacher") {
      return res
        .status(404)
        .json({ message: "Teacher not found or invalid role" });
    }

    student.assignTeacherId = teacherId;

    await student.save();

    res.status(200).json(student);
  } catch (error) {
    console.error("Error assigning teacher to student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
