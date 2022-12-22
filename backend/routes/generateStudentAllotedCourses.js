const express = require("express");
const router = express.Router();
const db = require("../config/firebase-config").getDB();

router.post("/", (req, res, next) => {
  db.ref("facultyDetails/" + req.body.alias).once(
    "value",
    (snapshot) => {
      let facultyDetails = snapshot.val();

      if (!facultyDetails) {
        res.json({ error: "Unauthorized" });
      } else {
        req.app
          .get("db")
          .ref("enrolledStudent")
          .once(
            "value",
            (snapshot) => {
              let enrolledStudents = snapshot.val();

              if (!enrolledStudents) {
                const error = new Error("Not authorized.");
                error.statusCode = 401;
                next(error);
              } else {
                db.ref("studentDetails").once(
                  "value",
                  (snapshot) => {
                    let studentDetails = snapshot.val();

                    if (!studentDetails) {
                      const error = new Error("Not authorized.");
                      error.statusCode = 401;
                      next(error);
                    } else {
                      let ret = {};
                      console.log("Data fetched!");

                      for (
                        let i = 0;
                        i < facultyDetails.courses_offering.length;
                        i++
                      ) {
                        let courseCode = facultyDetails.courses_offering[i];
                        ret[courseCode] = {};

                        for (const [j, student] of Object.entries(
                          enrolledStudents[courseCode]
                        )) {
                          for (const [k, cc] of Object.entries(
                            studentDetails[student].courses_enrolled
                          )) {
                            if (!(cc in ret[courseCode]))
                              ret[courseCode][cc] = 0;
                            ret[courseCode][cc]++;
                          }
                        }
                      }

                      db.ref(
                        "facultyDetails/" +
                          req.body.alias +
                          "/student_alloted_courses"
                      )
                        .set(ret)
                        .then(() => {
                          res.json({ message: "Successfully generated!" });
                        })
                        .catch((err) => {
                          if (!err.statusCode) {
                            err.statusCode = 500;
                          }
                          next(err);
                        });
                    }
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
