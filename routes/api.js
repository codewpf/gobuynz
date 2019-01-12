var express = require('express'); 
var router = express.Router();
var openid_controller = require('../controller/openidcontroller')


// openid api - receive from wechat minipro
router.post('/openid', openid_controller.openid);


module.exports = router;
