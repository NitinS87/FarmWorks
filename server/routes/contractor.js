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
    district: req.body.district,
    phoneNumber: req.body.phoneNumber,
  });

  try {
    const savedContractor = await contractor.save();
    res.status(201).json(savedContractor);
    console.log(savedContractor);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const contractor = await Contractor.findOne({ email: req.body.email });
    !contractor && res.status(401).json("Wrong Credentials");

    const isMatch = await bcrypt.compare(
      req.body.password,
      contractor.password
    );
    if (!isMatch) return res.status(400).json("invalid id or pass");

    const token = jwt.sign({ id: contractor._id }, process.env.JWT_SECRET);
    delete Contractor.password;
    res.status(200).json({ token, contractor });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
