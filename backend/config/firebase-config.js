const firebase = require("firebase/app");
const firebaseAdmin = require("firebase-admin");

require("dotenv").config();

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

const serviceAccountConfig = {
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

let db, admin;

const initializeApp = () => {
  firebase.initializeApp(firebaseConfig);
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccountConfig),
  });
  db = firebase.database();
  admin = firebaseAdmin;
  console.log("Successfully connected DB and Service Account");
};

const getDB = () => {
  if (!db) {
    throw new Error("Database not connected");
  }
  return db;
};

const getFirebaseAdmin = () => {
  if (!admin) {
    throw new Error("Service account not connected");
  }
  return admin;
};

exports.initializeApp = initializeApp;
exports.getDB = getDB;
exports.getFirebaseAdmin = getFirebaseAdmin;
