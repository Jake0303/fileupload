'use strict';
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');
var path = require('path');
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

/*POST upload page. */
router.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../public/images');
    form.parse(req, function (err, fields, files) {
        //Update filename
        files.upload.name = fields.title + '.' + files.upload.name.split('.')[1];
        console.log(files.upload.name);
        //Upload file on our server
        fs.rename(files.upload.path, path.join(form.uploadDir, files.upload.name), function (err) {
            if (err) console.log(err);
        });
        console.log('Received upload');
    });
    form.on('end', function (err, fields, files) {
        console.log('File successfuly uploaded');
        res.end('File successfuly uploaded');
    });
});

module.exports = router;
