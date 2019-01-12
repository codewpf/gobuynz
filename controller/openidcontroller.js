const app = require('../app')
const request = require('request')

function openid(req, res) {
    let options = generateRequestOptions(req.body.code)
    code2session(options).then(value => {
        console.log('value')
        console.log(value)
        res.send(JSON.stringify(value));
    }).catch(err => {
        console.log('err')
        console.log(err)
        res.send(JSON.stringify(err));
    })
}

function generateRequestOptions(code) {
    let bodyPara = {'appid':'wx6563fd902eb681a4',
                    'secret':'4305fe6bb5c5d3fd6256122fa0425676',
                    'code':code,
                    'grant_type':'authorization_code'}
    let options = {
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        method:'GET',
        body: JSON.stringify(bodyPara)
    };
    return options
}

function code2session(options) {
    return new Promise((resolve, reject) => {
        request(options, (err, _, body) => {
            if(err) {
                reject(err)
            } else {
                resolve(body)
            }
        })
    })
}


// 成功回调
function successRes(res, json) {
    var responseObject = {

    }
    res.status(200)
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(responseObject));
}
// 失败回调
function errorRes(res,json) {
    var responseObject = {
        
    }
    res.status(500)
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(responseObject));
}


module.exports = {openid}