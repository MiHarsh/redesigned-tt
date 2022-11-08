const express = require("express");
const router = express.Router();
const moment = require("moment");

router.post("/", (req, res) => {
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

  req.app
    .get("db")
    .ref("courseDetails/" + req.body.subCode)
    .once("value", (snapshot) => {
      let val = snapshot.val();
      if (!val) {
        res.json({ error: "Subject Code not found" });
      } else {
        let sub_details = snapshot.val();
        let cancelled = [];

        if (sub_details.cancelled_slots && sub_details.cancelled_slots != "") {
          cancelled = sub_details.cancelled_slots;
        }

        cancelled.push(newSlot);

        req.app
          .get("db")
          .ref("courseDetails/" + req.body.subCode + "/cancelled_slots")
          .set(cancelled)
          .then(() => {
            res.json({ message: "write successful" });
          })
          .catch((errorObject) => {
            res.json({ error: "write failed" + errorObject.name });
          });
      }
    });
});
module.exports = router;
