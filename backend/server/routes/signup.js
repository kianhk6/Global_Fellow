var express = require('express');
const User = require('../models/User');
var router = express.Router();
var bcrypt = require('bcrypt');

router.post('/', async function(req, res){
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // checking if email already exist as it needs to be unique 
  let emailExists = await User.findOne({email: req.body.email});
  
  if (emailExists) {
    return res.status(400).send({message: "email: " + emailExists + " already exists", isSuccess: false });
  } 

  else {
    const country =  (req.body.country == undefined) ? "" : req.body.country; 
    const userToAdd = new User({
      firstname: req.body.firstname,
      email: req.body.email,
      password: hashedPassword,
      continent: req.body.continent,
      country: country, 
      interest: req.body.interest
    });
    userToAdd.save();
    res.status(200).json({message: "User successfully created", isSuccess: true});
  }
});

module.exports = router;