const express = require("express");
const router = express.Router();
const { facultyCourseDetails } = require("../controllers/faculty");

router.post("/", facultyCourseDetails);

module.exports = router;
