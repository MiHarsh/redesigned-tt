const db = require("../config/firebase-config").getDB();
const {
  parseCourseDetails,
  parseTimetable,
  formatSlot,
  parseClass,
  cancelClass,
} = require("../helpers/utils");

// @route POST /api/getFacultyCD
// @desc returns the faculty course details
// @access PRIVATE

exports.facultyCourseDetails = async (req, res, next) => {
  try {
    const facultyPromise = await db
      .ref("facultyDetails/" + req.body.alias)
      .once("value");
    const faculty = facultyPromise.val();

    if (!faculty) {
      const error = new Error(
        "Sorry, no faculty exists with this alias, please contact your admin"
      );
      error.statusCode = 401;
      return next(error);
    }
    const coursePromise = await db.ref("courseDetails").once("value");
    const courses = coursePromise.val();
    const result = parseCourseDetails(faculty, courses);

    res.status(200).json(result);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// @route POST /api/getFacultyTT
// @desc returns the faculty timetable
// @access PRIVATE

exports.facultyTimetable = async (req, res, next) => {
  try {
    const facultyPromise = await db
      .ref("facultyDetails/" + req.body.alias)
      .once("value");
    const faculty = facultyPromise.val();

    if (!faculty) {
      const error = new Error(
        "Sorry, no faculty exists with this alias, please contact your admin"
      );
      error.statusCode = 401;
      return next(error);
    }

    const coursePromise = await db.ref("courseDetails").once("value");
    const courses = coursePromise.val();

    const result = parseTimetable(faculty, courses, req.body.courseID);

    res.status(200).json(result);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// @route POST /api/bookSlot
// @desc books the slot
// @access PRIVATE

exports.bookSlot = async (req, res, next) => {
  try {
    let newSlot = formatSlot(req.body.startTime, req.body.endTime);

    const coursePromise = await db
      .ref("courseDetails/" + req.body.subCode)
      .once("value");
    const course = coursePromise.val();

    if (!course) {
      const error = new Error(
        "Subject code not found, enter a valid code or contact your admin"
      );
      error.statusCode = 404;
      return next(error);
    }

    let booked = [];

    if (course.booked_slots && course.booked_slots != "") {
      booked = course.booked_slots;
    }

    booked.push(newSlot);

    await db
      .ref("courseDetails/" + req.body.subCode + "/booked_slots")
      .set(booked);

    res.status(200).json({ message: "Successfully booked the Slot" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// @route POST /api/cancelledSlot
// @desc cancels the slot
// @access PRIVATE

exports.cancelledSlot = async (req, res, next) => {
  try {
    let newSlot = formatSlot(req.body.startTime, req.body.endTime);

    const coursePromise = await db
      .ref("courseDetails/" + req.body.subCode)
      .once("value");
    const course = coursePromise.val();

    if (!course) {
      const error = new Error(
        "Subject code not found, enter a valid code or contact your admin"
      );
      error.statusCode = 404;
      return next(error);
    }

    let cancelled = [];

    if (course.cancelled_slots && course.cancelled_slots != "") {
      cancelled = course.cancelled_slots;
    }

    cancelled.push(newSlot);

    await db
      .ref("courseDetails/" + req.body.subCode + "/cancelled_slots")
      .set(cancelled);

    res.status(200).json({ message: "Successfully cancelled the Slot" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// @route POST /api/getCourseStudentsTimeTable
// @desc get the complete list of classes of students of a particular subject
// @access PRIVATE

exports.getCourseStudentsTimeTable = async (req, res, next) => {
  try {
    const facultyPromise = await db
      .ref("facultyDetails/" + req.body.alias)
      .once("value");
    const faculty = facultyPromise.val();

    if (!faculty) {
      const error = new Error(
        "Sorry, no faculty exists with this alias, please contact your admin"
      );
      error.statusCode = 401;
      return next(error);
    }

    const coursePromise = await db.ref("courseDetails").once("value");
    const courseDetails = coursePromise.val();
    let ret = {};
    const [gen, book] = parseClass(faculty, courseDetails, req.body.subCode);
    cancelslot = cancelClass(faculty, courseDetails, req.body.subCode);
    ret["generalClasses"] = gen;
    ret["extraClasses"] = book;
    ret["cancelledClasses"] = cancelslot;
    res.status(200).json(ret);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// @route POST /api/generateStudentAllotedCourses
// @desc generate the list of unique courses chosen by students who have also enrolled
// in courses offered by the prof.
// @access PRIVATE

exports.generateStudentAllotedCourses = async (req, res, next) => {
  try {
    const facultyPromise = await db
      .ref("facultyDetails/" + req.body.alias)
      .once("value");
    const faculty = facultyPromise.val();

    if (!faculty) {
      const error = new Error(
        "Sorry, no faculty exists with this alias, please contact your admin"
      );
      error.statusCode = 401;
      return next(error);
    }

    const enrolledPromise = await db.ref("enrolledStudent").once("value");
    const enrolledStudents = enrolledPromise.val();

    const studentPromise = await db.ref("studentDetails").once("value");
    const studentDetails = studentPromise.val();

    let ret = {};
    console.log("Data fetched!");

    for (let i = 0; i < faculty.courses_offering.length; i++) {
      let courseCode = faculty.courses_offering[i];
      ret[courseCode] = {};

      for (const [j, student] of Object.entries(enrolledStudents[courseCode])) {
        for (const [k, cc] of Object.entries(
          studentDetails[student].courses_enrolled
        )) {
          if (!(cc in ret[courseCode])) ret[courseCode][cc] = 0;
          ret[courseCode][cc]++;
        }
      }
    }

    await db
      .ref("facultyDetails/" + req.body.alias + "/student_alloted_courses")
      .set(ret);

    res.json({ message: "Successfully generated!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
