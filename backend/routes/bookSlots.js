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
        let booked = [];

        if (sub_details.booked_slots && sub_details.booked_slots != "") {
          booked = sub_details.booked_slots;
        }

        booked.push(newSlot);

        req.app
          .get("db")
          .ref("courseDetails/" + req.body.subCode + "/booked_slots")
          .set(booked)
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
