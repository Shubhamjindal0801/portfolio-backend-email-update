const express = require("express");
const Joi = require("joi");
const UserSchema = require("../models/Users");
const nodemailer = require('nodemailer')
require('dotenv').config()

const router = express();

router.post("/sendProposal", async (req, res) => {
  const userData = {
    name: req.body.name,
    phone: req.body.phone || "0000000000",
    email: req.body.email,
    message: req.body.message,
  };
//   console.log(userData);

  const isValid = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().min(10).max(10),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
  }).validate(userData);

  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: "Invalid Input",
      data: isValid.error.message,
    });
  }

  const newUserMsg = new UserSchema({
    name: req.body.name,
    phone: req.body.phone || null,
    email: req.body.email,
    message: req.body.message,
  });

  try {
    await newUserMsg.save();
    res.status(201).send({
      status: 201,
      message: "Details send successfully!",
      data: newUserMsg,
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "Error while sending data.",
      data: error,
    });
  }
});

router.post("/sendmail", (req, res) => {
  const formData = {
    name: req.body.name,
    phone: req.body.phone || "0000000000",
    email: req.body.email,
    message: req.body.message,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAIL_ID}`,
      pass: `${process.env.PASSWORD}`,
    },
  });

  const mailOptions = {
    from: `${process.env.EMAIL_ID}`,
    to: `${process.env.EMAIL_ID}`,
    subject: "New Form Submission",
    text: `
         Name: ${formData.name}
         Email: ${formData.email}
         Mobile: ${formData.phone}
         Message: ${formData.message}
       `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send({
        status: 500,
        message: "Error while sending email.",
        data: error,
      });
    } else {
      res.status(200).send({
        status: 200,
        message: "Email sent successfully!",
        data: info,
      });
    }
  });
});
module.exports = router;
