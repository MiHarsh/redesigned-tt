require("dotenv").config();
const nodemailer = require("nodemailer");

let smtp;

const createTransport = () => {
  smtp = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSCODE,
    },
  });
  console.log("Nodemailer configured successfully");
};

const getSMTP = () => {
  if (!smtp) {
    throw new Error("Nodemailer Not Configured");
  }
  return smtp;
};

exports.createTransport = createTransport;
exports.getSMTP = getSMTP;
