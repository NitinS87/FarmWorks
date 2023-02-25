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
app.use(
  cors({
    credentials: true,
  })
);

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
  const { token } = req.headers;
  // console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      else {
        var user = null;
        var type = userData.type;
        if (userData.type === "farmer") {
          const { name, email, state, city, phoneNumber, aadharNumber } =
            await Farmer.findOne(userData.email);
          user = { name, email, state, city, phoneNumber, aadharNumber };
        }
        if (userData.type === "labour") {
          const { name, email, state, city, phoneNumber, aadharNumber } =
            await Labour.findOne(userData.email);
          user = { name, email, state, city, phoneNumber, aadharNumber };
        }
        if (userData.type === "contractor") {
          const { name, email, state, city, phoneNumber, aadharNumber } =
            await Contractor.findOne(userData.email);
          user = { name, email, state, city, phoneNumber, aadharNumber };
        }
        // console.log({user, type});
        res.status(200).json({ user, type });
      }
    });
  } else {
    res.json(null);
  }
});
