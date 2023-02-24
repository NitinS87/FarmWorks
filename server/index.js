const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const farmerRoute = require("./routes/farmer.js");
const contractorRoute = require("./routes/contractor.js");
const labourRoute = require("./routes/labour.js");
const jobsRoute = require("./routes/jobs.js");

//configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000/",
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
