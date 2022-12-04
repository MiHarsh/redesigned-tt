// database configs
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");
require("dotenv").config();

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

const courseDetails = require("../public/courseDetails.json");
const enrolledStudent = require("../public/enrolledStudent.json");
const facultyDetails = require("../public/facultyDetails.json");
const studentDetails = require("../public/studentDetails.json");

// db.ref("/courseDetails")
//   .set(courseDetails)
//   .then(() => {
//     console.log("course details successfuly uploaded");
//   });

db.ref("/enrolledStudent")
  .set(enrolledStudent)
  .then(() => {
    console.log("enrolled student details successfuly uploaded");
  });

db.ref("/facultyDetails")
  .set(facultyDetails)
  .then(() => {
    console.log("faculty details successfuly uploaded");
  });

db.ref("/studentDetails")
  .set(studentDetails)
  .then(() => {
    console.log("student details successfuly uploaded");
  });
