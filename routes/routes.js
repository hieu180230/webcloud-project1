const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).render('index.ejs', {title: "Home Page"});
});

router.get("/about", (req, res) => {
    res.render('about.ejs', {title: "About Page"});
});

router.get("/projects", (req, res) => {
    res.render('projects.ejs', {title: "Projects Page"});
});

router.get("/skills", (req, res) => {
    res.render('skills.ejs', {title: "Skills Page"});
});

router.get("/contact", (req, res) => {
    res.render('contact.ejs', {title: "Contact Page"});
});

router.get("/secret", (req, res) => {
    res.render('secret.ejs', {title: "Secret Page"});
});
module.exports = router;