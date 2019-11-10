const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const stats = require("./routes/stats");

const app = express();
app.use(cors());

app.use(stats);
app.use(express.json());

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8080;

app.listen(port, function(req, res) {
  console.log("server running in port " + port);
});
