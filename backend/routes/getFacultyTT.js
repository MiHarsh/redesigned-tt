const express = require("express");
const router = express.Router();
const db = require("../config/firebase-config").getDB();

router.post("/", (req, res, next) => {
  db.ref("facultyDetails/" + req.body.alias).once(
    "value",
    (snapshot) => {
      let val = snapshot.val();
      if (!val) {
        const error = new Error("Not authorized.");
                error.statusCode = 401;
                next(error);
      } else {
        db.ref("courseDetails").once(
          "value",
          (snapshot) => {
            let courseDetails = snapshot.val();
            let ret = { student_alloted_courses: {}, courses_offering: {} };

            for (let i = 0; i < val.courses_offering.length; i++) {
              ret.courses_offering[val.courses_offering[i]] =
                courseDetails[val.courses_offering[i]];
            }
            if (val.student_alloted_courses[req.body.courseID]) {
              for (const [key, value] of Object.entries(
                val.student_alloted_courses[req.body.courseID]
              )) {
                let course = courseDetails[key];

                course.student_count = value;
                ret.student_alloted_courses[key] = course;
              }
            }

            res.json(ret);
          },
          (err) => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          }
        );
      }
    },
    (err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  );
});

module.exports = router;
