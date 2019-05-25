const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
var session = require("express-session");
const cookieParser = require("cookie-parser");
const exphbs = require('express-handlebars');

//passport config
require("./config/passport")(passport);

//local routes
const auth = require("./routes/auth");
const keys = require("./config/keys");
const index = require("./routes/index");

//model
const { User } = require("./models/User");

const app = express();



mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch(e => {
    console.log(e);
  });

app.engine('handlebars', exphbs({
  defaultLayout: "main"
}));

app.set('view engine', 'handlebars');

//cookie-parser
app.use(cookieParser());

//express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});



app.use('/', index);
app.use("/auth", auth);




const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
