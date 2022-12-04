const express = require("express");
const router = express.Router();

function getGeneralClasses(weekday, facultyDetails, courseDetails, req) {
  let ret = {};

  for (let i = 0; i < weekday.length; i++) {
    ret[weekday[i]] = {};
  }
  //console.log("Return object till now: ", ret);
  const course_offered = Object.keys(facultyDetails.student_alloted_courses);

  for (const [key, value] of Object.entries(
    facultyDetails.student_alloted_courses[req.body.subCode]
  )) {
    if (key in course_offered) continue;

    let course = courseDetails[key];
    console.log("Course: ", course);

    for (let idx = 0; idx < course.general_slots.length; idx++) {
      let slot = course.general_slots[idx];
      let dtcode = slot.dtcode;
      let dayCode = dtcode.substring(0, 3);

      if (!(dtcode in ret[dayCode])) {
        ret[dayCode][dtcode] = {
          day: slot.day,
          dtcode: dtcode,
          time: slot.time,
          clash_counts: 0,
          courses_details: {},
        };
      }

      ret[dayCode][dtcode].clash_counts += value;
      ret[dayCode][dtcode].courses_details[key] = {
        instructor_mail: course.instructor_mail,
        course_name: course.course_name,
        short_code: course.short_code,
        clashing_students: value,
      };
    }
  }

  return ret;
}

function getExtraClasses(weekday, facultyDetails, courseDetails, req) {
  let ret = {};

  for (let i = 0; i < weekday.length; i++) {
    ret[weekday[i]] = {};
  }

  const course_offered = Object.keys(facultyDetails.student_alloted_courses);

  for (const [key, value] of Object.entries(
    facultyDetails.student_alloted_courses[req.body.subCode]
  )) {
    if (key in course_offered) continue;

    let course = courseDetails[key];
    //console.log("Course: ", course);

    for (let idx = 0; idx < course.booked_slots.length; idx++) {
      let slot = course.booked_slots[idx];
      let dtcode = slot.dtcode;
      let dayCode = dtcode.substring(0, 3);

      if (!(dtcode in ret[dayCode])) {
        ret[dayCode][dtcode] = {
          date: slot.date,
          dtcode: dtcode,
          time: slot.time,
          clash_counts: 0,
          courses_details: {},
        };
      }

      ret[dayCode][dtcode].clash_counts += value;
      ret[dayCode][dtcode].courses_details[key] = {
        instructor_mail: course.instructor_mail,
        course_name: course.course_name,
        short_code: course.short_code,
        clashing_students: value,
      };
    }
  }

  return ret;
}

function getCancelledClasses(weekday, facultyDetails, courseDetails, req) {
  let ret = {};

  for (let i = 0; i < weekday.length; i++) {
    ret[weekday[i]] = {};
  }

  const course_offered = Object.keys(facultyDetails.student_alloted_courses);

  for (const [key, value] of Object.entries(
    facultyDetails.student_alloted_courses[req.body.subCode]
  )) {
    if (key in course_offered) continue;

    let course = courseDetails[key];
    //console.log("Course: ", course);

    for (let idx = 0; idx < course.cancelled_slots.length; idx++) {
      let slot = course.cancelled_slots[idx];
      let dtcode = slot.dtcode;
      let dayCode = dtcode.substring(0, 3);
      // let ky = "" + key;

      let start = new Date(slot.date + " " + slot.time.split("-")[0]);

      if (start.getHours() < 8) {
        start = start.setHours(start.getHours() + 12);
      } else {
        start = start.getTime();
      }

      ret[dayCode][String(start) + key] = value;

      // [ky] = value;

      // if (!(dtcode in ret[dayCode])) {
      //   ret[dayCode][dtcode] = {
      //     date: slot.date,
      //     dtcode: dtcode,
      //     time: slot.time,
      //     clash_counts: 0,
      //     courses_details: {},
      //   };
      // }

      // ret[dayCode][dtcode].clash_counts += value;
      // ret[dayCode][dtcode].courses_details[key] = value;
    }
  }

  return ret;
}

router.post("/", (req, res) => {
  console.log("Request object: ", req.body);
  const weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  req.app
    .get("db")
    .ref("facultyDetails/" + req.body.alias)
    .once(
      "value",
      (snapshot) => {
        let facultyDetails = snapshot.val();

        if (!facultyDetails) {
          res.json({ error: "Unauthorized" });
        } else {
          req.app
            .get("db")
            .ref("courseDetails")
            .once(
              "value",
              (snapshot) => {
                let courseDetails = snapshot.val();
                let ret = {};

                ret["generalClasses"] = getGeneralClasses(
                  weekday,
                  facultyDetails,
                  courseDetails,
                  req
                );
                ret["extraClasses"] = getExtraClasses(
                  weekday,
                  facultyDetails,
                  courseDetails,
                  req
                );
                ret["cancelledClasses"] = getCancelledClasses(
                  weekday,
                  facultyDetails,
                  courseDetails,
                  req
                );

                console.log("Final return object: ", ret);
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
