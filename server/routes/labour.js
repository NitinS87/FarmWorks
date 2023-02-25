const router = require("express").Router();
const Labour = require("../model/Labour.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt();
  const labour = new Labour({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
    state: req.body.state,
    city: req.body.city,
    phoneNumber: req.body.phoneNumber,
    aadharNumber: req.body.aadharNumber,
  });

  try {
    const savedLabour = await labour.save();
    // console.log(savedLabour);
    res.status(201).json(savedLabour);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await Labour.findOne({ email: req.body.email });
    if (!user) {
      !user && res.status(401).json("Wrong Credentials");
    } else {
      var userEmail = user.email;
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) return res.status(400).json("invalid id or pass");
      const type = "labour";
      const token = jwt.sign({ userEmail, type }, process.env.JWT_SECRET);
      delete user.password;

      res.status(200).json({ token, user, type });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
