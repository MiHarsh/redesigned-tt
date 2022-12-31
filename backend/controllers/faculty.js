const db = require("../config/firebase-config").getDB();
const { parseCourseDetails } = require("../helpers/courseParser");

// @route POST /api/getFacultyTT
// @desc returns the faculty course details
// @access PRIVATE

exports.facultyCourseDetails = async (req, res, next) => {
  try {
    const facultyPromise = await db
      .ref("facultyDetails/" + req.body.alias)
      .once("value");
    const faculty = reqPromise.val();

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
