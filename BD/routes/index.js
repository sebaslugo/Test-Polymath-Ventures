"use strict";

const express = require("express");

const app = express();

app.use("/restaurants", require("./restaurants"));
app.use("/booking", require("./booking"));

module.exports = app;
