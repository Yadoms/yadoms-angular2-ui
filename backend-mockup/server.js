var express = require('express');
var csrf = require('csurf');
var app = express();
var fs = require('fs');
var _ = require('lodash');

var router = express.Router();

router.use(csrf());

router.use(function(req, res, next) {
  res.locals._csrf = req.csrfToken();
  next();
});


//add CORS
router.use(function (req, res, next) {
    console.log('request');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

router.get('/page', function(req, res) {
    fs.readFile(__dirname + '/data/pages.json', 'utf-8', function(err,data) {
        res.json(generateSuccess(JSON.parse(data)));
    });
});

router.get('/page/:pageid', function(req, res) {
    fs.readFile(__dirname + '/data/pages.json', 'utf-8', function(err,data) {
        var d = JSON.parse(data);
        var result = _.find(d.page, ['id', req.params.pageid]);
        if(result) {
            res.json(generateSuccess(result));
        } else {
            res.json(generateError('Unknown page id=' + req.params.pageid))
        }
    });
});



router.get('/page/:pageid/widget', function(req, res) {
    fs.readFile(__dirname + '/data/widgets.json', 'utf-8', function(err,data) {
        var d = JSON.parse(data);
        d.widget = _.filter(d.widget, ['idPage', req.params.pageid]);
        res.json(generateSuccess(d));
    });
});


router.get('/widget', function(req, res) {
    fs.readFile(__dirname + '/data/widgets.json', 'utf-8', function(err,data) {
        res.json(generateSuccess(JSON.parse(data)));
    });
});



app.use('/rest', router);

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Yadoms Mockup Server started : http://%s:%s", host, port);
});