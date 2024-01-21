const express = require('express');
const addressController = require(`../controllers/addressController`);
const addressService = require(`../services/addressService`);
const { body, validationResult } = require('express-validator');

const router1 = express.Router();

//validations
const address1 = body('address').isLength({ min: 5, max: 150 }).withMessage("Enter Valid Address");

// routing for address
router1.get('/addusers', addressController.findAll);
router1.get('/addusers/:id', addressController.findById);
router1.get('/addid/:add_id', addressController.findbyaddid);
router1.put('/addusers/:id', addressController.update);
router1.delete('/addusers/:id', addressController.delete);
router1.get('/biodata', addressService.performLookup);

// validating for address.......
router1.post('/addusers', [address1], (req, res) => {
  console.log("i,m here on router1 post")
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("im in app.post of addresss")
    return res.status(400).json({
      errors: errors.array()
    });
  }
  addressController.create(req, res);
});


module.exports = router1;