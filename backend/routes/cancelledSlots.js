const express = require("express");
const router = express.Router();
const moment = require("moment");
const db = require("../config/firebase-config").getDB();

router.post("/", (req, res, next) => {
  const weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  //new Slot entry
  let momStart = moment(Number(req.body.startTime));
  let start_time = momStart.format("hh:mm");
  let momEnd = moment(Number(req.body.endTime));
  let end_time = momEnd.format("hh:mm");

  newSlot = {
    date: momStart.format("YYYY-MM-DD"),
    dtcode: weekday[momStart.day()] + "-" + start_time,
    time: start_time + "-" + end_time,
  };
  db.ref("courseDetails/" + req.body.subCode).once("value", (snapshot) => {
    let val = snapshot.val();
    if (!val) {
      const error = new Error("subject code not found");
      error.statusCode = 404;
      next(error);
    } else {
      let sub_details = snapshot.val();
      let cancelled = [];

      if (sub_details.cancelled_slots && sub_details.cancelled_slots != "") {
        cancelled = sub_details.cancelled_slots;
      }

      cancelled.push(newSlot);

      db.ref("courseDetails/" + req.body.subCode + "/cancelled_slots")
        .set(cancelled)
        .then(() => {
          res.json({ message: "write successful" });
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    }
  });
});
module.exports = router;
