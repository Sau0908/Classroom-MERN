import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodeData = jwt.verify(token, process.env.JWT_SECRET || "test");
    req.userId = decodeData?.id;
    req.userEmail = decodeData?.email;
    req.userRole = decodeData?.role;

    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};
const isPrincipal = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodeData = jwt.verify(token, process.env.JWT_SECRET || "test");

    req.userRole = decodeData?.role;

    if (req.userRole === "Principal") {
      next();
    } else {
      res
        .status(403)
        .json({ message: "Access Denied. You are not a Principal." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const isForStudent = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodeData = jwt.verify(token, process.env.JWT_SECRET || "test");

    req.userRole = decodeData?.role;
    if (req.userRole === "Teacher" || req.userRole === "Principal") {
      next();
    } else {
      res.status(403).json({
        message: "Access Denied. You are not a Teacher nor a Principal",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { auth, isPrincipal, isForStudent };
