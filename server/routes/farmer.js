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
    city: req.body.city,
    phoneNumber: req.body.phoneNumber,
    aadharNumber: req.body.aadharNumber,
  });

  try {
    const user = await farmer.save();
    // console.log(savedFarmer);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await Farmer.findOne({ email: req.body.email });
    if (!user) {
      !user && res.status(401).json("Wrong Credentials");
    } else {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) return res.status(400).json("invalid id or pass");
      const type = "farmer";
      const token = jwt.sign({ user, type }, process.env.JWT_SECRET);
      delete user.password;
      res.cookie("token", token).status(200).json({ token, user, type });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const userDoc = await Farmer.findById(userData.id);
      res.json(userDoc);
    });
  } else {
    res.json(null);
  }
});

module.exports = router;
