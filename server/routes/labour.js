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
    district: req.body.district,
    phoneNumber: req.body.phoneNumber,
  });

  try {
    const savedLabour = await labour.save();
    res.status(201).json(savedLabour);
    console.log(savedLabour);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const labour = await Labour.findOne({ email: req.body.email });
    !labour && res.status(401).json("Wrong Credentials");

    const isMatch = await bcrypt.compare(req.body.password, labour.password);
    if (!isMatch) return res.status(400).json("invalid id or pass");

    const token = jwt.sign({ id: labour._id }, process.env.JWT_SECRET);
    delete labour.password;
    res.status(200).json({ token, labour });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
