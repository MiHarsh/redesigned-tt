const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
require("dotenv").config();

// Bodyparser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// database configs
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");

var firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();
dbRef = db.ref();

app.set("db", db);

const smtp = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSCODE,
  },
});

app.set("smtp", smtp);

// use routes
app.use("/api/status", require("./routes/status"));
app.use("/api/requestMail", require("./routes/requestviamail"));
app.use("/api/getFacultyTT", require("./routes/getFacultyTT"));
app.use("/api/bookSlot", require("./routes/bookSlots"));
app.use("/api/cancelledSlot", require("./routes/cancelledSlots"));
app.use("/api/getFacultyCD", require("./routes/getFacultyCD"));
app.use(
  "/api/getCourseStudentsTimeTable",
  require("./routes/getCourseStudentsTimeTable")
);
app.use(
  "/api/generateStudentAllotedCourses",
  require("./routes/generateStudentAllotedCourses")
);

// serve static assets if we are in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.use(express.static("public"));
}

const port = process.env.BACKEND_NODE_PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
