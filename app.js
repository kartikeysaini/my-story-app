const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
//passport config
require("./config/passport")(passport);

//local routes
const auth = require("./routes/auth");
const app = express();

app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send("welcome");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
