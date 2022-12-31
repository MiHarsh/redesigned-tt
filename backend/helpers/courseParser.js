const moment = require("moment");

exports.parseCourseDetails = (faculty, courses) => {
  let ret = {
    courseOffering: [],
    generalclass: {
      Sun: [],
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
      Sat: [],
    },
    extraclass: [],
    cancelledSlots: {},
  };

  // courses offered
  for (let i = 0; i < faculty.courses_offering.length; i++) {
    let class_obj = courses[faculty.courses_offering[i]];
    ret.courseOffering.push({
      course_code: faculty.courses_offering[i],
      course_name: class_obj["course_name"],
    });

    for (let q = 0; q < class_obj["general_slots"].length; q++) {
      let coursetmp = class_obj["general_slots"][q];
      coursetmp.course_code = faculty.courses_offering[i];
      coursetmp.course_name = class_obj["course_name"];

      ret.generalclass[coursetmp.day.slice(0, 3)].push(coursetmp);
    }

    // extraclass

    for (let j = 0; j < class_obj.booked_slots.length; j++) {
      let ecOb = class_obj.booked_slots[j];

      let start = new Date(ecOb.date + " " + ecOb.time.split("-")[0]);
      let end = new Date(ecOb.date + " " + ecOb.time.split("-")[0]);

      if (start.getHours() < 8) {
        start = start.setHours(start.getHours() + 12);
      } else {
        start = start.getTime();
      }

      if (end.getHours() <= 8) {
        end = end.setHours(end.getHours() + 12);
      } else {
        end.getTime();
      }

      ret.extraclass.push({
        course_code: faculty.courses_offering[i],
        course_name: class_obj["course_name"],
        end: end,
        start: start,
        id: String(start) + faculty.courses_offering[i] + String(end),
        startWeek: moment(start).week(),
        endWeek: moment(end).week(),
      });
    }

    //cancelled
    for (let j = 0; j < class_obj.cancelled_slots.length; j++) {
      let ecOb = class_obj.cancelled_slots[j];

      let start = new Date(ecOb.date + " " + ecOb.time.split("-")[0]);

      if (start.getHours() < 8) {
        start = start.setHours(start.getHours() + 12);
      } else {
        start = start.getTime();
      }

      ret.cancelledSlots[String(start) + faculty.courses_offering[i]] =
        class_obj["course_name"];
    }
  }
};
