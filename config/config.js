const nodemailer = require("nodemailer");

const email = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const service = process.env.SERVICE;

const transporter = nodemailer.createTransport({
  service: service,
  secure: true,
  auth: {
    user: email,
    pass: pass,
  },
});

module.exports = transporter;
