require('dotenv').config();
const { BlobServiceClient } = require("@azure/storage-blob");

let appInsights = require("applicationinsights");
appInsights.setup(process.env.INSIGHT_CONNCT).start();

const path = require('path');
// Specify the port to listen on
const port = process.env.WEBSITES_PORT || 8080;

const express = require('express');
const app = express();
const body_parser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const ROOT_DIR = __dirname;

mongoose.connect(process.env.COSMODB_URI);
app.use(morgan('dev'));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.set("view engine", "ejs");


app.use(express.static(path.join(ROOT_DIR, 'views')));

app.use('/', require("./routes/routes"));
app.use('/blog', require("./routes/blog_routes"));



app.listen(port, () => {
  console.log(`Node.js HTTP server is running on port ${port}`);
})

module.exports = app