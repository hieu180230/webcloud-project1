require('dotenv').config();

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

mongoose.connect('mongodb+srv://nnhieu22:' + process.env.COSMO_PW + '@cloudp1db.mongocluster.cosmos.azure.com/blogdb?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000');

app.use(morgan('dev'));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.set("view engine", "ejs");


app.use(express.static(path.join(ROOT_DIR, 'views')));

app.use('/', require("./routes/routes"));
app.use('/blog', require("./routes/blog_routes"));

app.listen(port, () => {
  console.log(`Node.js HTTP server is running on port ${port}`);
});