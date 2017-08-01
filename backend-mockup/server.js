var express = require('express');
var app = express();
var fs = require('fs');
var crypto = require('crypto');
var base64url = require('base64url');
var _ = require('lodash');

/** Sync */
function randomStringAsBase64Url(size) {
  return base64url(crypto.randomBytes(size));
}

var router = express.Router();

//add CORS
router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

function generateSuccess(data) {
    return  {
        result : true,
        data:data,
        message : ""
    };
}


function generateError(message, data)  {
    return  {
        result : false,
        data:data,
        message : message
    };
}
/*
connectedUsers = [];

router.get('/isAlive', function(req, res) {
    res.json(generateSuccess());
});

router.get('/login/:login/:timestamp/:signature', function(req, res) {
    //console.log("Login : " + req.params.login);
    //res.json(generateError(1, "Bad login"));
    var token = "backendtoken" + randomStringAsBase64Url(10);
    connectedUsers.push({ login : req.params.login, token: token});

    res.json(generateSuccess(token));
});

router.get('/login/isSessionAlive/:token/:timestamp/:signature', function(req, res) {
    console.log("isSessionAlive [" + req.params.token + "]");
    const result = _.some(connectedUsers, ['token', req.params.token]);
    res.json(generateSuccess(result));
});

router.get('/operatingBase/:token/:timestamp/:signature', function(req, res) {
    console.log("operatingBases [" + req.params.token + "]");
     fs.readFile(__dirname + '/data/operating-bases.json', 'utf-8', function(err,data) {
        res.json(generateSuccess(JSON.parse(data)));
    });
});

router.get('/operating/:operatingBase/latest/:token/:timestamp/:signature', function(req, res) {
    console.log("operatingBase " + req.params.operatingBase + "[" + req.params.token + "]");
    res.json(generateSuccess([]));
});

router.get('/loadert/:operatingBase/:from/:count/:token/:timestamp/:signature', function(req, res) {
    console.log("loadert from " + req.params.from + "->" + req.params.count + " [" + req.params.token + "]");
    
    if(req.params.from == '0') {
        fs.readFile(__dirname + '/data/operatings.json', 'utf-8', function(err,data) {
            res.json(generateSuccess(JSON.parse(data)));
        });
    } else {
        res.json(generateSuccess([]));
    }


});

router.get('/newest-operating/:operatingBase/:fromErt/:token/:timestamp/:signature', function(req, res) {
    onsole.log("newest-operating [" + req.params.token + "]");
    res.json(generateSuccess([]));
});

router.get('/users/:token/:timestamp/:signature', function(req, res) {
    console.log("users [" + req.params.token + "]");
    fs.readFile(__dirname + '/data/users.json', 'utf-8', function(err,data) {
        res.json(generateSuccess(JSON.parse(data)));
    });
});

router.get('/aircrafts/:base/:token/:timestamp/:signature', function(req, res) {
    console.log("aircrafts [" + req.params.token + "]");
    
    fs.readFile(__dirname + '/data/aircrafts.json', 'utf-8', function(err,data) {
        //setTimeout( ()=> {
        //    res.json(generateSuccess(JSON.parse(data)));
        //}, 3000);
        res.json(generateSuccess(JSON.parse(data)));
    });
});


router.post('/validation/:token/:timestamp/:signature', function(req, res) {
    console.log("validation [" + req.params.token + "]");
    fs.readFile(__dirname + '/data/validation.json', 'utf-8', function(err,data) {
        res.json(generateSuccess(JSON.parse(data)));
    });
});
*/


app.use('/rest', router);

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Yadoms Mockup Server started : http://%s:%s", host, port);
});