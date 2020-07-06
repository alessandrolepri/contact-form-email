require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const transporter = require("./config/config");

const app = express();
app.use(express.static(`${__dirname}/dist`));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/*", (req, res) => res.sendFile(`${__dirname}/dist/index.html`));

app.post("/contact", (req, res) => {
  res.set("Content-Type", "application/json");

  const emailTo = process.env.EMAIL_TO;

  const output = `
    <h3>You have a new message from ${req.body.name}</h3>
    <p>Email: ${req.body.email}</p>
    <p>Name: ${req.body.name}</p>
    <p>Phone: ${req.body.mobile}</p>
    <h4>Message:</h4>
    <p>${req.body.message}</p>
`;

  const mailOptions = {
    from: req.body.name,
    email: req.body.email,
    replyTo: req.body.email,
    to: emailTo,
    subject: "You have a new message",
    html: output,
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      res.status(500).send({
        success: false,
        message: "Internal error. Please try again later",
      });
    } else {
      res.send({
        success: true,
        message: "Message succesfully sent!!!",
      });
    }
  });
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`Up and running on port ${process.env.PORT}`)
);
