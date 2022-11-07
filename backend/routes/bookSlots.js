const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  //new Slot entry
  d = new Date(req.body.date);
  month = d.getMonth() + 1;
  year = d.getFullYear();
  date = d.getDate();

  newSlot = {
    date: req.body.date,
    dtcode: weekday[d.getDay()] + "-" + req.body.time.substring(0, 5),
    time: req.body.time,
  };

  req.app
    .get("db")
    .ref("courseDetails/" + req.body.subCode)
    .once("value", (snapshot) => {
      let val = snapshot.val();
      if (!val) {
        res.json({ error: "Unauthorized" });
      } else {
        let sub_details = snapshot.val();
        //console.log(sub_details.booked_slots);
        let slot = [];

        if (
          sub_details.booked_slots != "" &&
          year in sub_details.booked_slots &&
          month in sub_details.booked_slots[year] &&
          date in sub_details.booked_slots[year][month]
        ) {
          for (element in sub_details.booked_slots[year][month][date]) {
            slot.push(sub_details.booked_slots[year][month][date][element]);
          }
          slot[slot.length] = newSlot;
        } else {
          slot = [newSlot];
        }

        req.app
          .get("db")
          .ref(
            "courseDetails/" +
              req.body.subCode +
              "/booked_slots/" +
              year +
              "/" +
              month +
              "/" +
              date
          )
          .set(slot)
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
