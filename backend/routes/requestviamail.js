const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  // setup e-mail data with unicode symbols
  console.log(req.body);

  var mailOptions = {
    from: process.env.MAIL_USERNAME, // sender address
    to: req.body.userMail, // list of receivers
    subject: "Request for Slot Change of Course Code: " + req.body.subCode, // Subject line
    html: `Hello,<br>The course instructor of course <b>` + req.body.requestedBy + `</b> has requested you to change your slot of <b>`
     + req.body.subCode + `</b> scheduled at <b>` + req.body.time + `</b> to prevent clash with the class they want to schedule.`, // plaintext body
    //html: "<b>Hello world ✔</b>", // html body
  };

  // send mail with defined transport object
  req.app.get("smtp").sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Email sent ");
      res.end("Email Sent successfully");
    }
  });
});

module.exports = router;
