const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");

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
const { nextTick } = require("process");

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

var serviceAccount = {
  type: process.env.SERVICE_TYPE,
  project_id: process.env.SERVICE_PROJECT_ID,
  private_key_id: process.env.SERVICE_PRIVATE_KEY_ID,
  private_key: process.env.SERVICE_PRIVATE_KEY,
  client_email: process.env.SERVICE_CLIENT_EMAIL,
  client_id: process.env.SERVICE_CLIENT_ID,
  auth_uri: process.env.SERVICE_AUTH_URI,
  token_uri: process.env.SERVICE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.SERVICE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.SERVICE_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const tkn =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmZjFlNDJlNDE0M2I4MTQxM2VjMTI1MzQwOTcwODUxZThiNDdiM2YiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSGFyc2ggTWlzaHJhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FMbTV3dTM3eEtrSEtrcGE1VzFKZjRUMUdoaVYwODJNXzA4Nl9ZbVVIQ2ZhdkE9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVkZXNpZ25lZC10dCIsImF1ZCI6InJlZGVzaWduZWQtdHQiLCJhdXRoX3RpbWUiOjE2NzE1NDMyNjAsInVzZXJfaWQiOiI3WWFsZ1RlTXlRUW1jZVdWanJuTGl4dUR2dTAyIiwic3ViIjoiN1lhbGdUZU15UVFtY2VXVmpybkxpeHVEdnUwMiIsImlhdCI6MTY3MTU0MzI2MCwiZXhwIjoxNjcxNTQ2ODYwLCJlbWFpbCI6ImhhcnNobTE3MTcyNjEyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTE3MDk4NTgyMzY1MTg5NDA3MjY1Il0sImVtYWlsIjpbImhhcnNobTE3MTcyNjEyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.Y9gT-YN5c3l3P54IkUAN8C8S3Z-WhZcdETQFnCi8tOK9FLEGWVU0gKZuuqxbQ2lHppC3nqtC81T2Ocyc5f7VANcsp2ARE6_h-voPypMBcuonE_8LLRO29n7G4xFKJ-F0hhQsfShMfGBctbdz0TqvQB1LxuP4jNcTByTkseJ-sZMvDB3cTkseXKwyH5u7XIZNqzXI-sHwR8Pr6pCun2O5sU_6uYRPQHjrZAwABfT75lvIaYAY5ZMyTQT3KFWVt2sFHpUmVyjcnuqxnpD7BF5nI8QMlKxnhOhrwuZxYn0sRfcQg38MakEtr_CpcHm4akHbw8tg6S8FM8V9eSILZ31sVw";

admin
  .auth()
  .verifyIdToken(tkn)
  .then((decodedToken) => {
    if (decodedToken) {
      console.log(decodeTkn);
      console.log("authorized");
      next();
      //res.json({message : "authorized"});
    } else {
      console.log("unauthorized");
    }
    //res.json({ message: "unauthorized" });
  })
  .catch((error) => {
    console.log(error);
  });

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
