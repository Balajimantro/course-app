const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const auth = require("../middleware/auth.middleware");

router.post("/createCourse",auth, courseController.createCourse);
router.get("/getCourseById",auth, courseController.getCoursesByUser);

router.get("/getAllCourses", auth, courseController.getCourses);
router.put("/updateCourse/:id", auth, courseController.updateCourse);
router.delete("/deleteCourse/:id", auth, courseController.deleteCourse);

module.exports = router;
