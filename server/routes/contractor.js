const router = require("express").Router();
const Contractor = require("../model/Contractor.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyToken = require("../middleware/auth.js");

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
    profile: req.body.profile,
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
      var userEmail = user.email;
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) return res.status(400).json("invalid id or pass");
      var type = "contractor";
      const token = jwt.sign({ userEmail, type }, process.env.JWT_SECRET);
      delete Contractor.password;
      res.status(200).json({ token, user, type });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//ADD INTERESTED JOBS
router.post("/interested", verifyToken, async (req, res) => {
  try {
    const { id, type, comments, jobId } = req.body;
    console.log(id, type, comments, jobId);
    const job = await Contractor.findById(jobId);
    var check = false;
    var obj = { id: id, type: type, comments: comments };
    for (var i = 0; i < job.interested.length; i++) {
      if (job.interested[i].id === jobId) {
        check = true;
        obj = job.interested[i];
        // console.log(check);
        break;
      }
    }
    if (!check) {
      await Contractor.findByIdAndUpdate(jobId, { $push: { interested: obj } });
      res.status(200).json("Data added");
    } else {
      await Contractor.findByIdAndUpdate(jobId, { $pull: { interested: obj } });
      res.status(200).json("Data deleted");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});
//GET INTERESTED JOBS
router.get("/interested/:email", verifyToken, async (req, res) => {
  try {
    const email = req.params.email;
    const { interested } = await Contractor.findOne({email});
    res.status(200).json(interested);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
