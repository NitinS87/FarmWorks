const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

const farmerRoute = require("./routes/farmer.js");
const contractorRoute = require("./routes/contractor.js");
const labourRoute = require("./routes/labour.js");
const jobsRoute = require("./routes/jobs.js");
const Contractor = require("./model/Contractor.js");
const Labour = require("./model/Labour.js");
const Farmer = require("./model/Farmer.js");

//configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors({ credentials: true }));

//routes
app.use("/api/farmer", farmerRoute);
app.use("/api/contractor", contractorRoute);
app.use("/api/jobs", jobsRoute);
app.use("/api/labour", labourRoute);

//database connections
const port = process.env.PORT || 8000;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`server running at ${port}`);
    });
  })
  .catch((err) => {
    console.log("Could not connect to database" + err);
  });

app.get("/", (req, res) => {
  res.send("Hey!");
});

app.get("/profile", (req, res) => {
  var { token } = req.headers;
  // console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      else {
        console.log(userData);
        var user = null;
        var type = userData.type;
        var email = userData.userEmail;
        if (userData?.type === "farmer") {
          var {
            name,
            email,
            state,
            city,
            phoneNumber,
            aadharNumber,
            interested,
            profile,
          } = (await Farmer.findOne({ email })) || {};
          user = {
            name,
            email,
            state,
            city,
            phoneNumber,
            aadharNumber,
            interested,
            profile,
          };
        }
        if (userData?.type === "labour") {
          var {
            name,
            email,
            state,
            city,
            phoneNumber,
            aadharNumber,
            interested,
            profile,
          } = (await Labour.findOne({ email })) || {};
          user = {
            name,
            email,
            state,
            city,
            phoneNumber,
            aadharNumber,
            interested,
            profile,
          };
        }
        if (userData?.type === "contractor") {
          var {
            name,
            email,
            state,
            city,
            phoneNumber,
            aadharNumber,
            interested,
            profile,
          } = (await Contractor.findOne({ email })) || {};
          user = {
            name,
            email,
            state,
            city,
            phoneNumber,
            aadharNumber,
            interested,
            profile,
          };
        }
        console.log({ user, type });
        res.status(200).json({ user, type });
      }
    });
  } else {
    res.json(null);
  }
});

app.get("/profile/:type/:userId", async (req, res) => {
  var email = req.params.userId;
  var type = req.params.type;
  if (type === "farmer") {
    var { name, email, state, city, phoneNumber, aadharNumber, profile } =
      await Farmer.findOne({ email });
    user = {
      name,
      email,
      state,
      city,
      phoneNumber,
      aadharNumber,
      interested,
      profile,
    };
  }
  if (type === "labour") {
    var {
      name,
      email,
      state,
      city,
      phoneNumber,
      aadharNumber,
      profile,
      interested,
    } = await Labour.findOne({ email });
    user = {
      name,
      email,
      state,
      city,
      phoneNumber,
      aadharNumber,
      interested,
      profile,
    };
  }
  if (type === "contractor") {
    var {
      name,
      email,
      state,
      city,
      phoneNumber,
      aadharNumber,
      interested,
      profile,
    } = await Contractor.findOne({ email });
    user = {
      name,
      email,
      state,
      city,
      phoneNumber,
      aadharNumber,
      interested,
      profile,
    };
  }
  console.log({ user });
  res.status(200).json({ user });
});
