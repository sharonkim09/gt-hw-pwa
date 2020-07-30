// dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

// port
const PORT = process.env.PORT || 3000;

// instance of express
const app = express();

app.use(logger("dev"));

// data parsing
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose connection env
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

// port to listen on 
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});