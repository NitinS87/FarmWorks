const router = require("express").Router();
const Contractor = require("../model/Contractor.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt();
  const contractor = new Contractor({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
    state: req.body.state,
    city: req.body.city,
    phoneNumber: req.body.phoneNumber,
    aadharNumber: req.body.aadharNumber,
  });

  try {
    const user = await contractor.save();
    res.status(201).json(user);
    // console.log(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await Contractor.findOne({ email: req.body.email });
    if (!user) {
      !user && res.status(401).json("Wrong Credentials");
    } else {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) return res.status(400).json("invalid id or pass");
      const token = jwt.sign({ user }, process.env.JWT_SECRET);
      delete Contractor.password;
      const type = "contractor";
      res.status(200).json({ token, user, type });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
