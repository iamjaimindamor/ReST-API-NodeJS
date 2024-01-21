const express = require('express');
const userController = require(`../controllers/userController`);
const verifyToken = require('../middleware/auth_mw');
const readToken = require('../middleware/check');
const { body, validationResult } = require('express-validator');

const router = express.Router();

//validationsss
const nameValid = body('name').notEmpty().withMessage("Name Field Required");
const ageValid = body('age').notEmpty().withMessage("Age Field Required");
const ageInt = body('age').isInt().withMessage("Age Must be an integer");
const emailReq = body('email').notEmpty().withMessage("email Field Required")
const emailValid = body('email').isEmail().withMessage("Invalid Email");
const phoneValid = body('phone').notEmpty().withMessage("Phone Number Required");
const phoneLn = body('phone').isLength({ min: 10 }).withMessage("Phone Number VALID");

//Routing using express.router().......
router.get('/users', readToken,userController.findAll);
router.get('/users/:id', verifyToken, userController.findById);
router.get('/users/byname/:name', verifyToken, userController.findname);
router.put('/users/:id', verifyToken, userController.update);
router.delete('/users/:id', verifyToken, userController.delete);

//validating the input
router.post('/users', [nameValid, ageValid, ageInt, emailReq, emailValid, phoneValid, phoneLn], verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("im in app.post")
      return res.status(400).json({
        errors: errors.array()
      });
    }
    userController.create(req, res);
  });

//admin reading
router.get('/adminv', verifyToken, userController.findAll);

module.exports = router;