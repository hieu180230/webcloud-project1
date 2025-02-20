const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom'); // For server-side DOM

const Blog = require('../models/blog');

router.get('/', (req, res, next) => {
    Blog
        .find()
        .exec()
        .then(doc => {
            res.render('blog', { result: doc });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.get('/create', (req, res, next) => {
    res.render('blog_create', { data: "New Blog", put: 0 });
});

router.post('/create', (req, res, next) => {
    //purify content
    const window = new JSDOM('').window; // Create a DOM for purify to work with server side
    const DOMPurify = createDOMPurify(window);
    const dirty = req.body.post_content; // Potentially unsafe HTML
    const clean = DOMPurify.sanitize(dirty); // Sanitize it

    //store data
    const post = new Blog({
        _id: new mongoose.Types.ObjectId(),
        post_title: req.body.post_title,
        post_content: clean,
    });
    post
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });

    res.status(201).json({
        message: "Handle post from blog/create",
        created_post: post,
    });
});

router.get('/view', (req, res, next) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).send("Blog post ID is missing.");
    }

    Blog
        .findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.render('blog_view', { result: doc, del: 0 });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});

router.get('/put', (req, res, next) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).send("Blog post ID is missing.");
    }

    Blog
    .findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.render('blog_create', { data: doc, put: 1 });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    });

});

router.put('/put', (req, res, next) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).send("Blog post ID is missing.");
    }

    Blog
    .updateOne({_id: id}, {post_title: req.body.post_title, post_content: req.body.post_content})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    });

});

router.get('/delete', (req, res, next) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).send("Blog post ID is missing.");
    }

    Blog
        .findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.render('blog_view', { result: doc, del: 1 });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });

});

router.delete('/delete', (req, res, next) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).send("Blog post ID is missing.");
    }

    Blog
        .deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});

module.exports = router;