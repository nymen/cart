var express = require('express')
var app = express()
var router = express.Router()
router.get('/login', function (req, res, next) {
    res.end('success');
})
app.use(router);