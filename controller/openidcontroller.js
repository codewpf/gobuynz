const app = require('../app')
const request = require('request')

function openid(req, res) {
    let options = generateRequestOptions(req.body.code)
    console.log(options)
    code2session(options).then(value => {
        successRes(res, value)
    }).catch(err => {
        errorRes(res,err)
    })
}

function generateRequestOptions(code) {
    let options = {
        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx6563fd902eb681a4&secret=4305fe6bb5c5d3fd6256122fa0425676&js_code=' + code + '&grant_type=authorization_code',
        method:'GET'
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
    res.status(200)
    res.setHeader('content-type', 'application/json');
    res.send(json);
}
// 失败回调
function errorRes(res,json) {
    res.status(500)
    res.setHeader('content-type', 'application/json');
    res.send(json.errmsg);
}


module.exports = {openid}