const mongoose = require('mongoose');

const blog_schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    post_title: String,
    post_content: String,
});

module.exports = mongoose.model('Blog', blog_schema);