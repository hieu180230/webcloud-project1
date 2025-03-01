const express = require('express');
const router = express.Router();

require('dotenv').config();
const { BlobServiceClient } = require("@azure/storage-blob");

const blobSasUrl = process.env.SAS;
// Create a new BlobServiceClient
const blobClient = BlobServiceClient.fromConnectionString(blobSasUrl);
const containerName = "resources";
// Get a container client from the BlobServiceClient
const containerClient = blobClient.getContainerClient(containerName);

router.get("/", (req, res) => {
    res.status(200).render('index.ejs', { title: "Home Page" });
});

router.get("/about", (req, res) => {
    res.render('about.ejs', { title: "About Page" });
});

router.get("/projects", (req, res) => {
    res.render('projects.ejs', { title: "Projects Page" });
});

router.get("/skills", (req, res) => {
    res.render('skills.ejs', { title: "Skills Page" });
});

router.get("/contact", (req, res) => {
    res.render('contact.ejs', { title: "Contact Page" });
});

router.get("/secret", async (req, res) => {
    //console.log('get sec');
    let iter = containerClient.listBlobsFlat();
    let size = 0;
    let inner_html = '';
    let blobItem = await iter.next();
    //console.log(blobItem);
    while (!blobItem.done) {
        size += 1;
        inner_html += `<option>${blobItem.value.name}</option>`;
        blobItem = await iter.next();
    }
    res.render('secret.ejs', { title: "Secret Page", data: { size: size, html: inner_html } });
});
router.post("/secret", (req, res) => {
    const promises = [];
    console.log(req.body.file);
    for (const file in req.body.file) {
        console.log(file.name);
        /*promises.push(    lobClient.createBlockBlobFromStream(
            containerName,
            file.name,
            file.data,
            file.data.length,
            (err) => {
                if (err) {
                    response.status(500);
                    response.send({ message: "Error Occured" });
                    return;
                }
                response.status(200).send({
                    message:
                        'File Uploaded Successfully'
                });
            }
        ));*/
    }
    //await Promise.all(promises);
    
    res.status(200).send({
        message:
            'File Uploaded Successfully'
    });
    console.log("post oke");
});

module.exports = router;