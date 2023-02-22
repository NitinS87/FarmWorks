const router = require("express").Router();
const Farmer = require("../model/Farmer.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt();
  const farmer = new Farmer({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
    state: req.body.state,
    district: req.body.district,
    phoneNumber: req.body.phoneNumber,
  });

  try {
    const savedFarmer = await farmer.save();
    res.status(201).json(savedFarmer);
    console.log(savedFarmer);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ email: req.body.email });
    !farmer && res.status(401).json("Wrong Credentials");

    const isMatch = await bcrypt.compare(req.body.password, farmer.password);
    if (!isMatch) return res.status(400).json("invalid id or pass");

    const token = jwt.sign({ id: farmer._id }, process.env.JWT_SECRET);
    delete farmer.password;
    res.status(200).json({ token, farmer });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
