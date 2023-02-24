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
router.post("/create", async (req, res) => {
  const jobs = new Jobs({
    farmerId: req.body.farmerId,
    jobName: req.body.jobName,
    jobDesc: req.body.jobDesc,
    land: req.body.land,
    completionDays: req.body.completionDays,
    amount: req.body.amount,
    coordinates: req.body.coordinates,
    jobOptions: req.body.jobOptions,
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
router.get("/find/:farmerId", async (req, res) => {
  try {
    const jobs = await Jobs.find({ farmerId: req.params.farmerId });
    if (!jobs) {
      res.status(202).json("job does not exist");
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
      res.status(202).json("job does not exist");
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

// // UPDATE
// router.put("/interested/", verifyToken, async (req, res) => {
//   try {
//     const { id, type, comments, jobId } = req.body;
//     const job = Jobs.findById(jobId);
//     var check = false;
//     for (var i = 0; i < job.length; i++) {
//       if (job[i].id === id) {
//         job.splice(i, 1);
//         check = true;
//         break;
//       }
//     }
//     if (check !== true) {
//       job.push({
//         id,
//         type,
//         comments,
//       });
//       await job.save();
//       res.status(200).json("data added");
//     } else {
//       await job.save();
//       res.status(200).json("data deleted");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
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
