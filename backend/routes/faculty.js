const express = require("express");
const router = express.Router();
const {
  facultyCourseDetails,
  facultyTimetable,
  bookSlot,
  cancelledSlot,
  getCourseStudentsTimeTable,
  generateStudentAllotedCourses,
} = require("../controllers/faculty");

router.post("/getFacultyCD", facultyCourseDetails);
router.post("/getFacultyTT", facultyTimetable);
router.post("/bookSlot", bookSlot);
router.post("/cancelledSlot", cancelledSlot);
router.post("/getCourseStudentsTimeTable", getCourseStudentsTimeTable);
router.post("/generateStudentAllotedCourses", generateStudentAllotedCourses);

module.exports = router;
