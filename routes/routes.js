const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render('index', {title: "Home Page"});
});

router.get("/about", (req, res) => {
    res.render('about', {title: "Home Page"});
});

router.get("/projects", (req, res) => {
    res.render('projects', {title: "Home Page"});
});

router.get("/skills", (req, res) => {
    res.render('skills', {title: "Home Page"});
});

router.get("/contact", (req, res) => {
    res.render('contact', {title: "Home Page"});
});

router.get("/secret", (req, res) => {
    res.render('secret', {title: "Home Page"});
});
module.exports = router;