const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');
const router = express();
const path = require('path');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://nabil2018:dawin2018@ds247670.mlab.com:47670/movieapp";


router.use(bodyParser.json()) ;//parse JSON body
router.use(bodyParser.urlencoded()); //parse x-www-form-urlencoded body

router.use('/static', express.static(path.join(__dirname + '/../static')));

router.get('/dist/build.js', (req, res) =>
    res.sendFile(path.join(__dirname + '/../../src/dist/build.js'))
);

router.get('/', (req, res) =>
    res.sendFile(path.join(__dirname + '/../../index.html'))
);

router.get('/api/movies/all', (req, res) =>
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("movieapp");
        dbo.collection("movie").find().toArray(function(err, result) {
            if (err) throw err;
            res.status(200);
            res.json(result);
            db.close();
        });
    })
);

router.get('/api/movies/:id', (req, res) => {
    let id = parseInt(req.params.id);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("movieapp");
        dbo.collection("movie").findOne({"_id":id}, function(err, result) {
            if (err) throw err;
            res.status(200);
            res.json(result);
            db.close();
        });
    })
});

router.post('/api/movies', (req,res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("movieapp");
        dbo.collection("movie").find().sort({_id:-1}).limit(1).toArray(function(err2, result2) {
        if (err2) throw err2;
        let myobj = {"_id":parseInt(result2[0]._id)+1,"title":req.body.title,"year":req.body.year,"langue":req.body.langue,"avatar":req.body.avatar,"rating":req.body.rating,"realisateur":{"nom":req.body.realisateur.nom,"prenom":req.body.realisateur.prenom,"nationalite":req.body.realisateur.nationalite,"datenaissance":req.body.realisateur.datenaissance},"genre":req.body.genre};
        dbo.collection("movie").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 movie has been added !");
            db.close();
        });
            db.close();
        });
    })
});

const storage =  multer.diskStorage({
    destination: './src/static/uploads/',
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now()+'.jpg');
    }
});

router.post('/api/upload/',function(req,res){
        let upload = multer({ storage : storage}).single('avatar');
        upload(req,res,function(err) {
        if(err) {
            res.status(500);
            return res.end({ message : "Error uploading file." });
        }
        MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("movieapp");
        dbo.collection("movie").find().sort({_id:-1}).limit(1).toArray(function(err2, result2) {
            if (err2) throw err2;
            dbo.collection("movie").updateOne({ "_id":parseInt(result2[0]._id) }, { $set: { avatar : "./static/uploads/"+req.file.filename }}, function(err, res) {
                if (err) throw err;
                console.log("1 poster updated");
                db.close();
            });
            db.close();
        });
        });
        res.status(200);
        res.redirect('/');
    });
});

router.post('/api/upload/:id',function(req,res){
    let id = parseInt(req.params.id);
    let upload = multer({ storage : storage}).single('avatar');
    upload(req,res,function(err) {
        if(err) {
            res.status(500);
            return res.end({ message : "Error uploading file." });
        }
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            let dbo = db.db("movieapp");
                dbo.collection("movie").updateOne({ "_id":id }, { $set: { avatar : "./static/uploads/"+req.file.filename }}, function(err, res) {
                    if (err) throw err;
                    console.log("1 poster updated");
                    db.close();
                });
        });
        res.status(200);
        res.redirect('/');
    });
});

router.post('/api/movies/:id', (req) => {
    let id = parseInt(req.params.id);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("movieapp");
            let myobj = {"title":req.body.title,"year":req.body.year,"langue":req.body.langue,"rating":req.body.rating,"realisateur":{"nom":req.body.realisateur.nom,"prenom":req.body.realisateur.prenom,"nationalite":req.body.realisateur.nationalite,"datenaissance":req.body.realisateur.datenaissance},"genre":req.body.genre,avatar : req.body.avatar};
            // Fetch the document
            dbo.collection("movie").updateOne({ "_id":id }, { $set: myobj}, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                db.close();
            });
    })
});

router.post('/api/movies/delete/:id', (req) => {
    let id = parseInt(req.params.id);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("movieapp");
        dbo.collection("movie").deleteOne({"_id":id}, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    })
});

router.post('/api/movies/rating/:id/:rating', (req) => {
    let id = parseInt(req.params.id);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("movieapp");
        // Fetch the document
        dbo.collection("movie").updateOne({ "_id":id }, { $set: {"rating":req.params.rating}}, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
    })
});



module.exports = router;