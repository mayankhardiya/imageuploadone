const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

//set storage engine
const storage = multer.diskStorage({
    destination: './public/upload/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Init Upload
const upload = multer({ storage: storage }).single('myImage');

// Init app
const app = express();

//EJS 
app.set('view engine', 'ejs');

//public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.render('index', {
                    msg: 'Error: No File Selected!'
                });
            } else {
                console.log(req.file.filename);
                res.render('index', {
                    msg: 'File Uploaded',
                    file: `upload/${req.file.filename}`
                });
            }
        }
    });
});

const port = 3001;

app.listen(port, () => console.log('server start'));