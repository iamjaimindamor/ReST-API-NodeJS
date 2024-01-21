const authController = require(`../controllers/authController`);
const express = require('express');
const verifyToken = require('../middleware/auth_mw');
const { body, validationResult } = require('express-validator');
const app = express();

const router2 = express.Router();

//validating the input
const usernameVaild = body('username').notEmpty().withMessage("UserName Field Required");
const passwordValid = body('password').notEmpty().withMessage("Password Field Required");
const roleValid = body('role').notEmpty().withMessage("Role Required");

//validate registering user
router2.post('/register', [usernameVaild, passwordValid, roleValid],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("im in app.post of auth")
      return res.status(400).json({
        errors: errors.array()
      });

    } else
      console.log("im in app.post of auth here")
    authController.create(req, res)
  });

//validating login user
router2.post('/login', [usernameVaild, passwordValid], verifyToken, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("im in app.post of auth of login")
    return res.status(400).json({
      errors: errors.array()
    });
  } else {
    console.log("im in app.post of auth here login");
    authController.validate(req, res);
  }

});


router2.post('/refresh', authController.refresh);
//test token
router2.post('/welcome', verifyToken, (req, res) => { res.status(200).send("Welcome 🙌"); });

//fetching credentials....
router2.get('/allcreds', authController.findAll);

module.exports = router2;