const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  req.app
    .get("db")
    .ref("facultyDetails/" + req.body.alias)
    .once(
      "value",
      (snapshot) => {
        let val = snapshot.val();
        if (!val) {
          res.json({ error: "Unauthorized" });
        } else {
          req.app
            .get("db")
            .ref("courseDetails")
            .once(
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
              (errorObject) => {
                res.json({ error: "The read failed: " + errorObject.name });
              }
            );
        }
      },
      (errorObject) => {
        res.json({ error: "The read failed: " + errorObject.name });
      }
    );
});

module.exports = router;
