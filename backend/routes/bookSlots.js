const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  //new Slot entry
  d = new Date(req.body.startTime);
  start_time =
    (d.getHours() % 12 || 12) +
    ":" +
    d.getMinutes() +
    (d.getMinutes() < 10 ? +"0" : "");
  e = new Date(req.body.endTime);
  end_time =
    (e.getHours() % 12 || 12) +
    ":" +
    e.getMinutes() +
    (e.getMinutes() < 10 ? +"0" : "");
  month = d.getMonth() + 1;
  year = d.getFullYear();
  date = d.getDate();

  newSlot = {
    date: year + "-" + month + "-" + date,
    dtcode: weekday[d.getDay()] + "-" + start_time.substring(0, 5),
    time: start_time + "-" + end_time,
  };
  console.log(newSlot);

  req.app
    .get("db")
    .ref("courseDetails/" + req.body.subCode)
    .once("value", (snapshot) => {
      let val = snapshot.val();
      if (!val) {
        res.json({ error: "Subject Code not found" });
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
