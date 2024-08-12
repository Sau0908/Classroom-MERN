import Classroom from "../models/Classroom.js";

export const createClassroom = async (req, res) => {
  try {
    const { classroomName, startTime, endTime, days } = req.body;

    const classroom = new Classroom({
      name: classroomName,
      startTime: startTime,
      endTime: endTime,
      days: days,
    });

    await classroom.save();
    res.status(201).json({ message: "Classroom created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const getAllClassroom = async (req, res) => {
  try {
    const classrooms = await Classroom.aggregate([
      {
        $group: {
          _id: "$name",
          classrooms: { $push: "$$ROOT" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json(classrooms);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const assignTeacherToClassroom = async (req, res) => {
  const { classroomId, teacherId } = req.body;

  try {
    const classroom = await Classroom.findById(classroomId);

    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    classroom.teacherId = teacherId;

    await classroom.save();

    return res.status(200).json({
      message: "Teacher assigned successfully",
      classroom,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while assigning the teacher",
      error: error.message,
    });
  }
};
