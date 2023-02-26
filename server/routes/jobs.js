const router = require("express").Router();
const verifyToken = require("./../middleware/auth");
const Jobs = require("../model/Jobs.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//READ ALL JOBS
router.get("/", async (req, res) => {
  try {
    // const query = await Jobs.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });

    const jobs = await Jobs.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE
router.post("/create", verifyToken, async (req, res) => {
  const jobs = new Jobs({
    farmerId: req.body.farmerId,
    jobName: req.body.jobName,
    jobDesc: req.body.jobDesc,
    land: req.body.land,
    completionDays: req.body.completionDays,
    amount: req.body.amount,
    coordinates: req.body.coordinates,
    jobOptions: req.body.jobOptions,
    phoneNumber: req.body.phoneNumber,
    pictures: req.body.pictures,
  });

  try {
    const savedJobs = await jobs.save();
    res.status(200).json(savedJobs);
    // console.log(savedJobs);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET FARMER JOBS
router.get("/find/:farmerId", verifyToken, async (req, res) => {
  try {
    const jobs = await Jobs.find({ farmerId: req.params.farmerId });
    if (!jobs) {
      res.status(202).json("Job does not exist");
    } else {
      res.status(200).json(jobs);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// //GET FARMER JOBS
// router.get("/find/:farmerId/ratings", verifyToken, async (req, res) => {
//   try {
//     const jobs = await Jobs.find({ farmerId: req.params.farmerId });
//     if (!jobs) {
//       res.status(202).json("job does not exist");
//     } else {
//       res.status(200).json(jobs);
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET A SPECIFIC JOB
router.get("/search/:id", async (req, res) => {
  try {
    const jobs = await Jobs.findById(req.params.id);
    if (!jobs) {
      res.status(202).json("Job does not exist");
    } else {
      res.status(200).json(jobs);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const updatedJobs = await Jobs.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedJobs);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/interested", verifyToken, async (req, res) => {
  try {
    const { id, type, comments, jobId } = req.body;
    console.log(id, type, comments, jobId);
    const job = await Jobs.findById(jobId);
    var check = false;
    var obj = { id: id, type: type, comments: comments };
    for (var i = 0; i < job.interested.length; i++) {
      if (job.interested[i].id === id) {
        check = true;
        obj = job.interested[i];
        // console.log(check);
        break;
      }
    }
    if (!check) {
      await Jobs.findByIdAndUpdate(jobId, { $push: { interested: obj } });
      res.status(200).json("Data added");
    } else {
      await Jobs.findByIdAndUpdate(jobId, { $pull: { interested: obj } });
      res.status(200).json("Data deleted");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});
//DELETE
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const temp = await Jobs.findByIdAndDelete(req.params.id);
    if (!temp) {
      res.status(202).json("Job does not exist");
    } else {
      res.status(200).json("Job has been deleted..");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
