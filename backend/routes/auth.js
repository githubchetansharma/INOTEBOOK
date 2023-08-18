const express = require('express');
const User = require('../models/User');
const router = express.Router();
// password and other  user data unique ho ya na ho is liye validation lagate hai 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Harryisagoodb$oy';
// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
// jo bhis is array [] ke andar likha hai validation hai ki intna to hona hi chahiye 
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // go and learn about this try catch block  
  try {
    // Check whether the user with this email exists already  ths is a promise so we have to await 
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }
    // increasing securaty by adding salt to the password 
    // it will change the value of the hasvalue of your easy password so that any hacker cant match his ranbow table value to your password hash value 
    // hash functon is a one way function you can generate hash value (a 10 charecter string ) but you cant generate password by this has value 
    // yaha par bhi await karenge taki promise resolve ho jaye or baad mai aage bade salt ki value leke aage jao 
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }   
    // creating toke for finding true user that a given token 
    // json waib token  and jwt sign in method for creating that token for givong to the user 

    const authtoken = jwt.sign(data, JWT_SECRET);
    // res.send("<h1>SUCCESS</h1>") ; sending thsi auth token to bak end 

    res.json({ authtoken })
  } 
  catch (error) {
    console.error(error.message);

    res.status(500).send("Internal Server Error");
  }
})


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  // we have only two data type email and passsword for destructuring so that we can post on email and password as a post request 
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
// destructuring means initalizing email and password  ;
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }
//   user id datra to compare that token that  given when we sign up 
    const data = {
      user: {
        id: user.id
      }
    }
    // success is a flag if any of the if case could word than succes will be false and thsi res.json will not work 
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken }) 

  } 
  // in case of any error occured 
catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});


// // ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    userId = req.user.id;
    // sellect every field except the password 
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router